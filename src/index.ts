import fs from "node:fs";
import { Request } from "express";
import path from "path";

async function saveFile(req: Request, baseDir: string, dirName: string, fileName: string) {
  try {
    const uploadDir: string = path.join(baseDir, dirName);
    const filePath: string = path.join(uploadDir, fileName);

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);

      req.on("data", (chunk) => writeStream.write(chunk));
      req.on("end", () => {
        writeStream.end();
        writeStream.on("finish", () => {
          const relativePath = path.relative(baseDir, filePath);
          resolve(relativePath);
        });
        writeStream.on("error", reject);
      });
    });

    return path.relative(baseDir, filePath);
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function deleteFile(baseDir: string, dirName: string, fileName: string) {
  try {
    const uploadDir: string = path.join(baseDir, dirName);
    const filePath: string = path.join(uploadDir, fileName);

    // Check if file exists
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default { saveFile, deleteFile };

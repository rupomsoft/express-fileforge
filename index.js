const fs = require('fs');
const path = require('path');

exports.saveFile = async (req, baseDir, dirName, fileName) => {
    try {
        const uploadDir = path.join(baseDir, dirName);
        const filePath = path.join(uploadDir, fileName);

        await new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(filePath);

            req.on('data', (chunk) => writeStream.write(chunk));
            req.on('end', () => {
                writeStream.end();
                writeStream.on('finish', () => {
                    const relativePath = path.relative(baseDir, filePath);
                    resolve(relativePath);
                });
                writeStream.on('error', reject);
            });
        });

        return path.relative(baseDir, filePath);
    } catch (error) {
        console.error(error);
        return false;
    }
};
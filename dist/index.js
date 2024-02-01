"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.saveFile = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
async function saveFile(req, baseDir, dirName, fileName) {
    try {
        const uploadDir = path_1.default.join(baseDir, dirName);
        const filePath = path_1.default.join(uploadDir, fileName);
        await new Promise((resolve, reject) => {
            const writeStream = node_fs_1.default.createWriteStream(filePath);
            req.on("data", (chunk) => writeStream.write(chunk));
            req.on("end", () => {
                writeStream.end();
                writeStream.on("finish", () => {
                    const relativePath = path_1.default.relative(baseDir, filePath);
                    resolve(relativePath);
                });
                writeStream.on("error", reject);
            });
        });
        return path_1.default.relative(baseDir, filePath);
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
exports.saveFile = saveFile;
async function deleteFile(baseDir, dirName, fileName) {
    try {
        const uploadDir = path_1.default.join(baseDir, dirName);
        const filePath = path_1.default.join(uploadDir, fileName);
        if (node_fs_1.default.existsSync(filePath)) {
            await node_fs_1.default.promises.unlink(filePath);
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
exports.deleteFile = deleteFile;
//# sourceMappingURL=index.js.map
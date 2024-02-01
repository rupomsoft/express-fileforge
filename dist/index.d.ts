import { Request } from "express";
declare function saveFile(req: Request, baseDir: string, dirName: string, fileName: string): Promise<string | false>;
declare function deleteFile(baseDir: string, dirName: string, fileName: string): Promise<boolean>;
declare const _default: {
    saveFile: typeof saveFile;
    deleteFile: typeof deleteFile;
};
export default _default;

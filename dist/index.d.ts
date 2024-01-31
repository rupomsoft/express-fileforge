import { Request } from "express";
export declare function saveFile(req: Request, baseDir: string, dirName: string, fileName: string): Promise<string | false>;
export declare function deleteFile(baseDir: string, dirName: string, fileName: string): Promise<boolean>;

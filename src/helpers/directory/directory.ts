import fs from "fs-extra";

import logger from "../logger";

export async function checkDirectoryExistence(directoryPath: string): Promise<boolean> {
    try {
        await fs.promises.access(directoryPath);
        return true;
    } catch (error) {
        logger.error(`${directoryPath} not exist`, error);
        return false;
    }
}

export async function checkFileExistence(filePath: string): Promise<boolean> {
    return checkDirectoryExistence(filePath);
}

export async function createDirectory(directoryPath: string) {
    try {
        await fs.mkdirSync(directoryPath);
        return true;
    } catch (error) {
        logger.error(`${directoryPath} not created`, error);
        return false;
    }
}

import fs from "fs-extra";

import logger from "../logger";

export async function checkDirectoryExistence(directoryUrl: string): Promise<boolean> {
    try {
        await fs.promises.access(directoryUrl);
        return true;
    } catch (error) {
        logger.error(`${directoryUrl} not exist`, error);
        return false;
    }
}

export async function createDirectory(directoryUrl: string) {
    try {
        await fs.mkdirSync(directoryUrl);
        return true;
    } catch (error) {
        logger.error(`${directoryUrl} not created`, error);
        return false;
    }
}

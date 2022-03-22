import path from "path";
import fs from "fs-extra";

import imageManipulator from "../helpers/imageManipulator";
import directoryHelper from "../helpers/directory";
import logger from "../helpers/logger";

import { constructThumbnailImageName } from "../utils/image";

import { thumbnailsImagesDirectory, uploadedImagesDirectory } from "../constants/dirs";
import { errorMessages } from "../constants/errors";

export async function processThumbnailImage(
    height: number,
    width: number,
    fileName: string
): Promise<string> {
    const imageSourcePath = path.join(uploadedImagesDirectory, fileName.toLowerCase());
    const newThumbnailImageFileName = constructThumbnailImageName(fileName, height, width);
    const imageThumbnailPath = path.join(thumbnailsImagesDirectory, newThumbnailImageFileName);

    // check first if /images/thumbnails/ exist
    await checkAndCreateThumbnailDirectory(thumbnailsImagesDirectory);

    const isThumbnailImageAlreadyExist = await directoryHelper.checkFileExistence(
        imageThumbnailPath
    );
    if (isThumbnailImageAlreadyExist) {
        try {
            await fs.readFileSync(imageThumbnailPath);
            return newThumbnailImageFileName;
        } catch (error) {
            logger.error("error while reading thumbnail image file", error);
            return errorMessages.CANNOT_READ;
        }
    } else {
        const isProcessingDone = await imageManipulator.resizeImage(
            height,
            width,
            imageSourcePath,
            imageThumbnailPath
        );
        if (isProcessingDone) {
            try {
                await fs.readFileSync(imageThumbnailPath);
                return newThumbnailImageFileName;
            } catch (error) {
                logger.error("error while reading thumbnail image file", error);
                return errorMessages.CANNOT_READ;
            }
        } else {
            return errorMessages.CANNOT_RESIZE;
        }
    }
}

export async function getThumbnailImage(
    fileName: string,
    height: number,
    width: number
): Promise<Buffer> {
    const newThumbnailImageFileName = constructThumbnailImageName(fileName, height, width);
    const imageThumbnailPath = path.join(thumbnailsImagesDirectory, newThumbnailImageFileName);

    const isThumbnailImageAlreadyExist = await directoryHelper.checkFileExistence(
        imageThumbnailPath
    );
    if (isThumbnailImageAlreadyExist) {
        // you can access image via query or postLink
        try {
            const thumbnailImageFile = await fs.readFileSync(imageThumbnailPath);
            return thumbnailImageFile;
        } catch (error) {
            logger.error("error while reading thumbnail image file", error);
            return null as unknown as Buffer;
        }
    } else {
        return null as unknown as Buffer;
    }
}

async function checkAndCreateThumbnailDirectory(directoryPath: string): Promise<void> {
    const isThumbnailDirectoryExist = await directoryHelper.checkDirectoryExistence(directoryPath);

    if (isThumbnailDirectoryExist === false) {
        await directoryHelper.createDirectory(directoryPath);
    }
}

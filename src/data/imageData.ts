import path from "path";
import fs from "fs-extra";

import imageManipulator from "../helpers/imageManipulator";
import { checkDirectoryExistence, createDirectory, checkFileExistence } from "../helpers/directory";
import logger from "../helpers/logger";

import { thumbnailsImagesDirectory, uploadedImagesDirectory } from "../constants/dirs";
import { errorMessages } from "../constants/errors";

export async function processThumbnailImage(
    height: number,
    width: number,
    fileName: string
): Promise<string> {
    const imageSourcePath = path.join(uploadedImagesDirectory, fileName.toLowerCase());

    const fileNameApart = fileName.toLowerCase().split(".");
    const fileExtension = fileNameApart.pop();
    const fileNameWithoutExtension = fileNameApart.join(".");
    const newThumbnailImageFileName = `${fileNameWithoutExtension}-${height}x${width}.${fileExtension}`;
    const imageThumbnailPath = path.join(thumbnailsImagesDirectory, newThumbnailImageFileName);

    // check first if /images/thumbnails/ exist
    await checkAndCreateThumbnailDirectory(thumbnailsImagesDirectory);

    const isThumbnailImageAlreadyExist = await checkFileExistence(imageThumbnailPath);
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

// export async function getThumbnailFile()

async function checkAndCreateThumbnailDirectory(directoryPath: string): Promise<void> {
    const isThumbnailDirectoryExist = await checkDirectoryExistence(directoryPath);

    if (isThumbnailDirectoryExist === false) {
        await createDirectory(directoryPath);
    }
}

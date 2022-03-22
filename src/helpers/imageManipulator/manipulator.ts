import sharp from "sharp";
import logger from "../logger";

export async function resizeImage(
    height: number,
    width: number,
    sourcePath: string,
    destinationPath: string
): Promise<boolean> {
    try {
        await sharp(sourcePath)
            .resize({
                width: width,
                height: height,
            })
            .toFile(destinationPath);
        return true;
    } catch (error) {
        logger.error("error while resize the image", error);
        return false;
    }
}

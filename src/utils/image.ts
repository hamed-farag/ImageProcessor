import mime from "mime-types";

export function constructThumbnailImageName(
    originalFileName: string,
    height: number,
    width: number
): string {
    const fileNameApart = originalFileName.toLowerCase().split(".");
    const fileExtension = fileNameApart.pop();
    const fileNameWithoutExtension = fileNameApart.join(".");
    const newThumbnailImageFileName = `${fileNameWithoutExtension}-${height}x${width}.${fileExtension}`;

    return newThumbnailImageFileName;
}

export function getMimeType(originalFileName: string): string {
    return mime.lookup(originalFileName) as string;
}

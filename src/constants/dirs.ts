import path from "path";

const thumbnailsImagesDir = "/images/thumbnails/";

export const imagesDirectory = path.join(process.cwd(), "/public/images/");
export const uploadedImagesDirectory = path.join(process.cwd(), "/public/images/uploaded/");
export const thumbnailsImagesDirectory = path.join(process.cwd(), `/public${thumbnailsImagesDir}`);

export const simpleThumbnailsImagesDirectory = thumbnailsImagesDir;

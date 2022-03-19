import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { imagesDirectory, uploadedImagesDirectory } from "../configs/dirs";

import { checkDirectoryExistence, createDirectory } from "../helpers/directory";

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const imageDirectoryPath = path.join(process.cwd(), imagesDirectory);
        const uploadedImageUploadedDirectoryPath = path.join(
            process.cwd(),
            uploadedImagesDirectory
        );
        const isImageDirectoryExist = await checkDirectoryExistence(imageDirectoryPath);

        if (isImageDirectoryExist === false) {
            await createDirectory(imageDirectoryPath);
        }

        const isUploadedImageDirectoryExist = await checkDirectoryExistence(
            uploadedImageUploadedDirectoryPath
        );

        if (isUploadedImageDirectoryExist === false) {
            await createDirectory(uploadedImageUploadedDirectoryPath);
        }

        cb(null, uploadedImageUploadedDirectoryPath);
    },
    filename: function (req, file, cb) {
        // extract extension // by split by .dot and get that latest item in array
        const uniqueId = uuidv4();
        const fileNameApart = file.originalname.split(".");
        const fileExtension = fileNameApart.pop();

        const fileNameWithoutExtension = fileNameApart.join(".");

        cb(null, `${fileNameWithoutExtension.toLowerCase()}-${uniqueId}.${fileExtension}`);
    },
});

export const uploadImagesDir = multer({ storage: storage });

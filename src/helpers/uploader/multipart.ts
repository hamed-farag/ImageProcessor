import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { imagesDirectory, uploadedImagesDirectory } from "../../constants/dirs";
import { maxFileSize } from "../../constants/files";

import { checkDirectoryExistence, createDirectory } from "../directory";

const storage = multer.diskStorage({
    destination: async function (_, _file, cb) {
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
    filename: function (_, file, cb) {
        // extract extension // by split by .dot and get that latest item in array
        const uniqueId = uuidv4();
        const fileNameApart = file.originalname.split(".");
        const fileExtension = fileNameApart.pop();

        const fileNameWithoutExtension = fileNameApart.join(".");

        cb(null, `${fileNameWithoutExtension.toLowerCase()}-${uniqueId}.${fileExtension}`);
    },
});

const limits = { fileSize: maxFileSize };

export default multer({
    storage,
    limits,
    fileFilter: function (_, file, cb) {
        const ext = path.extname(file.originalname);

        if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
            cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
        } else {
            cb(null, true);
        }
    },
});

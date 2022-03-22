import multer from "multer";
import path from "path";
// import { v4 as uuidv4 } from "uuid";

import { imagesDirectory, uploadedImagesDirectory } from "../../constants/dirs";
import { maxFileSize } from "../../constants/files";

import directoryHelper from "../directory";

const storage = multer.diskStorage({
    destination: async function (_, _file, cb) {
        const isImageDirectoryExist = await directoryHelper.checkDirectoryExistence(
            imagesDirectory
        );

        if (isImageDirectoryExist === false) {
            await directoryHelper.createDirectory(imagesDirectory);
        }

        const isUploadedImageDirectoryExist = await directoryHelper.checkDirectoryExistence(
            uploadedImagesDirectory
        );

        if (isUploadedImageDirectoryExist === false) {
            await directoryHelper.createDirectory(uploadedImagesDirectory);
        }

        cb(null, uploadedImagesDirectory);
    },
    filename: function (_, file, cb) {
        // extract extension // by split by .dot and get that latest item in array
        // const uniqueId = uuidv4();
        // const fileNameApart = file.originalname.split(".");
        // const fileExtension = fileNameApart.pop();

        // const fileNameWithoutExtension = fileNameApart.join(".");

        // // make image unique, as may be many users upload the same image name
        // cb(null, `${fileNameWithoutExtension.toLowerCase()}-${uniqueId}.${fileExtension}`);
        cb(null, file.originalname.toLowerCase());
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

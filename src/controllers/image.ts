import multer from "multer";
import { Request, Response } from "express";

import uploader from "../helpers/uploader";

import { processThumbnailImage } from "../data/imageData";

import { simpleThumbnailsImagesDirectory } from "../constants/dirs";

import errors, { errorMessages } from "../constants/errors";

export function postImage(req: Request, res: Response) {
    const handleUpload = uploader.single("file");

    handleUpload(req, res, async function (error) {
        if (error instanceof multer.MulterError) {
            switch (error.code) {
                case "LIMIT_UNEXPECTED_FILE": {
                    return res.status(500).send(errors.FILE_NOT_IMAGE);
                }
                case "LIMIT_FILE_SIZE": {
                    return res.status(500).send(errors.FILE_EXCEED_LIMIT);
                }
                default: {
                    return res.status(500).send({ ...errors.SOMETHING_WRONG, error: error });
                }
            }
        } else if (error) {
            return res.status(500).send({ ...errors.SOMETHING_WRONG, error });
        }

        const { height, width } = req.body;

        if (height === "" || width === "") {
            return res.status(500).send({ ...errors.DIMENSIONS_NOT_SUPPORTED, error });
        }

        if (isNaN(height) || isNaN(width)) {
            return res.status(500).send({ ...errors.DIMENSIONS_NOT_NUMBERS, error });
        }

        if (Number(height) < 0 || Number(width) < 0) {
            return res.status(500).send({ ...errors.DIMENSIONS_NOT_POSITIVE, error });
        }

        if (req.file === undefined) {
            return res.status(500).send({ ...errors.FILE_NOT_UPLOADED, error });
        }

        const imageFile = await processThumbnailImage(
            Number(height),
            Number(width),
            req.file?.originalname
        );

        if (imageFile === errorMessages.CANNOT_READ) {
            return res.status(500).send(errors.IMAGE_NOT_RETRIEVE);
        } else if (imageFile === errorMessages.CANNOT_RESIZE) {
            return res.status(500).send(errors.IMAGE_NOT_RESIZED);
        } else {
            const thumbnailImageServerUrl = `${req.protocol}://${req.get(
                "host"
            )}${simpleThumbnailsImagesDirectory}${imageFile}`;
            return res.status(200).send(thumbnailImageServerUrl);
        }
    });
}

import multer from "multer";
import { Request, Response } from "express";

import uploader from "../helpers/uploader";
import { getMimeType } from "../utils/image";

import { processThumbnailImage, getThumbnailImage } from "../data/imageData";

import { simpleThumbnailsImagesDirectory } from "../constants/dirs";
import errors, { errorMessages } from "../constants/errors";
import { BASE_URL_V1, urlsV1 } from "../constants/urls";

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

        if (isNaN(Number(height)) || isNaN(Number(width))) {
            return res.status(500).send({ ...errors.DIMENSIONS_NOT_NUMBERS, error });
        }

        if (Number(height) <= 0 || Number(width) <= 0) {
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

            const responseTemplate = `<p>You can access the image via following urls</p><ul><li>${thumbnailImageServerUrl}</li><li>${
                req.protocol
            }://${req.get("host")}${BASE_URL_V1}${urlsV1.images}?filename=${
                req.file?.originalname
            }&height=${height}&width=${width}</li></ul>
            `;

            res.writeHead(200, { "Content-Type": "text/html" });
            return res.status(200).end(responseTemplate);
        }
    });
}

export async function getImage(req: Request, res: Response) {
    const { filename, width, height } = <{ filename: string; width: string; height: string }>(
        req.query
    );

    if (filename === undefined || width === undefined || height === undefined) {
        return res.status(500).send({ ...errors.MISSING_PARAMS });
    }

    if (isNaN(Number(height)) || isNaN(Number(width))) {
        return res.status(500).send({ ...errors.DIMENSIONS_NOT_NUMBERS });
    }

    if (Number(height) <= 0 || Number(width) <= 0) {
        return res.status(500).send({ ...errors.DIMENSIONS_NOT_POSITIVE });
    }

    const thumbnailImageFile = await getThumbnailImage(filename, Number(height), Number(width));

    if (thumbnailImageFile) {
        const fileMimeType = getMimeType(filename);

        res.writeHead(200, { "Content-Type": fileMimeType });
        return res.end(thumbnailImageFile);
    } else {
        return res.status(500).send(errors.IMAGE_NOT_FOUND);
    }
}

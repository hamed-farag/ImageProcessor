import multer from "multer";
import { Request, Response } from "express";

import uploader from "../helpers/uploader";

import errors from "../constants/errors";

export function postImage(req: Request, res: Response) {
    const handleUpload = uploader.single("file");

    handleUpload(req, res, function (error) {
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

        // console.log(req.body); // width, height
        return res.status(200).send("Done");
    });
}

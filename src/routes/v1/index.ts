import express, { Express } from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

import { postImage, getImage } from "../../controllers/image";

import { BASE_URL_V1, urlsV1 } from "../../constants/urls";

export default function (serverApp: Express): void {
    const router = express.Router();

    // POST METHOD, SAVE UPLOADED IMAGE
    router.post(urlsV1.images, postImage);

    // GET METHOD, GET UPLOADED IMAGE
    router.get(urlsV1.images, getImage);

    // register routes v1
    serverApp.use(BASE_URL_V1, router);
    // initialize swagger document
    serverApp.use(BASE_URL_V1, SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
}

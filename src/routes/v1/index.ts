import express, { Express } from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

import { postImage } from "../../controllers/image";

import urls, { BASE_URL } from "./urls";

export default function (serverApp: Express): void {
    const router = express.Router();

    // POST METHOD, SAVE UPLOADED IMAGE
    router.post(urls.images, postImage);

    // register routes v1
    serverApp.use(BASE_URL, router);
    // initialize swagger document
    serverApp.use(BASE_URL, SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
}

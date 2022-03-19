import express, { Express } from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

import urls, { BASE_URL } from "./urls";

export default function (serverApp: Express): void {
    const router = express.Router();

    router.post(urls.images, function (req, res) {
        console.log(req);
        console.log(res);
        return res.send(urls.images);
    });

    // register routes v1
    serverApp.use(BASE_URL, router);
    // initialize swagger document
    serverApp.use(BASE_URL, SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
}

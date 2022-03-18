import { Express } from "express";
import SwaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

import urls, { BASE_URL } from "./urls";

export default function (serverApp: Express): void {
    serverApp.use(BASE_URL, SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));

    serverApp.get(urls.url, function (req, res) {
        res.json({ url: urls.url });
    });
}

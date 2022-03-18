import express from "express";

import setupEnv from "./configs/env";
import initializeMiddlewares from "./middlewares";
import initializeRoutes from "./routes";

setupEnv();
const serverApp = express();

initializeMiddlewares(serverApp);
initializeRoutes(serverApp);

serverApp.listen(8080, function () {
    console.log("CORS-enabled web server listening on port 8080");
});

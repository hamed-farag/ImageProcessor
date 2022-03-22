import express from "express";

import setupEnv from "./configs/env";
import initializeMiddlewares from "./middlewares";
import initializeRoutes from "./routes";

setupEnv();
const serverApp = express();

serverApp.use(express.static("public"));

initializeMiddlewares(serverApp);
initializeRoutes(serverApp);

serverApp.listen(process.env.PORT, function () {
    console.log(`CORS-enabled web server listening on port ${process.env.PORT}`);
});

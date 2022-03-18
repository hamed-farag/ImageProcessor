import { Express } from "express";

import routesV1 from "./v1";

export default function (serverApp: Express): void {
    routesV1(serverApp);
}

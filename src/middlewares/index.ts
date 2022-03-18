import { Express } from "express";

import bodyParser from "./bodyParser";
import cors from "./cors";

export default function (serverApp: Express): void {
    cors(serverApp);
    bodyParser(serverApp);
}

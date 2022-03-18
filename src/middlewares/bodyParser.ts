import { Express } from "express";
import bodyParser from "body-parser";

export default function (serverApp: Express): void {
    serverApp.use(bodyParser.json());
}

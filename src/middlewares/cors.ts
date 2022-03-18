import { Express } from "express";
import cors from "cors";

export default function (serverApp: Express): void {
    serverApp.use(cors());
}

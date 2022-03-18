import { Express } from "express";

import urls from "./urls";

export default function (serverApp: Express): void {
    serverApp.get(urls.url, function (req, res) {
        res.json({ url: urls.url });
    });
}

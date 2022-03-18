import dotenv from "dotenv";
import path from "path";

export default function setup() {
    const currentEnv = process.env.NODE_ENV;

    dotenv.config({
        path: `${path.join(__dirname, `../../.env.${currentEnv}`)}`,
    });
}

// import path from "path";
import { checkDirectoryExistence } from ".";

describe("Directory Suite - checkDirectoryExistence Function", () => {
    it("folder exist", async () => {
        const isDirectoryExist = await checkDirectoryExistence(__dirname);
        expect(isDirectoryExist).toBe(true);
    });

    it("folder not exist", async () => {
        const isDirectoryExist = await checkDirectoryExistence("/not-exist-folder");
        expect(isDirectoryExist).toBe(false);
    });
});

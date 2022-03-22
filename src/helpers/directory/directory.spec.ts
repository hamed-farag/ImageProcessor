import directory from ".";

describe("Directory Suite - checkDirectoryExistence Function", () => {
    it("folder exist", async () => {
        const isDirectoryExist = await directory.checkDirectoryExistence(__dirname);
        expect(isDirectoryExist).toBe(true);
    });

    it("folder not exist", async () => {
        const isDirectoryExist = await directory.checkDirectoryExistence("/not-exist-folder");
        expect(isDirectoryExist).toBe(false);
    });
});

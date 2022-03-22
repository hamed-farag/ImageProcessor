import path from "path";

import imageManipulator from ".";

describe("Image Manipulator Suite - resizeImage Function", () => {
    it("Resize Image - Normal Scenario", async () => {
        const height = 50;
        const width = 50;
        const sourcePath = path.join(process.cwd(), "./build/public/test/cat.jpg");
        const targetPath = path.join(
            process.cwd(),
            `./build/public/test/cat-thumb-${height}x${width}.jpg`
        );

        const isFileGenerated = await imageManipulator.resizeImage(50, 50, sourcePath, targetPath);

        expect(isFileGenerated).toBe(true);
    });
});

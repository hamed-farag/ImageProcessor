import request from "supertest";
import { serverApp as expressServerApp } from "./";

describe("/images APIs", function () {
    it("POST Image", function (done) {
        request(expressServerApp)
            .post("/api/v1/images")
            .field("height", 300)
            .field("width", 300)
            .attach("file", "tests/assertions/cat.jpg")
            .set("Accept", "application/json")
            .expect("Content-Type", "text/html")
            .expect(
                200,
                `<<p>You can access the image via following urls</p><ul><li>http://localhost:8080/images/thumbnails/cat-300x300.jpg</li><li>http://localhost:8080?filename=cat.jpg&height=300&width=300</li></ul>`,
                () => {
                    done();
                }
            );
    });

    it("GET Image", function (done) {
        request(expressServerApp)
            .get("/api/v1/images?filename=cat.jpg&height=300&width=300")
            .set("Accept", "application/json")
            .expect("Content-Type", "image/png")
            .expect(200, () => {
                done();
            });
    });
});

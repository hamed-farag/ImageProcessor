const errors = {
    FILE_NOT_IMAGE: {
        code: "IP-ER-01",
        message: "File not an Image, File should be (.png, .jpg, .jpeg or .gif)",
    },
    FILE_EXCEED_LIMIT: {
        code: "IP-ER-02",
        message: "File Size should not exceed 2 MB",
    },
    SOMETHING_WRONG: {
        code: "IP-ER-03",
        message: "Something Wrong!",
    },
};

export default Object.freeze(errors);

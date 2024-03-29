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
    FILE_NOT_UPLOADED: {
        code: "IP-ER-04",
        message: "File Not Found, please attach image file!",
    },
    DIMENSIONS_NOT_SUPPORTED: {
        code: "IP-ER-05",
        message: "Width or Height not Supported!",
    },
    DIMENSIONS_NOT_NUMBERS: {
        code: "IP-ER-06",
        message: "Width or Height not Numbers!",
    },
    DIMENSIONS_NOT_POSITIVE: {
        code: "IP-ER-07",
        message: "Width or Height Should be Positive Numbers!",
    },
    IMAGE_NOT_RESIZED: {
        code: "IP-ER-08",
        message: "Internal Error while Resizing Image!",
    },
    IMAGE_NOT_RETRIEVE: {
        code: "IP-ER-09",
        message: "Internal Error while Retrieving Image!",
    },
    MISSING_PARAMS: {
        code: "IP-ER-10",
        message: "One or more parameters are missing (height, width or filename)!",
    },
    IMAGE_NOT_FOUND: {
        code: "IP-ER-11",
        message: "Image not Found!",
    },
};

export const errorMessages = {
    CANNOT_READ: "CANNOT_READ",
    CANNOT_RESIZE: "CANNOT_RESIZE",
};

export default Object.freeze(errors);

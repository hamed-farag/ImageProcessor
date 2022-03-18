const BASE_URL = "/api/v1";

function createBaseUrl(apiUrl: string) {
    return `${BASE_URL}${apiUrl}`;
}

const urlsV1 = {
    url: createBaseUrl("/url"),
};

export default Object.freeze(urlsV1);

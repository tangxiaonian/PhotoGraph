import {StorageUtils} from "../utils/StorageUtils";

export function request(config) {

    config.header = config.header ? config.header : {};

    let token = StorageUtils.get("token");

    if (token) {
        config.header.authorization = token;
    }

    return new Promise((res, rej) => {

        wx.request({
            url:config.url,
            data: config.data || {},
            header: config.header || {},
            method: config.method || "GET",
            success: res,
            fail: rej
        });

    });

}

// export const HTTP_BASE_URL = "http://localhost:7777/api";
export const HTTP_BASE_URL = "http://photos.nat300.top/api";
import {StorageUtils} from "../utils/StorageUtils";

export function request(config) {

    let token = "";

    StorageUtils.get("token", (result) => {
        token = result.data;
    });

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

export const HTTP_BASE_URL = "http://localhost:7777/api";
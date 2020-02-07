import {HTTP_BASE_URL, request} from "../index";

export function eassyAllRequest(data,successFun,failFun) {

    request({
        url: HTTP_BASE_URL + "/essay/all",
        method: "GET",
        data
    })
        .then(successFun)
        .catch(failFun);
}
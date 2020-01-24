import {HTTP_BASE_URL, request} from "../index";

/*
    QQ登录
 */
export function requestQQLogin(data,successFun,failFun) {

    request({
        url: HTTP_BASE_URL + "/users/qqLogin",
        data
    }).then(successFun)
        .catch(failFun);
}

/*
    请求验证码
 */
export function requestVerificationCode(data, successFun, failFun) {
    request({
        url: HTTP_BASE_URL + "/users/verificationCode",
        data
    }).then(successFun)
        .catch(failFun);
}

/*
    微信登录
 */
export function requestWxLogin(data,successFun, failFun) {
    request({
        url: HTTP_BASE_URL + "/users/wxLogin",
        data,
        method: "PUT"
    }).then(successFun)
        .catch(failFun);
}
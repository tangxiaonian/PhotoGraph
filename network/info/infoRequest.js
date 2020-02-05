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

/*
    登出
 */
export function loginOutRequest(data, successFun, failFun) {
    request({
        url:HTTP_BASE_URL + "/users/loginOut",
        data,
        method: "GET"
    }).then(successFun).catch(failFun);
}

/*
    更新用户信息
 */
export function updateUserInfoRequest(data, successFun, failFun) {
    request({
        url: HTTP_BASE_URL + "/users/update",
        data,
        method: "POST"
    }).then(successFun).catch(failFun);
}
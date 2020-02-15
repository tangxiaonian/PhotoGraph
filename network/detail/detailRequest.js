import {HTTP_BASE_URL, request} from "../index";
/*
    根据 id 查询
 */
export function selectByIdRequest(data,successFun,failFun) {
    request({
        url: HTTP_BASE_URL + "/essay/id",
        data
    }).then(successFun).catch(failFun);
}

/*
    点赞
 */
export function lookRequest(data, successFun, failFun) {
    request({
        url: HTTP_BASE_URL + "/essay/lookNumber",
        data,
    }).then(successFun).catch(failFun);
}

/*
    点赞
 */
export function goodRequest(data, successFun, failFun) {
    request({
        url: HTTP_BASE_URL + "/essay/goodNumber",
        data,
    }).then(successFun).catch(failFun);
}

/*
    点赞
 */
export function commentRequest(data, successFun, failFun) {
    request({
        url: HTTP_BASE_URL + "/essay/commentNumber",
        data,
    }).then(successFun).catch(failFun);
}

/*
    发送留言
 */
export function sendMsgRequest(data, successFun, failFun) {
    request({
        url: HTTP_BASE_URL + "/message/publish",
        data,
        method: "POST"
    }).then(successFun).catch(failFun);
}
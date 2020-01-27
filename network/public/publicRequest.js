import {HTTP_BASE_URL, request} from "../index";

/*
    说说发布接口
 */
export function publishEssayRequest(data, successFun, failFun) {

    request({
        url: HTTP_BASE_URL + "/essay/publish",
        method: "PUT",
        data
    }).then(successFun).catch(failFun);

}

/*
    文件删除接口
 */
export function deleteFile(data, successFun, failFun) {

    request({
        url: HTTP_BASE_URL + "/essay/delete/file",
        method: "GET",
        data
    }).then(successFun).catch(failFun);

}
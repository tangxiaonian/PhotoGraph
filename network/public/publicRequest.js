import {HTTP_BASE_URL, request} from "../index";

/*
    文件上传接口
 */
export function fileUpload(data, successFun, failFun) {
    request({
        url: HTTP_BASE_URL + "/essay/upload",
        method: "POST",
        data,
        header:{
            "Content-Type":"multipart/form-data"
        }
    }).then(successFun).catch(failFun);

}

/*
    说说发布接口
 */
export function publishEssay(data, successFun, failFun) {

    request({
        url: HTTP_BASE_URL + "/essay/publish",
        method: "PUT",
        data
    }).then(successFun).catch(failFun);

}
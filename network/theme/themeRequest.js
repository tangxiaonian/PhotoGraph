import {HTTP_BASE_URL, request} from "../index";

export function getThemes(successFun,failFun) {

    request({
        url: HTTP_BASE_URL + "/theme/selectAll ",
        method:"GET"
    }).then(successFun).catch(failFun);

}
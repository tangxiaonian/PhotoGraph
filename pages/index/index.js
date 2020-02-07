// pages/index/index.js
import {eassyAllRequest} from "../../network/index/indexRequest";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        essays:[]
    },
    onLoad() {
        this.eassyAllRequest();
    },
    /*
        请求说说接口
    */
    eassyAllRequest() {

        eassyAllRequest({
            pageSize:5,
            currentPage: 1
        },(result) => {

            let essays = result.data.data.data;

            essays.forEach((item) => {
                item.createdtime = item.createdtime.match(/(\d)*-(\d)*-(\d)*/)[0];
            });

            this.setData({
                essays
            });
        }, (fail) => {
            console.log(fail);
        });
    },

    goSearch() {
        wx.navigateTo({
            url: "/views/search/search"
        });
    }
});
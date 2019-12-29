// pages/index/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    goSearch() {
        wx.navigateTo({
            url: "/views/search/search"
        });
    }
});
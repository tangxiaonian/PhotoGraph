// pages/theme/theme.js

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        statusBarHeight: app.globalData.statusBarHeight, // 状态栏的高度
        customNavBarHeight: app.globalData.customNavBarHeight, // 自定义navbar高度
        windowHeight: app.globalData.windowHeight, // 屏幕高度
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    }
});
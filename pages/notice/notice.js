// pages/notice/notice.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isHiddenDeleteBar: true,

    statusBarHeight: app.globalData.statusBarHeight, // 状态栏的高度
    customNavBarHeight: app.globalData.customNavBarHeight, // 自定义navbar高度
    windowHeight: app.globalData.windowHeight, // 屏幕高度

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handlerClick() {
    console.log("点击....");
  },
  handlerLongTap(event) {

    console.log("长按触发....");

    wx.showActionSheet({
      itemList: ['查看回复', '删除'],
      itemColor: "blue",
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    });

  }

});
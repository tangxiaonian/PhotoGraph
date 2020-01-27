// views/themdetail/themdetail.js

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isTophidden: false,

    scrollTop: 0,

    windowHeight: app.globalData.windowHeight,
    navbarHeight: app.globalData.customNavBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goTop() {

    this.setData({
      scrollTop: 0
    });
  }

});
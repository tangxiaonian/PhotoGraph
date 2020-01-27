// views/commentdetail/commentdetail.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isModalHidden: true,

    windowHeight: app.globalData.windowHeight,
    navbarHeight: app.globalData.customNavBarHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击了输入框 显示模态框
  handlerClickInput(e) {

    this.setData({
      isModalHidden: false
    });

  },
  // 点击了模态框的确认按钮
  handlerConfirm(event) {

    console.log("文本框的值为:--->"+event.detail.data);

  }

});
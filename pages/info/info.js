// pages/info/info.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    customNavBarHeight: app.globalData.customNavBarHeight,
    Custom: app.globalData.Custom,
    modalName:null
  },

  showModal(e) {

    this.setData({
      modalName: e.currentTarget.dataset.target
    });

  },
  hideModal(e) {

    this.setData({
      modalName: null
    });
  },
});
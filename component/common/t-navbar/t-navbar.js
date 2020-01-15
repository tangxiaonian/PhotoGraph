// component/common/t-navbar/t-navbar.js
let app = getApp();

Component({

  options: {
    "multipleSlots": true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor:{
      type:String,
      value:"--gradualBlue"
    }
  },

  externalClasses: ["fixedClass"],

  /**
   * 组件的初始数据
   */
  data: {
    navbarHeight: app.globalData.customNavBarHeight,
    statusBarHeight: app.globalData.statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goback() {
      wx.navigateBack({
        delta:1
      });
    }
  }
})

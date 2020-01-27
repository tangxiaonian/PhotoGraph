// pages/info/childCompo/t-login-list/t-login-list.js
Component({

  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {

    // 跳转到个人信息页面
    goSelfInfo() {

      wx.navigateTo({
        url: '/views/selfinfo/selfinfo',
      });

    }
  }

});

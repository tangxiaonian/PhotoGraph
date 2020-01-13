// views/detail/childComp/t-bottombar/t-bottombar.js
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    hidden:{
      type:Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 点击了 输入框
    handlerClickInput() {
      this.triggerEvent("dispalyCommentbar");
    }
  }
})

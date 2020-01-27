// component/common/t-toast/t-toast.js
Component({

  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {

    content: {
      type: String,
      value: ""
    },
    isToastHidden: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  lifetimes: {

    attached:function () {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 点击关闭模态框
    clickClosed() {

      this.setData({
        isToastHidden: true
      });

    },
    handlerClick() {
      this.clickClosed();
    }

  }
});

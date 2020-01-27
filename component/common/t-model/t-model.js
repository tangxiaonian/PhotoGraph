// component/common/t-model/t-model.js
Component({

  options: {
    styleIsolation:"apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {

    isModalHidden: {
      type: Boolean,
      value: true
    },
    title: {
      type: String,
      value: "标题"
    },
    top: { // 距离顶部的距离 %单位
      type: Number,
      value: 50
    },
    placeholder:{
      type: String,
      value: "请输入内容"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content:"" // 文本框的内容
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 点击关闭模态框
    clickClosed() {

      this.setData({
        isModalHidden: true
      });

    },
    //文本框值改变
    handlerInputChange(event) {

      this.setData({
        content: event.detail.value
      });

    },
    // 点击确认按钮
    handlerConfirm(event) {

      this.triggerEvent("handlerConfirm",{data: this.data.content});

      this.clickClosed();
    },
    //获取内容
    getContext() {
      return this.data.content;
    },
    //清空内容
    clearContent() {

      this.setData({
        content: ""
      });
    }
  }
});

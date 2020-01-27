// views/public/childComp/theme-panel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    isHidden: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    themes: [
      "生活", "四季", "美照", "宠物"
    ],
    currentIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /*
      点击每一项
     */
    clientItem(event) {

      this.setData({
        currentIndex: event.currentTarget.dataset.index - '0'
      });

    },
    closeMake() {
      this.cancelClick();
    },
    /*
      取消按钮
     */
    cancelClick() {
      this.setData({
        isHidden: true
      });
    },
    /*
      确认按钮
     */
    confirmClick() {

      if (this.data.currentIndex !== -1) {

        this.triggerEvent("receiveTheme", {
          context: this.data.themes[this.data.currentIndex],
          id: this.data.currentIndex
        });

        this.cancelClick();

      } else {

        wx.showToast({
          title: '你没选择主题哦!',
          icon: 'none',
          duration: 1500
        });
      }

    }
  }
});

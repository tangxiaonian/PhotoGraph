// component/common/w-switchtab/w-switchtab.js
let app = getApp();
Component({

  options: {
    "multipleSlots": true
  },
  /**
   * 组件的属性列表
   */
  properties: {

    titles:{
      type:Array,
      value: []
    }

  },

  /**
   * 页面的初始数据
   */
  data: {
    current:0,  // 当前轮播图位置
    screenWidth: 0, // 屏幕宽度
    windowHeight:0, // 屏幕可用区高度
    offsetWidth:0, // 偏移值
    navbarHeight: app.globalData.customNavBarHeight
  },

  "lifetimes":{

    attached() {

      const res = wx.getSystemInfoSync();

      this.data.screenWidth = res.screenWidth;

      // 2个选项 分为4份
      this.setData({
        offsetWidth: (res.screenWidth / (this.data.titles.length * 2)) - 20, // - 偏移量
        windowHeight: res.windowHeight
      });

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    changeItem(event) {

      this.changePosistion(event.detail.current);

    },
    handlerClick(event) {

      let index = event.currentTarget.dataset.index;

      this.changePosistion(index);

      this.setData({
        current: index
      });

    },
    changePosistion(index) {

      index = index + (index + 1);

      this.setData({
        offsetWidth: (this.data.screenWidth / (this.data.titles.length * 2) ) * index - 20
      });

    }
  }
});

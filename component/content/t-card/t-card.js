// component/content/t-card/t-card.js
Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    essay: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    widthImg: 50
  },

  /**
   * 组件的方法列表
   */
  methods: {

    previewImg(event) {
      console.log( event.currentTarget.dataset.index )
      wx.previewImage({
        urls: this.data.essay.pictures,
        current: this.data.essay.pictures[event.currentTarget.dataset.index]
      });

    },
    goEssayDetail() {
      wx.navigateTo({
        url:"/views/detail/detail?id" + this.data.essay.id
      })
    }
  },
  "lifetimes": {

    attached() {

      if (this.data.essay) {

        let pictures = this.data.essay.pictures.split(",");

        let obj = {
          "essay.pictures": pictures,
        };

        if (pictures.length > 3) {
          obj.widthImg = 30;
        }

        this.setData(obj);

      }

    }
  }
});

// views/public/public.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    COUNT: 4,// 最多选取的图片数量

    imgList:[],//存放图片的list

    isThemePanelHidden: true, // 主题panel是否隐藏 默认隐藏

    location: "", //选择的位置

    theme:{context:""}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择地图位置
  chooseLocation() {

    wx.getLocation({

      type: 'gcj02',

      isHighAccuracy: true,

      success: (res) => {

        const latitude = res.latitude;
        const longitude = res.longitude;

        wx.chooseLocation({
          latitude,
          longitude,
          success:(res) => {
            this.setData({
              location:res.name
            });
          }
        });

      }
    });

  },
  /*
    接收用户选择的
   */
  receiveTheme(event) {

    console.log();

    this.setData({
      theme:event.detail
    })

  },

  /*
    显示主题面板
   */
  displayThemePanel() {

    this.setData({
      isThemePanelHidden: false
    });
  },
  // 图片选择
  chooseImage() {

    let count = this.data.COUNT - this.data.imgList.length;

    wx.chooseImage({
      count,
      sourceType:['album', 'camera'],
      success:(result) => {

        this.data.imgList.push(...result.tempFilePaths);

        this.setData({

          imgList: [...this.data.imgList]

        });

      }
    });

  },
  // 删除图片
  delImg(event) {

    let index = event.currentTarget.dataset.index - '0';

    let newArr = this.data.imgList.splice(index, 1);

    this.setData({
      imgList: [...this.data.imgList]
    });

  },
  // 图片预览
  viewImage(event) {

    wx.previewImage({
      urls: this.data.imgList,
      current:event.currentTarget.dataset.index - '0'
    });
  }

})
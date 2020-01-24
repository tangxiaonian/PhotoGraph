// views/public/public.js
import {fileUpload, publishEssay} from "../../network/public/publicRequest";
import {StorageUtils} from "../../utils/StorageUtils";

Page({

    /**
     * 页面的初始数据
     */
    data: {

        COUNT: 4,// 最多选取的图片数量

        imgList: [],//存放图片的list

        isThemePanelHidden: true, // 主题panel是否隐藏 默认隐藏

        isCover: false, // 是否作为封面

        location: "", //选择的位置

        theme: {   // 主题内容
          context: "",
          id: 2
        },
        content: "" // textarea 的内容
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    // 点击发布按钮
    handlerPublish(event) {

        if (this.data.isCover) {

            if (!this.data.imgList.length) {
                wx.showToast({
                    icon: "none",
                    title: "请添加图片作为封面!"
                });
            }
        }
        // 选择了主题
        if (this.data.theme.context) {
            // 上传文件
            this.data.imgList.length > 0 && fileUpload({
                file: []
            }, (result) => {
                console.log(result);
            })
            // 上传发布的内容信息
        } else {
            wx.showToast({
                icon: "none",
                title: "请选择一个主题!"
            });
        }
    },

    //*************网络请求****************
    publishEssay() {

        StorageUtils.get("user", (result) => {

            publishEssay({
                location: this.data.location,
                isCover: this.data.isCover ? 1 : 0,
                content: this.data.content,
                themid: this.data.theme.id,
                uid: result.data.id,
                pictures: this.data.imgList
            }, (result_) => {
                console.log(result_);
            }, (fail_) => {
                console.log(fail_);
            });

        });

    },
    // textarea 发生变化
    handlerInput(event) {

        this.setData({
            content: event.detail.value
        });

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
                    success: (res) => {
                        this.setData({
                            location: res.name
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

        this.setData({
            theme: event.detail
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
            sourceType: ['album', 'camera'],
            success: (result) => {

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
            current: event.currentTarget.dataset.index - '0'
        });
    }

});
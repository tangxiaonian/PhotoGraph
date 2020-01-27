import {deleteFile, publishEssayRequest} from "../../network/public/publicRequest";
import {HTTP_BASE_URL} from "../../network/index";
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
        content: "", // textarea 的内容
        pictures: [] // 上传的图片
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

            // 上传发布的内容信息

            // publishEssay();

            console.log("上传发布的内容...")

        } else {
            wx.showToast({
                icon: "none",
                title: "请选择一个主题!"
            });
        }
    },

    //*************网络请求****************
    /*
      文件上传
     */
    uploadFile(filePath) {

         return new Promise(((resolve, reject) => {

            StorageUtils.get("token", (result) => {

                wx.uploadFile({
                    url: HTTP_BASE_URL + "/essay/upload/single",
                    name: 'file',
                    filePath,
                    header: {
                        "Content-Type": "multipart/form-data",
                        authorization: result.data
                    },
                    success:resolve,
                    fail: reject
                });

            });

        }));
    },
    /*
        发布
     */
    publishEssay() {

        StorageUtils.get("user", (result) => {

            publishEssayRequest({
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

                // 上传图片
                this.uploadFile(result.tempFilePaths[0]).then((result) => {

                    this.data.pictures.push(JSON.parse(result.data).data);


                });

                this.setData({
                    imgList: [...this.data.imgList]
                });

            }
        });

    },
    // 删除图片
    delImg(event) {

        let index = event.currentTarget.dataset.index - '0';

        this.data.imgList.splice(index, 1);

        let filePath = this.data.pictures.splice(index, 1)[0];

        deleteFile({
            filePath
        },(result) => {
            console.log(result);
        },(fail) => {
            console.log(fail);
        });

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
// pages/hot/hot.js

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        ColorList: [
            {
                title: '嫣红',
                name: 'red',
                color: '#e54d42'
            },
            {
                title: '桔橙',
                name: 'orange',
                color: '#f37b1d'
            },
            {
                title: '明黄',
                name: 'yellow',
                color: '#fbbd08'
            },
            {
                title: '橄榄',
                name: 'olive',
                color: '#8dc63f'
            },
            {
                title: '森绿',
                name: 'green',
                color: '#39b54a'
            },
            {
                title: '天青',
                name: 'cyan',
                color: '#1cbbb4'
            },
            {
                title: '海蓝',
                name: 'blue',
                color: '#0081ff'
            },
            {
                title: '姹紫',
                name: 'purple',
                color: '#6739b6'
            },
            {
                title: '木槿',
                name: 'mauve',
                color: '#9c26b0'
            },
            {
                title: '桃粉',
                name: 'pink',
                color: '#e03997'
            },
            {
                title: '棕褐',
                name: 'brown',
                color: '#a5673f'
            }
        ],

        loadProgress: 0, // 进度条

        statusBarHeight: app.globalData.statusBarHeight, // 状态栏的高度
        customNavBarHeight: app.globalData.customNavBarHeight, // 自定义navbar高度
        windowHeight: app.globalData.windowHeight, // 屏幕高度
    },
// 顶部滚动条 的显示与隐藏
    loadProgress() {

        this.setData({
            loadProgress: this.data.loadProgress + 3
        });

        if (this.data.loadProgress >= 100) {
            // 回复默认值
            this.setData({
                loadProgress: 0
            });

        } else {
            // 利用计时器 做 计时
            setTimeout(() => {
                // 递归回调
                this.loadProgress();

            }, 100);
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.loadProgress();

    }

});
// pages/theme/theme.js

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        delayNumber: 3, // 延迟基数
        animationName: 'myAnimate',

        statusBarHeight: app.globalData.statusBarHeight, // 状态栏的高度
        customNavBarHeight: app.globalData.customNavBarHeight, // 自定义navbar高度
        windowHeight: app.globalData.windowHeight, // 屏幕高度
    },
    onTabItemTap(item) {

        if (item.index === 2) {

            this.setData({
                animationName:'myAnimate'
            });
        }
    },
    onHide() {
        this.setData({
            animationName:''
        });
    }
});
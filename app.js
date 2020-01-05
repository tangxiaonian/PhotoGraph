App({
    globalData: {

    },
    onLaunch(options) {

        let result = wx.getSystemInfoSync();

        let statusBarHeight = result.statusBarHeight;

        let react = wx.getMenuButtonBoundingClientRect();

        // 状态栏的高度
        this.globalData.statusBarHeight = react.top;
        this.globalData.Custom = react; // 胶囊位置信息
        this.globalData.windowHeight = result.windowHeight;

        // 自定义 navbar 的高度
        this.globalData.customNavBarHeight = react.top + react.bottom - statusBarHeight;
    }
});
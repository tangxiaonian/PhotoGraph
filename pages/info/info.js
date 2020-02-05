// pages/info/info.js
import {Debounce} from "../../utils/Utils";
import {StorageUtils} from "../../utils/StorageUtils";

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {

        modalName: null, // 是否打开左侧模态框

        isLogin: false, // 用户是否登陆
        opacity: 0, // 是否隐藏title
        isTabScrollY: false, // switchtabBar 里面的 scroll-view 是否可滚动

        infoBodyTop: 0, // 距离顶部的top值
        switchTabTop: 0,// switchTabTop 的top值

        toastContext: "", // toast 显示与隐藏
        isToastHidden: true,

        userInfo: null, // 用户信息

        statusBarHeight: app.globalData.statusBarHeight, // 状态栏的高度
        customNavBarHeight: app.globalData.customNavBarHeight, // 自定义navbar高度
        windowHeight: app.globalData.windowHeight, // 屏幕高度
    },
    onLoad() {

        this.initHeight();

        // 防抖函数
        this.Debouncefun = Debounce(this.pageScrollThrottling, 10);
    },
    showToast(event) {
        this.setData({
            isToastHidden: false,
            toastContext: event.detail.content
        });
    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        });
    },
    // 获取界面元素的高度
    initHeight() {
        this.createSelectorQuery()
            .select("#info-body")
            .boundingClientRect()
            .exec((res) => {
                this.data.infoBodyTop = res[0].top;
            });
        this.createSelectorQuery()
            .select("#switchTab")
            .boundingClientRect()
            .exec((res) => {
                this.data.switchTabTop = res[0].top;
            });
    },
    // 获取 QQ邮箱登陆的用户信息
    getQQUserInfo() {
        this.getUserInfo();
    },
    // 获取 微信登陆的用户信息
    getWxUserInfo() {
        this.getUserInfo();
    },
    // 登出
    loginOut() {

        this.setData({
            userInfo: null,
            isLogin: false
        });

        this.hideModal();
    },
    // 获取用户信息
    getUserInfo() {

        let userInfo = StorageUtils.get("user");

        userInfo.age = new Date().getFullYear() - new Date(userInfo.birthday).getFullYear();

        this.setData({
            userInfo,
            isLogin: true
        });
    },
    hideModal(e) {
        this.setData({
            modalName: null
        });
    },
    // 整个页面 scroll-view 滚动时触发的函数
    pageScrollThrottling(event) {

        // 1. 让头部导航栏渐变出现
        let scrollTop = event.detail.scrollTop;
        let infoBodyTop = this.data.infoBodyTop;
        let switchTabTop = this.data.switchTabTop;

        // console.log(event.detail.scrollTop, switchTabTop, switchTabTop - this.data.customNavBarHeight);

        // 滚动的距离 > infoBodyTop 小于 switchTab 的时候，改变 opacity
        if (scrollTop >= infoBodyTop && scrollTop <= (switchTabTop - this.data.customNavBarHeight)) {

            // 计算透明度
            let opacityValue = (scrollTop - infoBodyTop) / 100;

            this.setData({
                opacity: opacityValue
            });

        }
        // 2.滚动的距离 >= switchTabTop - 自定义的navbar的高度时 让 switchTab的swiper可以滚动
        if (scrollTop >= (switchTabTop - this.data.customNavBarHeight)) {

            console.log("isTabScrollY 可以滚动了...");

            this.setData({
                opacity: 1,
                isTabScrollY: true
            });
        }

    },
    // 整个页面的 scroll-view 滚动时触发函数
    handlerPageScroll(event) {
        this.Debouncefun(event);
    },
    // 监听包裹页面的 scroll-view 滚动到 顶部 时触发
    handlerPageScrollToupper() {

        this.setData({
            opacity: 0,
            isTabScrollY: false
        });

        // console.log("滚动到了顶部页面....");
    },
    // 监听包裹页面的 scroll-view 滚动到 底部 时触发
    handlerPageScrollLower() {

        this.setData({
            opacity: 1,
            isTabScrollY: true
        });

        // console.log("滚动到了底部页面....");
    },
    // switchTabScroll 的 scroll 滚动到顶部触发
    handlerScrollToupper() {

        // console.log("让 switchTab scrollview 不可滚动....");

        this.setData({
            isTabScrollY: false
        });
    }
});
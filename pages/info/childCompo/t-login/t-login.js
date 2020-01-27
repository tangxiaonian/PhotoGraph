// pages/info/childCompo/t-login/t-login.js
import {requestQQLogin, requestVerificationCode, requestWxLogin} from "../../../../network/info/infoRequest";
import {StorageUtils} from "../../../../utils/StorageUtils";

Component({

    options: {
        styleIsolation: "apply-shared"
    },
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */

    data: {
        verificationCode: null,
        qq: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 获取验证码接口
        getVerificationCode() {

            if (/\d*@qq\.com/.test(this.data.qq)) {

                requestVerificationCode({
                    qq: this.data.qq
                }, (result) => {

                    if (result.data.state === 200) {

                        this.triggerEvent("displayToast",{
                            content:result.data.message
                        });
                    }

                }, (fail) => {
                    console.log(fail);
                });
            }else {
                wx.showToast({
                    title: '请检查QQ邮箱格式!',
                    icon: 'none',
                    duration: 2000
                })
            }

        },

        // qq 登录
        qqLogin() {
            // 1634541514@qq.com
            // 301e
            if (/\d*@qq\.com/.test(this.data.qq) && this.data.verificationCode) {

                requestQQLogin({

                    verificationCode: this.data.verificationCode,

                    qq: this.data.qq

                }, (result) => {

                    if (result.data.state === 200) {

                        // 设置用户信息
                        StorageUtils.set("token", result.data.data.token);

                        let user = result.data.data.users;

                        user.age = new Date().getFullYear() - new Date(user.birthday).getFullYear();

                        StorageUtils.set("user", user);

                        // 关闭抽屉
                        this.triggerEvent("hideModal");

                        // 通知渲染用户信息
                        this.triggerEvent("getQQUserInfo");
                    }

                }, (fail) => {

                    wx.showToast({
                        title: '网络震荡,重试一下喽!',
                        icon: 'none',
                        duration: 2000
                    });

                });

            }
        },

        // wx 登录
        wxGetUserInfo(event) {

            let user = event.detail.userInfo;

            requestWxLogin({
                username: user.nickName,
                gender: user.gender,
                province: user.province,
                avatarUrl: user.avatarUrl
            }, (result) => {

                StorageUtils.set("token", result.data.data.token);

                StorageUtils.set("user", result.data.data.users);

                // 关闭抽屉
                this.triggerEvent("hideModal");

                // 通知渲染用户信息
                this.triggerEvent("getWxUserInfo")

            }, (fail) => {

                console.log(fail);

            });

        },

        qqInputChange(event) {

            this.setData({
                qq: event.detail.value
            });

        },

        verificationCodeInputChange(event) {

            this.setData({
                verificationCode: event.detail.value
            });

        }

    }
});

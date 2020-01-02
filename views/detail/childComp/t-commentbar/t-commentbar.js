// views/detail/childComp/t-commentbar/t-commentbar.js
Component({

    options: {
        styleIsolation: "apply-shared"
    },
    /**
     * 组件的属性列表
     */
    properties: {

        hidden: {
            type: Boolean,
            value: true
        },

    },
    /**
     * 组件的初始数据
     */
    data: {
        distanceBottom: 0, // 评论框距离底部的高度
        keyBoardHeight: 0, // 键盘的高度

        textContent: "", // 输入的内容

        isFocus: false, // 是否获取焦点
        isClickEmoji: false, //是否点击了表情按钮
        isClickKeyBoard: true, //是否点击了键盘按钮
        isDisable: false, // 控制input是否可用，控制键盘的显示和隐藏 false 不禁用 true 禁用
        isCkickKeyBoadrBack: false // 是否点击了键盘上面的隐藏键盘按钮
    },
    lifetimes: {

        attached() {

            // 键盘高度发生了变化
            wx.onKeyboardHeightChange(res => {

                // 当前点击了键盘上面的 下拉按钮 hidden = false    没有点表情按钮
                if (res.height === 0 && !this.data.hidden && !this.data.isClickEmoji) {

                    this.data.isCkickKeyBoadrBack = true;

                    // 设置回到底部
                    this.setData({
                        distanceBottom: 0
                    });
                }

            })

        },
        detached() {
            wx.onKeyboardHeightChange(res => {});
        }

    },
    /**
     * 组件的方法列表
     */
    methods: {

        // 还原所有数据
        initParamsMethod() {

            this.setData({
                isFocus: false,
                isClickEmoji: false,
                isClickKeyBoard: true,
                isDisable: false,
                isCkickKeyBoadrBack: false
            });

        },
        // 手动让输入框获取/失去焦点
        getSetInputFocus() {

            this.setData({
                isFocus: !this.data.isFocus
            });

        },
        // input得到焦点
        bindFocus(event) {

            // keyBoardHeight没有高度，说明是第一次进来 直接设置高度
            // distanceBottom 为 0 说明在 t-commentbar 当前页面显示的情况下的，还是的设置高度
            if (!this.data.keyBoardHeight || !this.data.distanceBottom) {

                this.setData({
                    distanceBottom: event.detail.height,
                });
                // 设置键盘高度
                this.data.keyBoardHeight = event.detail.height;
            }

        },
        // input失去焦点
        bindBlur() {

            // 点击了表情面板
            if (!this.data.isClickEmoji) {

                // 在当前 t-commentbar 显示的情况下 键盘高度变为0的
                if (this.data.isCkickKeyBoadrBack) {

                    console.log("在当前 t-commentbar 显示的情况下 键盘高度变为0的....");

                }else {

                    // 情况1.用户点击了 页面其他部位

                    // 隐藏当前
                    this.setData({
                        distanceBottom: 0,
                        isFocus: false
                    });

                    // 通知 唤醒 t-bottombar
                    this.triggerEvent("dispalyBottombar");
                }

            }

        },
        // 点击了键盘按钮
        clickKeyBoard() {

            // 用户没有点击键盘按钮
            if (!this.data.isClickKeyBoard) {

                // 让 input 获取焦点
                this.setData({
                    isDisable: !this.data.isDisable, // 唤醒键盘
                    isClickKeyBoard: !this.data.isClickKeyBoard,
                    isClickEmoji: !this.data.isClickEmoji, // 改变表情状态
                    isFocus: !this.data.isFocus, // 得到焦点
                });

                // 延迟一下 隐藏表情面板
                setTimeout(() => {
                    // 隐藏表情面板
                    this.triggerEvent("hiddenEmojiPanel");
                },800);

            }
        },
        // 点击了表情按钮
        clickEmoji() {

            // 开始点击
            if (!this.data.isClickEmoji) {

                // 防止 失去焦点时 isClickEmoji 没及时更新 导致 评论栏 下滑
                this.data.isClickEmoji = true;

                this.setData({
                    isClickKeyBoard: !this.data.isClickKeyBoard, // 键盘状态变为 false
                    isClickEmoji: !!this.data.isClickEmoji, //更改点击了表情按钮的状态
                    distanceBottom: this.data.keyBoardHeight // 设置距离底部的位置
                });

                // 延迟一下关闭键盘面板
                setTimeout(() => {
                    this.setData({

                        isFocus: !this.data.isFocus, // Input失去焦点
                        isDisable: !this.data.isDisable //Input禁用输入框
                    });
                },1000);

                // 通知 唤醒表情面板
                this.triggerEvent("dispalyEmojiPanel", {
                    keyBoardHeight: this.data.keyBoardHeight,
                });
            }
        },
        // 点击了发送信息按钮
        sendMsg() {

            console.log("点击了发送信息...");


            // 隐藏当前
            this.setData({
                distanceBottom: 0,
                isFocus: false,
                textContent:"" // 清空内容
            });

            // 通知 唤醒 t-bottombar
            this.triggerEvent("dispalyBottombar");
        },
        // 文本框数据发生改变
        bindInputChange(event) {

            console.log(event);

            this.data.textContent = event.detail.value;
        },
        // 设置表情
        setEmoji(emoji) {

            this.setData({
                textContent: this.data.textContent + emoji + ""
            });
        }
    }

});
// views/detail/childComp/t-emopanel/t-emopanel.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

        hidden: {
            type: Boolean,
            value: true
        },
        panelHeight: {
            type: Number,
            value: 0
        }

    },
    /**
     * 组件的初始数据
     */
    data: {
        emoji: "😁-😠-😍-😃-😁-😳-😓-😘-😭-😊-😂-😲-😚-😒-😨-😜-😝-😪-😏-😔-👏-👎-🐷-🌹-🌸-🕙-🐱-💘-🐶-👍",
    },

    /**
     * 组件的方法列表
     */
    methods: {},
    "lifetimes": {
        // 组件实例刚刚被创建时执行
        created() {

            this.data.emoji = this.data.emoji.split("-");

        }
    }
});

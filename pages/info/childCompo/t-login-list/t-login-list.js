// pages/info/childCompo/t-login-list/t-login-list.js
import {loginOutRequest} from "../../../../network/info/infoRequest";
import {StorageUtils} from "../../../../utils/StorageUtils";

Component({
  options: {
    styleIsolation: "apply-shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      value: null,
      type: Object
    }
  },
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到个人信息页面
    goSelfInfo() {
      wx.navigateTo({
        url: '/views/selfinfo/selfinfo',
      });
    },
    // 登出
    loginOut() {

      loginOutRequest({

        token: StorageUtils.get("token")

      },(result)=>{

        if (result.data.state === 200) {

          StorageUtils.remove("token");

          StorageUtils.remove("user");

          this.triggerEvent("loginOut");
        }

      },(fail)=>{

        console.log(fail);

        wx.showToast({
          title: "退出登录失败!"
        });

      });
    }
  }

});

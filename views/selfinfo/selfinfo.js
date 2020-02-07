// views/selfinfo/selfinfo.js
import {StorageUtils} from "../../utils/StorageUtils";
import {updateUserInfoRequest} from "../../network/info/infoRequest";
import {HTTP_BASE_URL} from "../../network/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    birthday: [],
    textNumber: 50
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let user = StorageUtils.get("user");

    user.age = new Date().getFullYear() - new Date( user.birthday ).getFullYear();

    for (let i = 1991; i <= new Date().getFullYear(); i++) {
      this.data.birthday.unshift(i + "");
    }

    if (user) {

      this.setData({
        userInfo: user,
        birthday: this.data.birthday
      });

    }

  },
  /*
    输入签名
   */
  handlerInput(event) {

    let text = event.detail.value;

    this.setData({
      "userInfo.remake": text,
      textNumber: 50 - text.length
    });

  },
  /*
    选择用户头像
   */
  chooseAvater() {
    wx.chooseImage({
      count: 1,
      success:(res) => {
        this.setData({
          "userInfo.avatarUrl": res.tempFilePaths[0]
        });
      }
    });
  },
  /*
    改变年龄
   */
  bindChange(event) {
    let age = (new Date().getFullYear() - this.data.birthday[event.detail.value]);
    this.setData({
      "userInfo.age": age,
      "userInfo.birthday": new Date(this.data.birthday[event.detail.value])
    });

  },
  /*
    发送更新请求
   */
  updateUserInfo() {

    updateUserInfoRequest(this.data.userInfo,
        (result)=>{
      StorageUtils.set("user", this.data.userInfo);
    },(result)=>{
      console.log(result);
    });
  },
  /*
    更新用户信息
   */
  saveUserInfo() {

    if (!this.data.userInfo.avatarUrl.includes("https://shouheng.oss-cn-beijing.aliyuncs.com")) {

      let token = StorageUtils.get("token");

      new Promise(((resolve, reject) => {

        wx.uploadFile({
          url: HTTP_BASE_URL + "/essay/upload/single",
          name: 'file',
          filePath:this.data.userInfo.avatarUrl,
          header: {
            "Content-Type": "multipart/form-data",
            authorization: token
          },
          success:resolve,
          fail: reject
        });

      })).then((res)=>{

        if (res.data.state === 200) {

          this.data.userInfo.avatarUrl = JSON.parse(res.data)["data"];

          this.updateUserInfo();

        }

      }).catch((fail)=>{

        console.log(fail);

      });
    }else {
      this.updateUserInfo();
    }
  }
});
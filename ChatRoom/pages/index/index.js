//index.js
//获取应用实例
const app = getApp()
const WXAPI = require('../../utils/main.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userSig: '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  //去聊天室
  toRoom:function(){
    let userID = `test2`;
    let to_user = `test1`;
    let userSig = this.data.userSig;
    let conversationID = "C2C" + to_user;
    let to_user_head = '';
    let roomID = '';
    console.log(userSig);
    wx.navigateTo({
      url: `../room/room?userID=${userID}&to_user=${to_user}&userSig=${userSig}&conversationID=${conversationID}`,
    })
  },
  //get UserSig
  getUserSig:function(userID){
    let that = this;
    WXAPI.getUserSig({
      userID: userID
    }).then(function (res) {
      console.log(res.data[0].userSig)
      that.setData({
        userSig:res.data[0].userSig
      })
    }).catch(function (e) {
    })
  },
  onLoad: function () {
    this.getUserSig('test2');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

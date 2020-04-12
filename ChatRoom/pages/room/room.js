// doc_yl/test/test.js
import TIM from 'tim-wx-sdk';
import COS from "cos-wx-sdk-v5";
var roomID, userID, to_user, userSig, to_user_head, conversationID;
console.log(global)
let that, pageImResponse;
const sdkAppID = 1400346002;//AppID
const EXPIRETIME = 604800;//签名有效期
const SECRETKEY = `42ab8cf2d123ca3b9fc714992dd4c5eb6cc02e7d694b3acbd97b3bf0603fc18a`;// 密钥
let tim;
Page({
  onLoad: function (options) {
    //插入用户id
    // this.addUser();
    //查询id
    // this.queryUser();
    //添加好友
    this.addFriends();
    that = this;

    let timOptions = {
      SDKAppID: sdkAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    };
    tim = TIM.create(timOptions); // SDK 实例通常用 tim 表示
    tim.setLogLevel(0);
    tim.registerPlugin({
      'cos-wx-sdk': COS
    });
    userID = options.userID
    to_user = options.to_user
    userSig = options.userSig
    to_user_head = options.to_user_head
    roomID = options.roomID
    conversationID = "C2C" + to_user;
    console.log('11111111111111111111111111', to_user)
    this.setData({
      im_id: userID
    })
    that.im_on();
    let promise = tim.login({
      userID,
      userSig
    });
    promise.then(function (imResponse) {
      pageImResponse = imResponse;
      console.log('------登录成功', pageImResponse); // 登录成功
    }).catch(function (imError) {
      console.warn('------login error:', imError); // 登录失败的相关信息
    });
  },
  //添加用户
  addUser:function(){
    let usersig = `eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwokpuZl5UInilOzEgoLMFCUrQxMDA2MTMwMDI4hMakVBZlEqUNzU1NTIwMAAIlqSmQsWszAzNLOwNDGFmpKZDjQ3JczRMrLY3yXJM9MtN9nNKaK4MiDSpTwqIDG3qDAr37PKLNIjRt-V2yct19NWqRYAZRYySQ__`;
      wx.request({
        url: `https://console.tim.qq.com/v4/im_open_login_svc/account_import?sdkappid=1400346002&identifier=admin&usersig=${usersig}&random=777777&contenttype=json`,
        data: {
          "Identifier": "test2",
          "Nick": "test2",
          "FaceUrl": ""
        },
        //header:{...}用啥设置啥，我这里什么都不需要修改
        method: "POST",
        dataType: "json",
        success: function (res) {
          console.log('添加人员ID',res)
          var obj = res;//我们这里打断点来看数据是否获取到了
        },
        fail: function (e) {
          console.log(e)
        },
        complete: function (obj) {

        }
      })
  },
  //查找用户
  queryUser:function(){
    let usersig = `eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwokpuZl5UInilOzEgoLMFCUrQxMDA2MTMwMDI4hMakVBZlEqUNzU1NTIwMAAIlqSmQsWszAzNLOwNDGFmpKZDjQ3JczRMrLY3yXJM9MtN9nNKaK4MiDSpTwqIDG3qDAr37PKLNIjRt-V2yct19NWqRYAZRYySQ__`;
    wx.request({
      url: `https://console.tim.qq.com/v4/im_open_login_svc/account_check?sdkappid=1400346002&identifier=admin&usersig=${usersig}&random=777777&contenttype=json`,
      data: {
        "CheckItem":
          [
            {
              "UserID": "test1"
            },
            {
              "UserID": "test2"
            }
          ]
      },
      //header:{...}用啥设置啥，我这里什么都不需要修改
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log('查询人员ID', res)
        var obj = res;//我们这里打断点来看数据是否获取到了
      },
      fail: function (e) {
        console.log(e)
      },
      complete: function (obj) {

      }
    })
  },
  //添加朋友
  addFriends:function(){
    let usersig = `eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwokpuZl5UInilOzEgoLMFCUrQxMDA2MTMwMDI4hMakVBZlEqUNzU1NTIwMAAIlqSmQsWszAzNLOwNDGFmpKZDjQ3JczRMrLY3yXJM9MtN9nNKaK4MiDSpTwqIDG3qDAr37PKLNIjRt-V2yct19NWqRYAZRYySQ__`;//admin的userSig。
    wx.request({
      url: `https://console.tim.qq.com/v4/sns/friend_add?sdkappid=1400346002&identifier=admin&usersig=${usersig}&random=777777&contenttype=json`,
      data: {
        "From_Account": "test1",
        "AddFriendItem":
          [
            {
              "To_Account": "test2",
              "Remark": "校友圈好友",
              "GroupName": "本地校友", // 添加好友时只允许设置一个分组，因此使用 String 类型即可
              "AddSource": "AddSource_Type_Circle",
              "AddWording": "我是你的本地校友 test1"
            }
          ],
        "AddType": "Add_Type_Both",
        "ForceAddFlags": 1
      },
      //header:{...}用啥设置啥，我这里什么都不需要修改
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log('添加好友', res)
        var obj = res;//我们这里打断点来看数据是否获取到了
      },
      fail: function (e) {
        console.log(e)
      },
      complete: function (obj) {
      }
    })
  },
  data: {
    vvvv: false,
    im_id: userID,
    inputValue: "",
    trtcConfig: {
      sdkAppID: sdkAppID, // 开通实时音视频服务创建应用后分配的 SDKAppID
      userID, // 用户 ID，可以由您的帐号系统指定
      userSig, // 身份签名，相当于登录密码的作用
      template: 'grid', // 画面排版模式
    },
    add: true
  },
  // 获取到焦点
  focus: function (e) {
    var that = this;
    // console.log(e.detail.height)
    this.setData({
      focus: true,
      add: true,
      cross: false,
      input_bottom: e.detail.height
    })
  },
  // 失去焦点
  no_focus: function (e) {
    if (this.data.cross) {
      this.setData({
        focus: false,
        input_bottom: 240,
      })
    } else {
      this.setData({
        focus: false,
        input_bottom: 0
      })
    }
  },
  // 点击加号
  add_icon_click: function (e) {
    // e.target.id == 1 点击加号   ==2  点击 X
    if (e.target.id == 2) {
      this.setData({
        add: true,
        cross: false,
        input_bottom: 0
      })
    } else if (e.target.id == 1) {
      this.setData({
        add: false,
        cross: true,
        input_bottom: 240
      })
    }
  },
  // 输入框
  bindKeyInput: function (e) {
    if (e.detail.value == "") {
      this.setData({
        if_send: false,
        inputValue: e.detail.value
      })
    } else {
      this.setData({
        if_send: true,
        inputValue: e.detail.value
      })
    }
  },
  // 获取消息列表
  getList() {
    // 打开某个会话时，第一次拉取消息列表
    console.log('----------222222222打开某个会话时，第一次拉取消息列表')
    tim.getMessageList({
      conversationID: conversationID,
      count: 15
    }).then(function (imResponse) {
      console.log('----------222222222', imResponse)
      const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。

      that.setData({
        messageList
      })
      that.bottom()

      // 下拉查看更多消息
      // let promise = tim.getMessageList({ conversationID: conversationID, nextReqMessageID, count: 15 });
      // promise.then(function (imResponse) {
      //   const messageList = imResponse.data.messageList; // 消息列表。
      //   const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      //   const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      // });
    });

  },
  // 发送视频通话
  sendv() {
    that.setData({
      vvvv: true
    }, () => {

      let trtcRoomContext = this.selectComponent('#trtcroom')
      let EVENT = trtcRoomContext.EVENT

      if (trtcRoomContext) {
        // 发布本地音频流和视频流
        trtcRoomContext.publishLocalVideo()
        trtcRoomContext.publishLocalAudio()

        // 监听远端用户的视频流的变更事件
        trtcRoomContext.on(EVENT.REMOTE_VIDEO_ADD, (event) => {
          console.error('--------监听远端用户的视频流的变更事件:', event)
          // 订阅（即播放）远端用户的视频流
          let v_userID = event.data.userID
          let streamType = event.data.streamType // 'main' or 'aux'            
          trtcRoomContext.subscribeRemoteVideo({
            userID: v_userID,
            streamType: streamType
          })
        })
        // 监听退出房间
        trtcRoomContext.on(EVENT.LOCAL_LEAVE, (event) => {
          console.error('--------监听退出房间:', event)
          that.setData({
            vvvv: false,
            cross: false,
            add: true,
            input_bottom: 0
          })
        })
        // 监听远端用户的音频流的变更事件
        trtcRoomContext.on(EVENT.REMOTE_AUDIO_ADD, (event) => {
          console.error('--------监听远端用户的音频流的变更事件:', event)
          // 订阅（即播放）远端用户的音频流
          let userID = event.data.userID
          trtcRoomContext.subscribeRemoteAudio(userID)
        })

        // 进入房间
        trtcRoomContext.enterRoom({
          roomID: roomID
        }).catch((res) => {
          console.error('--------room joinRoom 进房失败:', res)
          that.setData({
            vvvv: false
          })
        })
      }
    })
  },
  onUnload() {
    let promise = tim.logout();
    promise.then(function (imResponse) {
      console.log('退出成功',imResponse.data); // 退出成功
    }).catch(function (imError) {
      console.warn('logout error:', imError);
    });
    // tim=
  },
  // 监听IM
  im_on() {
    console.log('监听IM-------------------------')
    // 监听事件，例如：
    tim.on(TIM.EVENT.SDK_READY, function (event) {
      // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
      // event.name - TIM.EVENT.SDK_READY
      console.log('收到离线消息和会话列表同步完毕通知，接入侧可以调用')
      that.getList()

    });

    tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TIM.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
      console.log('.----------收到推送的单聊、群聊、群提示、群系统通知的新消息', event.data)
      that.setMessageList(event.data[0])
    });

    tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event) {
      // 收到消息被撤回的通知
      // event.name - TIM.EVENT.MESSAGE_REVOKED
      // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
    });

    tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event) {
      // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
      // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
      // event.data - 存储 Conversation 对象的数组 - [Conversation]
    });

    tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function (event) {
      // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
      // event.name - TIM.EVENT.GROUP_LIST_UPDATED
      // event.data - 存储 Group 对象的数组 - [Group]
    });

    tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function (event) {
      // 收到新的群系统通知
      // event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED
      // event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 operationType 枚举值说明
      // event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
    });

    tim.on(TIM.EVENT.PROFILE_UPDATED, function (event) {
      // 收到自己或好友的资料变更通知
      // event.name - TIM.EVENT.PROFILE_UPDATED
      // event.data - 存储 Profile 对象的数组 - [Profile]
    });

    tim.on(TIM.EVENT.BLACKLIST_UPDATED, function (event) {
      // 收到黑名单列表更新通知
      // event.name - TIM.EVENT.BLACKLIST_UPDATED
      // event.data - 存储 userID 的数组 - [userID]
    });

    tim.on(TIM.EVENT.ERROR, function (event) {
      // 收到 SDK 发生错误通知，可以获取错误码和错误信息
      // event.name - TIM.EVENT.ERROR
      // event.data.code - 错误码
      // event.data.message - 错误信息
    });

    tim.on(TIM.EVENT.SDK_NOT_READY, function (event) {
      // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
      // event.name - TIM.EVENT.SDK_NOT_READY
    });

    tim.on(TIM.EVENT.KICKED_OUT, function (event) {
      // 收到被踢下线通知
      // event.name - TIM.EVENT.KICKED_OUT
      // event.data.type - 被踢下线的原因，例如:
      //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
      //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
      //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢
    });
  },
  // 发送图片
  sendImg() {
    // 小程序端发送图片
    // 1. 选择图片
    wx.chooseImage({
      sourceType: ['album'], // 从相册选择
      count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
      success: function (res) {
        // 2. 创建消息实例，接口返回的实例可以上屏
        let message = tim.createImageMessage({
          to: to_user,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: {
            file: res
          },
          onProgress: function (event) {
            console.log('-------file uploading:', event)
          }
        });
        // 3. 发送图片
        let promise = tim.sendMessage(message);
        promise.then(function (imResponse) {
          // 发送成功
          console.log('----------发送图片:', imResponse);
          that.setMessageList(imResponse.data.message)
          that.setData({
            cross: false,
            add: true,
            input_bottom: 0
          })
        }).catch(function (imError) {
          // 发送失败
          console.warn('---------sendMessage error:', imError);
        });
      }
    })
  },
  // 添加聊天列表数据
  setMessageList(obj) {
    console.log('添加聊天列表数据')
    let messageList = that.data.messageList;
    messageList.push(obj)
    that.setData({
      messageList
    })
    that.bottom();
  },
  // 发送文字消息
  sendMessage() {
    console.log('-----发送文字-----', pageImResponse)
    if (pageImResponse) {
      // 1. 创建消息实例，接口返回的实例可以上屏
      let pageMessage = tim.createTextMessage({
        to: to_user,
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
          text: that.data.inputValue
        }
      });
      // 2. 发送消息
      tim.sendMessage(pageMessage).then(function (msg) {
        // 发送成功
        console.log('-----------发送成功------------111', msg);
        that.setMessageList(msg.data.message)
        that.setData({
          add: true,
          if_send: false,
          inputValue: ''
        })
      }).catch(function (imError) {
        // 发送失败
        console.log('-----------------------222', imError);
      });
    } else {
      console.log('pageImResponse'+'不存在')
      setTimeout(() => {
        this.sendMessage()
      }, 500)
    }
  },
  onReady: function () {
    
  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () {
    var that = this;
    this.setData({
      scrollTop: 100000
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
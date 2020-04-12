
// 获取全局变量
var global = getApp()
global.userID = '5c3cb6a9-7eb5-44ab-8e2a-4615e0b8392c';
// 定义全局变量
// global.userID = '5ba77f1b-0f27-4996-bc13-e5ac1f3ca52f';
// 小程序开发api接口统一配置
// 如果你的域名是： https://www.baidu.com/cn 那么这里只要填写 cn
let subDomain = ''  // 子域名,没有就等于''
const API_BASE_URL = 'https://localhost:443/alumnicircle/'  // 主域名


const request = (url, method, data) => {
  let _url = API_BASE_URL + subDomain + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  //获取用户信息
  getUserSig: (data) => request('wx/UserSig/getuserSig.do', 'post', data),
  
}
import {baseURL, timeout} from './config.js'

//网络请求方法
export default function request(options) {
  setTimeout(() => {
    wx.showLoading({
      title: '加载中...',
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 1000)
  }, 0);
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      timeout: timeout,
      data: options.data,
      method: options.method,
      success: function (res) {
        resolve(res.data)
      },
      fail: reject,
      complete: res => {
        
      }
    })
  })
}
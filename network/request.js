import {baseURL, timeout} from './config.js'

//网络请求方法
export default function request(options) {
  setTimeout(() => {
    wx.showLoading({
      title: '数据加载中ing',
    });
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
        wx.hideLoading();
      }
    })
  })
}
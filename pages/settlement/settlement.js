// pages/order/order.js
// 订单支付页面
import {
  tobepaidOrder
} from '../../network/order'
import {
  payfor, payForOrder
} from '../../network/pay'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: '',
    order: '',
    url: '', //支付url
    urlFlag: false
  },

  // 确认支付页面，并在用户点击确定后，调用支付接口(暂未测试)
  pay() {
    var that =this
    let data = {
      orderId : this.data.orderid,
      userId : wx.getStorageSync('loginInfo').userid
    }
    wx.showModal({
      cancelColor: 'cancelColor',
      content : '请您选择是否进行支付？',
      title : "确认是否支付",
      success(res) {
        if(res.confirm){

  //        that.start_pay()
          that._payForOrder(data)
          // payfor(data).then(res => {
          //   console.log(res.data)
          //   if(res.code==200){
          //     setTimeout(() => {
          //       wx.showToast({
          //         title: '支付成功！',
          //         icon: "success",
          //       });
          //       setTimeout(() => {
          //         wx.hideToast();
          //       }, 3000)
          //     }, 0);
          //   }
          // })
        }
      }
    })
  },


  start_pay(obj){
    var res = JSON.parse(obj);
    
    console.log(res.paySign)
    wx.requestPayment(
      {
      "timeStamp": res.timeStamp.toString(),
      "nonceStr": res.nonceStr,
      "package": res.package,
      "signType": res.signType,
      "paySign": res.paySign,
 //上面这些是从JSON中解析出来就行了。
      "success":function(res){
        console.log("pay="+res);
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 3000
        });
      },
      "fail":function(res){
        console.log(res)
        wx.showToast({
          title: '支付失败',
          icon: 'error',
          duration: 3000
        });
      },
      "complete":function(res){
        console.log(res)
        wx.showToast({
          title: '已取消',
          icon : 'loading',
          duration: 3000
        });
      }
      })
  },

dopay(){
  wx.request({
    url: address + 'wxPay',
    data: {
        openId: openId
        // amount: amount,
        // openId: openId
    },
    header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    method: "POST",
    success: function (res) {
        console.log(res);
        that.doWxPay(res.data);
    },
    fail: function (err) {
        wx.showToast({
            icon: "none",
            title: '服务器异常，清稍候再试'
        })
    },
  })
},
 
doWxPay(param) {
//小程序发起微信支付
  wx.requestPayment({
  timeStamp: param.data.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错
  nonceStr: param.data.nonceStr,
  package: param.data.package,
  signType: param.data.signType,
  paySign: param.data.paySign,
  success: function (event) {
  // success
  console.log(event);
  wx.showToast({
    title: '支付成功',
    icon: 'success',
    duration: 2000
  });
},
  fail: function (error) {
  // fail
  console.log("支付失败")
  console.log(error)
  },
  complete: function () {
  // complete
  console.log("pay complete")
  }
});
},

// 完成该订单的支付，返回结果为支付二维码链接
  _payForOrder(data){
    var that = this
    payForOrder(data).then(res =>{
      if(res.code==200){
        // wx.redirectTo({
        //   url: '../payment/payment?url='+url,
        // })
        that.start_pay(res.data)
        console.log(res.data)
      }
    })
  },

  



  // 根据当前用户的尚未支付订单列表以及所点击的订单 id 获取当前点击的订单的具体信息
  // 注：此处的订单 id 来自于订单列表页面的点击跳转传参
  _getorder(orderid){
    var userid = wx.getStorageSync('loginInfo').userid
    tobepaidOrder(userid).then(res =>{
      if(res.code==200){
        console.log(res.data)
        for(let i=0;i<res.data.orderListVOS.length;i++){
          if(orderid==res.data.orderListVOS[i].orderId){
            this.setData({
              order: res.data.orderListVOS[i]
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      orderid: options.orderid
    })
    that._getorder(options.orderid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
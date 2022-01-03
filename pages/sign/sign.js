// pages/sign/sign.js
// 签到页面
import {
  sign
} from '../../network/signList'
import {
  phone
} from '../../network/regist'
import {
  signCourse
} from '../../network/sign'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat1: 0,
    lng1: 0,
    long: 0,
    userid: '',
    idx: '',
    dayPlan: '',
    courseInfo: '',
    hiddenModal: true,
    phone: '',
    flagphone: false
  },

  // 获取当前用户输入的手机号
  userphone (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 通过调用 _phone() 函数来标记当前输入的手机号是否是已注册的用户
  findphone(){
    var that = this
    that._phone()
  },

  _phone(){
    let data = this.data.phone
    phone(data).then(res =>{
      if(res.code == 200){
        this.setData({
          flagphone: true
        })
      }else{
        this.setData({
          flagphone: false
        })
      }
    })
  },

  //确定按钮
  // 根据之前对用户输入的电话号码的校验来显示对应的响应
  confirm(){
    var that = this
    if(this.data.flagphone){
      setTimeout(() => {
        wx.showToast({
          title: '手机号不存在，请重新输入！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
      this.setData({
        phone: ''
      })
    }else{
      this.setData({
        hiddenModal: true
      })
      that._signCourse()
    }
    
  },
  //取消按钮
  cancel(){
    this.setData({
      hiddenModal: true
    })
  },

  //获取课程信息
  // 根据手机号获取当天的课程信息
  _signCourse(){
    let data = this.data.phone
    signCourse(data).then(res =>{
      console.log(res)
      if(res.code == 200){
        this.setData({
          dayPlan: res.data,
          userid: res.data[0].userId
        })
      }else{
        console.log("获取课程信息失败！")
      }
    })
  },
    //地图定位精确方法
 
  /**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
 
wgs84togcj02:function (lng, lat) {
  var that=this

  var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
  var PI = 3.1415926535897932384626;
  var a = 6378245.0;
  var ee = 0.00669342162296594323;
  if (that.out_of_china(lng, lat)) {
   return [lng, lat]
   }
  else {
    var dlat = that.transformlat(lng - 105.0, lat - 35.0);
    var dlng = that.transformlng(lng - 105.0, lat - 35.0);
var radlat = lat / 180.0 * PI;
var magic = Math.sin(radlat);
magic = 1 - ee * magic * magic;
var sqrtmagic = Math.sqrt(magic);
dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
var mglat = lat + dlat;
var mglng = lng + dlng;
return [mglng, mglat]
}
},
/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
 gcj02tobd09:function(lng, lat) {
  var that = this
  var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
  var PI = 3.1415926535897932384626;
  var a = 6378245.0;
  var ee = 0.00669342162296594323;
  var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
  var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lng, bd_lat]
},
transformlat:function (lng, lat) {
  var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
  var PI = 3.1415926535897932384626;
  var a = 6378245.0;
  var ee = 0.00669342162296594323;
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret
},

transformlng:function (lng, lat) {
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret
},

/**
* 判断是否在国内，不在国内则不做偏移
* @param lng
* @param lat
* @returns {boolean}
*/
out_of_china:function (lng, lat) {
  return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
},


  juli() {
    var that = this
    var lat1 = this.data.lat1
    var lng1 = this.data.lng1
    var lat2 = this.data.courseInfo.location[1]
    var lng2 = this.data.courseInfo.location[0]
    console.log(lat1)
    console.log(lng1)
    console.log(lat2)
    console.log(lng2)
    var radLat1 = lat1 * Math.PI / 180.0
    var radLat2 = lat2 * Math.PI / 180.0
    var a = radLat1 - radLat2
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137
    s = Math.round(s * 10000) / 10000
    that.setData({
      long: s,
    })
    console.log("您目前距离签到点：",s,"公里")
      if(s > 0.5){
 //   if(s > 500){
      setTimeout(() => {
        wx.showToast({
          title: '您现在不在签到范围内（500米）！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }else{
      that._sign()
    }
  },

  // 签到
  _sign(){
    let data = {
      userId : this.data.userid,
      phone: wx.getStorageSync('loginInfo').phone,
      courseId : this.data.courseInfo.courseId
    }
    sign(data).then(res =>{
      if(res == 200){
       setTimeout(() => {
         wx.showToast({
           title: '签到成功！',
         });
         setTimeout(() => {
           wx.hideToast();
         }, 1500)
       }, 0);
      }else{
       setTimeout(() => {
         wx.showToast({
           title: res.msg,
           icon: "none",
         });
         setTimeout(() => {
           wx.hideToast();
         }, 3000)
       }, 0);
      }
    })
  },
  

     // 签到课程选择
  chooseCourse(e) {
    var that = this
    console.log(e)
    that.setData({
       idx: e.currentTarget.dataset.type,
       courseInfo: this.data.dayPlan[e.currentTarget.dataset.type]
    })
    that.juli()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    if(wx.getStorageSync('loginInfo')){
      that.setData({
        phone: wx.getStorageSync('loginInfo').phone,
        userid: wx.getStorageSync('loginInfo').userid
      })
      that._signCourse()
    }else{
      that.setData({
        hiddenModal: false
      })
    }
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      isHighAccuracy: true,
      highAccuracyExpireTime: 3500,
      success: function (res) {
        console.log(res)
        var lat1 = res.latitude
        var lng1 = res.longitude
        var ssws=that.wgs84togcj02(lng1, lat1)
        ssws = that.gcj02tobd09(ssws[0]  , ssws[1] )
        //解决定位偏移
        var ssssss1 = ssws[1] - 0.000160
        var ssssss2 = ssws[0] - 0.000160
                          
        that.setData({ latitude: ssssss1.toFixed(6), longitude: ssssss2.toFixed(6) })
            that.setData({
                lng1: ssssss2.toFixed(6),
                lat1: ssssss1.toFixed(6)
            })
        console.log("纬度："+ssssss1.toFixed(6))
        console.log("经度："+ssssss2.toFixed(6))
      }
    })
       
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
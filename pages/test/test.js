// pages/test/test.js
// 开发过程中的测试页面，未应用在正式项目中
var dateTimePicker = require('../../utils/test1.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // lat1: 0,
    // lng1: 0,
    // long: 0
    isshow: false,
    exitApp: false,
    date: '2021-01-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2020,
    endYear: 2050
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
    var lat2 = 34.235532
    var lng2 = 108.924104
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
    console.log("您现在距离新科："+s+"km")
  },

  changeDate(e){
    this.setData({ date:e.detail.value});
  },
  changeTime(e){
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e){
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
    wx.showModal({
      cancelColor: 'cancelColor',
      confirmText: '已协商',
      cancelText: '联系老师',
      title: '补课申请',
      content: '请先与授课老师进行协商沟通补课时间',
      success(res){
        if(res.confirm){
          //选择日期和时间
          that.setData({
            isshow: true
          })
        }else if(res.cancel){
          //退出小程序
          wx.getSystemInfo({
            success: function(res) {
              if(res.SDKVersion>="2.1.0"){
                that.setData({
                  exitApp:true//data中的初始化变量
                })
              }
            }
          })
        }
      }
    })
    // var that = this;
    // wx.getLocation({
    //   type: 'wgs84',
    //   altitude: true,
    //   isHighAccuracy: true,
    //   highAccuracyExpireTime: 3500,
    //   success: function (res) {
    //     console.log(res)
    //     var lat1 = res.latitude
    //     var lng1 = res.longitude
    //     var ssws=that.wgs84togcj02(lng1, lat1)
    //     ssws = that.gcj02tobd09(ssws[0]  , ssws[1] )
    //     //解决定位偏移
    //     var ssssss1 = ssws[1] - 0.000160
    //     var ssssss2 = ssws[0] - 0.000160
                          
    //     that.setData({ latitude: ssssss1.toFixed(6), longitude: ssssss2.toFixed(6) })
    //         that.setData({
    //             lng1: ssssss2.toFixed(6),
    //             lat1: ssssss1.toFixed(6)
    //         })
    //     console.log("纬度："+ssssss1.toFixed(6))
    //     console.log("经度："+ssssss2.toFixed(6))
      
    //     that.juli()
        
    //   }
    // })
    // that.setData({
    //        lat1 : 34.2316,
    //         lng1 : 108.9129
    // })   
   
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
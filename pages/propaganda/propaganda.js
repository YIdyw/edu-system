// pages/propaganda/propaganda.js
// 课程预约页面
import {
  phone
} from '../../network/regist'
import {
  reservation
} from '../../network/reservation'
import {
  getAllSubject
} from '../../network/checkin'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseKind: "",
    name: "",
    age: "",
    phone: "",
    flag: false, //是否已经点击预约按钮
    flagphone: false,
    subject: '',
    idx1: 0,
    idx2: 0,
    subjectchildren: '',
    courseid: '',
    orgid:''
  },

  // 获取用户选择的课程种类
  courseKind (e) {
    this.setData({
      courseKind: e.detail.value
    });
  },

  // 获取用户输入的姓名
  name (e) {
    this.setData({
      name: e.detail.value
    });
  },

  // 获取用户输入的年龄
  age(e) {
      this.setData({
        age: e.detail.value,
      });
  },

  // 获取用户输入的手机号
  userphone (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  //校验用户输入的手机号是否已被注册
  findphone(){
    var that = this
    that._phone()
  },

  _phone(){
    let data = this.data.phone
    phone(data).then(res =>{
      if(res.code == 200){
        this.setData({
          flagphone: false
        })
      }else{
        this.setData({
          flagphone: true
        })
      }
    })
  },

  // 预约按钮功能，判断用户的输入和选择是否为空以及格式是否正确，并做相关提示
  // 如果均正确，则调用 _reservation() 实现课程预约
  reserve(){
    var that = this
    if (that.data.name == '') {
      setTimeout(() => {
        wx.showToast({
          title: '请输入姓名！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }else if (that.data.courseid == '') {
      setTimeout(() => {
        wx.showToast({
          title: '请选择课程类别！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }else if (that.data.name.indexOf(" ")>=0) {
        setTimeout(() => {
          wx.showToast({
            title: '姓名中不能包含空格！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }else if(!(/^1[3-9]\d{9}$/.test(that.data.phone))) {
      setTimeout(() => {
        wx.showToast({
          title: '手机号格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(this.data.flag){
      setTimeout(() => {
        wx.showToast({
          title: '请勿重复点击！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
      that._reservation()
    }
  },

  // 课程预约
  _reservation(){
    let data = {
      telephone : this.data.phone,
      username : this.data.name,
      age : this.data.age,
      categoryId: this.data.courseid,
      recommendId: app.globalData.marketers,
      orgId : this.data.orgid
    }
    reservation(data).then(res =>{
      if(res.code == 200){
        this.setData({
          flag: true
        })
        setTimeout(() => {
          wx.showToast({
            title: '预约成功！',
          });
          setTimeout(() => {
            wx.hideToast();
            wx.navigateBack({
              delta: 1,
            })
          }, 3000)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '预约失败！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }
    })
  },

  // 获取所有的课程类型
  _getAll(){
    getAllSubject().then(res =>{
      console.log(res)
      if(res.code == 200){
        this.setData({
          subject: res.data,
          idx1: 0,
          subjectchildren: res.data[0].children,
          idx2: 0,
          courseid: res.data[0].children[0].value
        })
      }
    })
  },

  // 课程类型选择
  PickerChange1(e){
    this.setData({
      idx1: e.detail.value,
      subjectchildren: this.data.subject[e.detail.value].children,
      idx2: 0,
      courseid: this.data.subject[e.detail.value].children[0].value
    })
  },

  // 详细课程类型选择
  PickerChange2(e){
    this.setData({
      idx2: e.detail.value,
      courseid: this.data.subjectchildren[e.detail.value].value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that._getAll()
    this.setData({
      orgid : options.orgid
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
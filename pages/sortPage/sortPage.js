// 当前页面已被弃用
import {
  getAllorg, getOrgCourse
} from '../../network/orginout'
import {
  getBannerPicture
} from '../../network/photo'
Page({
  data: {
    indexId: 0,
    load: true,
    getallorg:"",
    banner: [],
    courseinfo: '',
    flag: true
  },
  lower :function(e){
  
  },

//获取轮播图
_getbanner(){
  var data = {
    "page": 0,
    "size": 0
  }
  getBannerPicture().then(res => {
    console.log(res)
    this.setData({
      banner: res.data
    })
  })
},

  _getAllorg(){
    getAllorg().then(res => {
      wx.setStorageSync('getallorg', res.data)
      if (this.getInfoCallback) {
        this.getInfoCallback(res)
      }
      this.setData({
        getallorg:res.data
      })
    });
  },
  _getOrgCourse(data){
    getOrgCourse(data).then(res => {
      console.log(res)
      if (res.data.length===0){
        this.setData({
          flag:true
        })
      }
      else{
        this.setData({
          flag: false,
          courseinfo: res.data
        })
      }
    });
  },

  onItemClick(e){
    let index = e.currentTarget.dataset.menuindex
    wx.navigateTo({
      url: "../courseinfo/courseinfo?index=" + this.data.courseinfo[index].courseId + '&orgid=' + this.data.getallorg[this.data.indexId].orgId,
    })
  },

  onLoad() {
    var that=this;
    that._getbanner();
    setTimeout(() => {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      setTimeout(() => {
        wx.hideLoading();
      }, 1500)
    }, 0);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
    that._getAllorg()
    this.getInfoCallback = res => {
      this._getOrgCourse(res.data[0])
    }
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    let index = e.currentTarget.dataset.menuindex
    let that = this
    that.setData({
      indexId: index
    });
    that._getOrgCourse(this.data.getallorg[index])
  },
})
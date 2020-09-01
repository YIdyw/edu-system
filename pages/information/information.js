import {
  infoIn,getStuInfo
} from '../../network/information'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginInfo:"",
    name:"",
    grade:"",
    school:"",
    type:"",
    qq:"",
    weixin:"",
    flag:false,
    getstuinfo:"",
    picker: ['学龄前', '一年级', '二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  name: function (e) {
    
    this.setData({
    name: e.detail.value
    
    })
    },
  school: function (e) {
    
    this.setData({
    school: e.detail.value
    
    })
    },
  qqinput: function (e) {
    
    this.setData({
    qq: e.detail.value
    
    })
    },
  weixin: function (e) {
    
    this.setData({
    weixin: e.detail.value
    
    })
    },
  type: function (e) {
    
      this.setData({
      type: e.detail.value
      
      })
  },
  _infoIn(){
    var that=this;
    
    let data={
      userid:wx.getStorageSync('loginInfo').userid,
      name:that.data.name,
      grade:that.data.index,
      school:that.data.school,
      type:that.data.type,
      qq:that.data.qq,
      weixin:that.data.weixin
    }
    infoIn(data).then(res=>{
      console.log(res)
      if(res.code==200){  
        wx.navigateTo ({
          url: '../my/my',
          });      
        wx.showToast({
          title: '登记成功',
        });
      
      }else{
        wx.showToast({
          title: '登记失败，请勿重复登记',
          icon: 'none'
        })
      }       
    });
  },
  _getStuInfo(){
    let data={
      userid:wx.getStorageSync('loginInfo').userid
    }
    console.log(data)
    getStuInfo(data).then(res=>{
      console.log(res)
      if(res.code==200){  
        wx.setStorageSync('getstuinfo', res.data)
        this.setData({
          getstuinfo:wx.getStorageSync('getstuinfo'),
          flag:true
        })
        if(res.data.grade==0){
          this.setData({
            grade:"学龄前"
          })
        }else if(res.data.grade==1){
          this.setData({
            grade:"一年级"
          })
        }else if(res.data.grade==2){
          this.setData({
            grade:"二年级"
          })
        }else if(res.data.grade==3){
          this.setData({
            grade:"三年级"
          })
        }else if(res.data.grade==4){
          this.setData({
            grade:"四年级"
          })
        }else if(res.data.grade==5){
          this.setData({
            grade:"五年级"
          })
        }else if(res.data.grade==6){
          this.setData({
            grade:"六年级"
          })
        }else if(res.data.grade==7){
          this.setData({
            grade:"初一"
          })
        }else if(res.data.grade==8){
          this.setData({
            grade:"初二"
          })
        }else if(res.data.grade==9){
          this.setData({
            grade:"初三"
          })
        }else if(res.data.grade==10){
          this.setData({
            grade:"高一"
          })
        }else if(res.data.grade==11){
          this.setData({
            grade:"高二"
          })
        }else if(res.data.grade==12){
          this.setData({
            grade:"高三"
          })
        }
      }else{
        this.setData({
          flag:false
        })
      }       
    });
  },
  bindclick(e){
    var that=this;
    that._infoIn();         
  },
  onLoad: function (options) {
    var that=this
    that._getStuInfo()
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
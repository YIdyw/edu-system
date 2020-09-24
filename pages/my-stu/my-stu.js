
import {
  updateInfo
} from '../../network/regist'
var app = getApp()
Page({
  data: {
    ColorList: app.globalData.ColorList,
    current:0,
    islogin: false,
    isflag: false,
    iconList: [{
      icon: 'addressbook',
      color: 'red',
      id:0,
      name:'信息登记' 
    }, {
      icon: 'edit',
      color: 'orange',
      id:1,
      name: '课程相关'
    }, {
      icon: 'qrcode',
      color: 'yellow',
      id:2,
      name: '扫一扫'
    }, {
      icon: 'write',
      color: 'olive',
      id:3,
      name: '我的试听'
    }, {
      icon: 'cart',
      color: 'cyan',
      id:4,
      name: '购课车'
    }, {
      icon: 'calendar',
      color: 'blue',
      id:5,
      name: '我的课表'
    } ],
    isFaceChecked: 0,
    userInfo: {}
  },

  facehandler(e){
    var that=this;
    var id = e.currentTarget.id;
    console.log(id)
    this.setData({
      isFaceChecked: id,
      
    })
   if(that.data.isFaceChecked==0){
    wx.navigateTo({
      url: '../information/information',
    })
   }else if (that.data.isFaceChecked==1){
     var that=this;
      wx.navigateTo({
        url: '../aboutclass/aboutclass',
      })
    }else if(that.data.isFaceChecked==2){
      this.picture2()
    }else if(that.data.isFaceChecked==3){
      wx.navigateTo({
        url: '../trylisten/trylisten',
      })
    }else  if(that.data.isFaceChecked==4){
      wx.navigateTo({
        url: '../carts/carts',
      })
    }else  if(that.data.isFaceChecked==5){
      wx.navigateTo({
        url: '../classpage/classpage',
      })
    }
  },
handleChangeScroll ({ detail }) {
  this.setData({
      current_scroll: detail.key
  });
},
isout(){
  wx.navigateTo({
    url: '../my/my'
  })
  wx.clearStorage()
},

picture2(){
  wx.scanCode({
    success: (res) => {
      var show2code=res.result;
      wx.setStorageSync('show2code',show2code);
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateTo({
        url: '../code2msg/code2msg',
      })
      },
      fail: (res) => {
      wx.showToast({
        title: '失败',
        icon: 'none',
        duration: 2000
      })
      },
      complete: (res) => {} 
  })
},

  update() {
    let data = {
      defaultRole: 2,
      userid: this.data.loginInfo.userid
    }
    updateInfo(data).then(res =>{
      if(res.code == 200){
        wx.showToast({
          title: '切换成功！',
        })
        var logininfo = this.data.loginInfo
        logininfo.defaultRole = 2
        console.log(logininfo)
        wx.setStorageSync('loginInfo', logininfo)
        wx.redirectTo({
          url: '../my-tch/my-tch',
        })
      }
    })
  },

  tobe(){
    const that = this
    var logininfo = this.data.loginInfo
    if(logininfo.role1 == 2 || logininfo.role2 == 2 || logininfo.role3 == 2){
      wx.showModal({
        title: '您当前身份为学生',
        content: '确定将身份切换为教师吗',
        success(res) {
          if (res.confirm) {
  　　　　　console.log('用户点确定了');
            that.update();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
    })
    }else {
      wx.showToast({
        title: '该账号只有一个身份!',
        icon: 'none'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      current: "mine"
  });
    let loginInfo = wx.getStorageSync('loginInfo');
    if(loginInfo){
      this.setData({
        loginInfo: loginInfo,
        islogin: true,
      });
    }
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
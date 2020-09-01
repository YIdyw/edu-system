
var app = getApp()
Page({
  data: {
    ColorList: app.globalData.ColorList,
    current:0,
    islogin: false,
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
      icon: 'profile',
      color: 'yellow',
      id:2,
      name: '个人中心'
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
  handleChange ({ detail }) {
    var that=this
    this.setData({
        current: detail.key
    });
    if (that.data.current=='homepage'){
      wx.navigateTo({
        url: '../home/home',
      })
    }
    else if(that.data.current=='group'){
      wx.redirectTo({
        url: '../sortPage/sortPage',
      })
    }
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
      wx.navigateTo({
        url: '../mancentral/mancentral',
      })
    }else if(that.data.isFaceChecked==3){
      wx.navigateTo({
        url: '../trylisten/trylisten',
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
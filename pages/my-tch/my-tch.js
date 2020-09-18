import {
  getTeacherInfo
} from '../../network/checkin'
import {
  updateInfo
} from '../../network/regist'
var app = getApp()
Page({
  data: {
    loginInfo:[],
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
      name: '课程管理'
    }, {
      icon: 'profile',
      color: 'yellow',
      id:2,
      name: '个人中心'
    }, {
      icon: 'noticefill',
      color: 'olive',
      id:3,
      name: '通知'
    }, {
      icon: 'cascades',
      color: 'cyan',
      id:4,
      name: '挂靠管理'
    }, {
      icon: 'upstagefill',
      color: 'blue',
      id:5,
      name: '排行'
    } ],
    isFaceChecked: 0,
    notifyNum: 0,
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
    var id = e.currentTarget.dataset.id;
    this.setData({
      isFaceChecked: id
    });
   if(that.data.isFaceChecked==0){
    wx.navigateTo({
      url: '../info-t/info-t',
    })
   }else if(that.data.isFaceChecked==1){
     if(this.data.isflag){
      wx.navigateTo({
        url: '../classmgmt/classmgmt',
      })
     }else{
       wx.showToast({
         title: '请先实名认证、信息登记',
         icon: 'none'
       })
     }
    }else if(that.data.isFaceChecked==2){
      wx.navigateTo({
        url: '../mancentral/mancentral',
      })
    }else if(that.data.isFaceChecked==3){
      if(this.data.isflag){
        wx.navigateTo({
          url: '../notify/notify',
        })
      }else{
        wx.showToast({
          title: '请先实名认证、信息登记',
          icon: 'none'
        })
      }
    }else if(that.data.isFaceChecked==4){
      if(this.data.isflag){
        wx.navigateTo({
          url: '../relymgmt/relymgmt',
        })
      }else{
        wx.showToast({
          title: '请先实名认证、信息登记',
          icon: 'none'
        })
      }
    }
  },
  isout(){
    wx.reLaunch({
      url: '../my/my'
    });
    wx.clearStorage();
  },

  update() {
    let data = {
      defaultRole: 3,
      userid: this.data.loginInfo.userid
    }
    updateInfo(data).then(res =>{
      if(res.code == 200){
        wx.showToast({
          title: '切换成功！',
        })
        var logininfo = this.data.loginInfo
        logininfo.defaultRole = 3
        console.log(logininfo)
        wx.setStorageSync('loginInfo', logininfo)
        wx.redirectTo({
          url: '../my-stu/my-stu',
        })
      }
    })
  },

  tobe(){
    const that = this
    var logininfo = this.data.loginInfo
    if(logininfo.role1 == 3 || logininfo.role2 == 3 || logininfo.role3 == 3){
      wx.showModal({
        title: '您当前身份为教师',
        content: '确定将身份切换为学生吗',
        success(res) {
          if (res.confirm) {
  　　　　　console.log('用户点确定了')
            that.update()
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
    let notify = wx.getStorageSync('notify');
    let notifyNum = 0
    getTeacherInfo(loginInfo.userid).then((res) => {
      if (res.code == 200) {
        this.setData({
          isflag: true,
        });
      }
    })
    for(let i=0; i<notify.length; i++){
      if(!notify[i].isRead){
        notifyNum++;
      }
    }
    if(loginInfo){
      this.setData({
        loginInfo: loginInfo,
        islogin: true,
        notifyNum: notifyNum
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
    let loginInfo = wx.getStorageSync('loginInfo');
    let notify = wx.getStorageSync('notify');
    let notifyNum = 0
    getTeacherInfo(loginInfo.userid).then((res) => {
      if (res.code == 200) {
        this.setData({
          isflag: true,
        });
      }
    })
    for(let i=0; i<notify.length; i++){
      if(!notify[i].isRead){
        notifyNum++;
      }
    }
    if(loginInfo){
      this.setData({
        loginInfo: loginInfo,
        islogin: true,
        notifyNum: notifyNum
      });
    }
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
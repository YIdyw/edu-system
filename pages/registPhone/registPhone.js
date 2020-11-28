import {
  registInfo, phone
} from '../../network/regist'
import {
  getPhonecode, checkCode, getPhonecodeTest, checkCodeTest
} from '../../network/phonecode'

Page({
  data: {
    phone:"",
    code:"",
   flagaccount: false,
   flagphone: false
  },
  
  userphone (e) {

    this.setData({
      phone: e.detail.value
    });
  },

  findphone(){
    var that = this
    that._phone()
  },

  inputcode(e){
    this.setData({
      code: e.detail.value
    });
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

  _getPhonecode(){
    var that=this;
    var phone=that.data.phone;
    let data={
      phone:phone
    }
    getPhonecodeTest(data).then(res => {
      console.log(res)
      if(res.code==200){
        setTimeout(() => {
          wx.showToast({
            title: '验证码发送成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '验证码发送失败！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }
    })
  },

  _checkCode(){
    var that=this
    let data={
      phone:that.data.phone,
      verifyCode:that.data.code
    }
    checkCodeTest(data).then(res => {
      if(res.code==200){
        if(this._getcallback){
          this._getcallback(true)
        }
      }
    })
  },

  getcode(){
    var that=this;
    if(!(/^1[3-9]\d{9}$/.test(that.data.phone))) {
      setTimeout(() => {
        wx.showToast({
          title: '手机号格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
  } else{
    that._getPhonecode()
  }
  },
  regist: function (e) {
    var that = this
    if(!(/^1[3-9]\d{9}$/.test(that.data.phone))) {
      setTimeout(() => {
        wx.showToast({
          title: '手机号格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
        
      that._checkCode();
      this._getcallback = res => {
        console.log(res)
        if(res){
          that._registInfo();
        } else{
          setTimeout(() => {
            wx.showToast({
              title: '验证码错误！',
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }
      } 
    }
  },
  _registInfo() {
    const that = this;
    let data = {
        phone: that.data.phone
    }
    console.log("data",data)
    registInfo(data).then(res => {
      wx.setStorageSync('registInfo', res.data)
      console.log(res)
        if(res.code==200){
          if(this.data.index == 1){
            setTimeout(() => {
              wx.showToast({
                title: '请完成实名认证、信息登记！',
                icon: 'none'
              });
              setTimeout(() => {
                wx.hideToast();
              }, 1500)
            }, 0);
          }else{
            setTimeout(() => {
              wx.showToast({
                title: '请先登记信息！',
              });
              setTimeout(() => {
                wx.hideToast();
              }, 1500)
            }, 0);
          }
          wx.navigateTo({
            url: '../registNext/registNext',
          })
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '注册失败！',
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
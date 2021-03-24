// 用手机号注册
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
  
  // 获取用户输入的手机号
  userphone (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 调用 _phone() 函数查找该手机号是否已经注册
  findphone(){
    var that = this
    that._phone()
  },

  // 获取用户输入的验证码
  inputcode(e){
    this.setData({
      code: e.detail.value
    });
  },

  // 根据用户输入的手机号查找是否已经注册
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

  // 根据用户的手机号，调用后端接口向该手机发送验证码
  // 并根据后端返回消息，提示用户验证码是否已经发送
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

  // 根据当前手机号以及发送的验证码的关联，校验用户输入的验证码是否正确
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

  // 校验手机号的格式，校验无误就发送验证码
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

  // 注册用户的整体流程，对上述的一系列函数的调用
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

  // 注册完成后给当前用户进行用户信息完整度标记
  // 并根据标记情况提醒用户完成实名认证以及信息登记，同时跳转到信息登记页面
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
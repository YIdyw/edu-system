import {
  registInfo, account, phone
} from '../../network/regist'
import {
  getPhonecode, checkCode, getPhonecodeTest, checkCodeTest
} from '../../network/phonecode'

Page({
  data: {
    account:"",
    password:"",
    againpassword:"",
    phone:"",
    code:"",
   flagaccount: false,
   flagphone: false
  },
  useraccount (e) {
    var that = this
    this.setData({
      account: e.detail.value
    });
  },
  userpassword (e) {
    this.setData({
      password: e.detail.value
    });
  },
  againpassword(e) {
    
      this.setData({
        againpassword: e.detail.value,
      });
    
  },
  checkpassword(e){
    
  },
  
  userphone (e) {
    var that = this
    this.setData({
      phone: e.detail.value
    });
    that._phone()
  },
  inputcode(e){
    this.setData({
      code: e.detail.value
    });
  },

  
  _account(){
    let data = this.data.account
    account(data).then(res =>{
      if(res.code == 200){
        wx.showToast({
          title:'用户名可用'
        })
      }else{
        wx.showToast({
          title: '当前用户名已被使用',
          icon: 'none'
        })
      }
    })
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
    if (that.data.account == '') {
      setTimeout(() => {
        wx.showToast({
          title: '请输入用户名！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if (that.data.account.indexOf(" ")>=0) {
        setTimeout(() => {
          wx.showToast({
            title: '用户名中不能包含空格！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }else if(that.data.password == ''||that.data.password.length<6) {
      setTimeout(() => {
        wx.showToast({
          title: '密码格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(that.data.againpassword==''||that.data.againpassword!=that.data.password||that.data.password!=that.data.againpassword){
      setTimeout(() => {
        wx.showToast({
          title: '请再次确认密码！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
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
        account: that.data.account,
        password: that.data.password,
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
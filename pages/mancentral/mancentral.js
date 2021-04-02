// 教师的个人中心
import {
  userAuthed
} from '../../network/authID'
import {
  updatePwd, setPassword
} from '../../network/phonecode'
import {
  getPassword
} from '../../network/getcode'
Page({
  data: {
    userInfo:[],
    nickname: '',
    mail: '',
    flag: false,
    isupdatepsword: true, //是否修改密码
    ishasPassword: false, //是否有密码
    newpsword: '',
    oldpsword: ''
  },
  
  // 跳转到教师身份认证页面
  gotorgd:function(e){
    wx.redirectTo({
      url: '../rgistID/rgistID'
    })
  },

  // 修改信息按钮，点击修改信息后，修改标志变量 flag 然后可以对个人信息进行修改
  modifyClick(){
    this.setData({
      flag: true,
      isupdatepsword: true
    });
  },

  // 获取用户修改时填入的昵称名
  nicknameModify(e){
    this.setData({
      nickname: e.detail.value
    });
  },

  // 获取用户修改时填入的邮箱
  mailModify(e){
    this.setData({
      mail: e.detail.value
    });
  },

   //选择修改密码**********************************************
   updatepassword(){
    this.setData({
      isupdatepsword: false
    })
  },

  // 获取用户输入的新密码
  newpsword(e){
    this.setData({
      newpsword: e.detail.value
    });
  },

  // 获取用户输入的旧密码
  oldpsword(e){
    this.setData({
      oldpsword: e.detail.value
    });
  },

  //判断用户是否有密码**********************************************
  _hasPassword(){
    let data = {
      userId: wx.getStorageSync('loginInfo').userid
    }
    getPassword(data).then(res =>{
      if(res.code == 200){
        if(res.msg == "请设置密码"){
          this.setData({
            ishasPassword: false
          })
        } else if(res.msg == "已设置密码"){
          this.setData({
            ishasPassword: true
          })
        }else{
            console.log("接口出错！");
        }
      }
    })
  },

  //新设置密码**********************************************
  setPassword(){
    let data = {
      userid: wx.getStorageSync('loginInfo').userid,
      password: this.data.newpsword
    }
    console.log(data)
    if(this.data.newpsword.length<6){
      setTimeout(() => {
        wx.showToast({
          title: '密码少于6位！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
      setPassword(data).then(res =>{
        if(res.code==200){
          setTimeout(() => {
            wx.showToast({
              title: '密码修改成功！',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 3000)
          }, 0);
        }else{
          setTimeout(() => {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 3000)
          }, 0);
        }
      })
    }
  },

  // 修改密码
  updatepsword(){
    let data = {
        newPwd : this.data.newpsword,
        userid : wx.getStorageSync('loginInfo').userid,
        oldPwd: this.data.oldpsword
    }
    if(this.data.newpsword.length<6){
      setTimeout(() => {
        wx.showToast({
          title: '密码少于6位！',
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
      updatePwd(data).then(res => {
        console.log(res)
        if(res.code==200){
          setTimeout(() => {
            wx.showToast({
              title: '密码修改成功！',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '密码修改失败！',
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }
      })
    }
    
  },

  // 修改教师的个人信息，将新的数据传入后端
  _userAuthed(){
    let that=this;
    let data={
      account:that.data.userInfo.account,
      nickname:that.data.userInfo.nickname,
      gender:that.data.userInfo.gender,
      mail:that.data.userInfo.mail,
      birth:that.data.userInfo.birth,
      phone:that.data.userInfo.phone,
      userid:that.data.userInfo.userid
    }
    userAuthed(data).then(res=>{
      console.log(res)
      if(res.code==200){   
        setTimeout(() => {
          wx.showToast({
            title: '修改成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '修改失败！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }       
    });
  },

  // 确认修改信息按钮，校验用户新的输入是否正确，如果正确并确定修改
  // 则调用 _userAuthed() 将信息传给后端，如果并未改动，则提示用户信息未改变
  infoConfirm(){
    let that=this
    let data = this.data
    let mail = data.mail
    let verifyMail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    let verify = mail.length?verifyMail.test(mail):true
    if(!verify){
      setTimeout(() => {
        wx.showToast({
          title: '邮箱格式错误！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(that.data.nickname.indexOf(" ")>=0){
      setTimeout(() => {
        wx.showToast({
          title: '昵称中不能包含空格！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
      let nickname = data.nickname
      let info = (nickname?'[昵称]': '') + (mail?'[邮箱]': '')
      if(info.length){
        wx.showModal({
          content: '您的' + info + '已发生改动，是否确认修改信息',
          success: (res)=>{
            if(res.confirm){
              let loginInfo = wx.getStorageSync('loginInfo')
              loginInfo.nickname = nickname?nickname:data.userInfo.nickname
              loginInfo.mail = mail?mail:data.userInfo.mail
              wx.setStorageSync('loginInfo', loginInfo)
              this.setData({
                userInfo: loginInfo,
                flag: false
              });
              
            }else{
              this.setData({
                nickname: '',
                mail: ''
              });
            }
            that._userAuthed()
          }
        })
      }
      else{
        this.setData({
          flag: false
        });
        setTimeout(() => {
          wx.showToast({
            title: '信息未改动！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:wx.getStorageSync('loginInfo')
    });
    var that = this;
    that._hasPassword();
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
    this.setData({
      userInfo:wx.getStorageSync('loginInfo')
    });
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
import {
  infoIn, getStuInfo
} from '../../network/information'
import {
  updatePwd
} from '../../network/phonecode'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginInfo:"",
    name:'',
    isupdatepsword: true,
    grade:'',
    school:'',
    secondTel:'',
    qq:'',
    index:'',
    weixin:'',
    flag:false,
    getstuinfo:"",
    picker: ['学龄前', '一年级', '二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'],
    oldpsword: '',
    newpsword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  PickerChange(e) {
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

  secondTel: function (e) {
      this.setData({
        secondTel: e.detail.value
        })
  },

  updatepassword(){
    this.setData({
      isupdatepsword: false
    })
  },

  newpsword(e){
    this.setData({
      newpsword: e.detail.value
    });
  },

  oldpsword(e){
    this.setData({
      oldpsword: e.detail.value
    });
  },

  
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
          icon: 'none'
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
              title: res.msg,
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

  _infoIn(){
    var that=this;
    
    let data={
      userid:wx.getStorageSync('loginInfo').userid,
      name:that.data.name,
      grade:that.data.index,
      school:that.data.school,
      secondTel:that.data.secondTel,
      qq:that.data.qq,
      weixin:that.data.weixin
    }
    if(that.data.name==''||that.data.index==''||that.data.school==''||
    that.data.type==''||that.data.qq==''||that.data.weixin==''){
      setTimeout(() => {
        wx.showToast({
          title: '请将信息填写完整！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(!(/^1[3-9]\d{9}$/.test(that.data.secondTel))){
      setTimeout(() => {
        wx.showToast({
          title: '手机号格式错误！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
      
    }else if(!(/^[\u2E80-\u9FFF]+$/.test(that.data.name))){
      setTimeout(() => {
        wx.showToast({
          title: '请输入真实姓名！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(!(/^[\u2E80-\u9FFF]+$/.test(that.data.school))){
      setTimeout(() => {
        wx.showToast({
          title: '请输入真实学校名！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if((!/^[0-9]*$/.test(that.data.qq))){
      setTimeout(() => {
        wx.showToast({
          title: 'qq请输入纯数字！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
      infoIn(data).then(res=>{
        console.log(res)
        if(res.code==200){       
          setTimeout(() => {
            wx.showToast({
              title: '登记成功！',
              icon: "success",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1000)
          }, 0);
        
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '登记失败！',
              icon: "none",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1000)
          }, 0);
        }       
      });
    }
    
  },
  _getStuInfo(){

        let data = wx.getStorageSync('getstuinfo');
        if(data){
        this.setData({
          getstuinfo:data,
          name: data.name,
          school: data.school,
          secondTel: data.secondTel,
          qq: data.qq,
          weixin: data.weixin,
          flag:true
        })
        if(data.grade==0){
          this.setData({
            grade:"学龄前",
            index: 0
          })
        }else if(data.grade==1){
          this.setData({
            grade:"一年级",
            index: 1
          })
        }else if(data.grade==2){
          this.setData({
            grade:"二年级",
            index: 2
          })
        }else if(data.grade==3){
          this.setData({
            grade:"三年级",
            index: 3
          })
        }else if(data.grade==4){
          this.setData({
            grade:"四年级",
            index: 4
          })
        }else if(data.grade==5){
          this.setData({
            grade:"五年级",
            index: 5
          })
        }else if(data.grade==6){
          this.setData({
            grade:"六年级",
            index: 6
          })
        }else if(data.grade==7){
          this.setData({
            grade:"初一",
            index: 7
          })
        }else if(data.grade==8){
          this.setData({
            grade:"初二",
            index: 8
          })
        }else if(data.grade==9){
          this.setData({
            grade:"初三",
            index: 9
          })
        }else if(data.grade==10){
          this.setData({
            grade:"高一",
            index: 10
          })
        }else if(data.grade==11){
          this.setData({
            grade:"高二",
            index: 11
          })
        }else if(data.grade==12){
          this.setData({
            grade:"高三",
            index: 12
          })
        }
      }else{
        this.setData({
          flag:false
        })
      }       
  },
  bindclick(e){
    var that=this;
    that._infoIn();         
  },
  onLoad: function (options) {
    var that=this
    that._getStudentInfo()
    that._getStuInfo()
  },

  //获取用户的个人信息
  _getStudentInfo(){
    let data={
      userid:wx.getStorageSync('loginInfo').userid
    }
    getStuInfo(data).then(res=>{
      if(res.code==200 && wx.getStorageSync('getstuinfo')==''){  
        wx.setStorageSync('getstuinfo', res.data)
      }
    });
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
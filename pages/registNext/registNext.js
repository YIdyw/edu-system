// pages/registNext/registNext.js
// 简单注册后的详细信息填写以及角色选择
import {
  infoIn
} from '../../network/information'

import {
  getAuthID, addAuthUser, userAuthed
} from '../../network/authID'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    email:"",
    gender:0,
    birth: "",
    indexRole: 0,
    today: '',
    pickerRole: ['请选择', '教师','学生或家长'],
    sex: [{ id: 0, name: '男', checked: true}, 
          { id: 1, name: '女', checked: false}],
    nameStu:'',
    grade:'',
    school:'',
    secondTel:'',
    qq:'',
    indexGrade:0,
    weixin:'',
    flag:false,
    getstuinfo:"",
    pickerGrade: ['请选择', '学龄前', '一年级', '二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'],
    count:false,
    idcard:"",
    nameTch:"",
    Tqq:"",
    Tweixin:"",
    region: ['广东省', '广州市', '海珠区'],
    imgUrl: "",
    isflag: false,
    loginInfo:"",
   
  },

  /*
   ** 获取用户的输入信息以及对信息的校验
   */
  username (e) {
    this.setData({
      name: e.detail.value
    });
  },
  useremail (e) {
    this.setData({
      email: e.detail.value
    });
  },

  userbirth(e){
    this.setData({
      birth: e.detail.value
    });
  },
  
  PickerRole(e) {
    this.setData({
      indexRole: e.detail.value
    });
  },

  handleSexChange(e) {
    let gender = e.currentTarget.dataset.gender
    let sex = this.data.sex
    sex[gender].checked = false
    gender == 1? gender=0 : gender=1
    sex[gender].checked = true
    this.setData({
      gender: gender,
      sex: sex
    });
  },

  //学生信息输入
  PickerGrade(e) {
    this.setData({
      indexGrade: e.detail.value
    })
  },
  nameStu: function (e) {
    this.setData({
    nameStu: e.detail.value
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

  //学生基本信息提交
  _infoIn(){
    var that=this;
    var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org|mail|email)$/;
    let data={
      userid:that.data.userid,
      name:that.data.nameStu,
      grade:that.data.indexGrade,
      school:that.data.school,
      secondTel:that.data.secondTel,
      qq:that.data.qq,
      weixin:that.data.weixin
    }
    if(that.data.nameStu==''||that.data.indexRole==''||that.data.school==''||
    that.data.secondTel==''){
      setTimeout(() => {
        wx.showToast({
          title: '请将学生信息填写完整！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
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
      
    }else if(!(/^[\u2E80-\u9FFF]+$/.test(that.data.nameStu))){
      setTimeout(() => {
        wx.showToast({
          title: '请输入真实学生姓名！',
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
    }else if(!myReg.test(that.data.email)&&that.data.email!=''){
      setTimeout(() => {
        wx.showToast({
          title: '邮箱格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
  }else if(that.data.weixin!=''){
    if(!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(that.data.weixin)){
      setTimeout(() => {
        wx.showToast({
          title: '微信格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
  }
  }else{
      infoIn(data).then(res=>{
        console.log("学生：", res)
        if(res.code==200){       
          that._updateInfo()
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '登记失败！',
              icon: "none",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 3000)
          }, 0);
        }       
      });
    }
    
  },

  //教师信息输入
  cardid (e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  truename (e) {
    this.setData({
      nameTch: e.detail.value
    })
  },
  Tqqinput (e) {
    this.setData({
      Tqq: e.detail.value
    })
  },
  Tweixin (e) {
    this.setData({
      Tweixin: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() { 
    var that=this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          imgUrl: res.tempFilePaths
        });
        that._getAuthID();
      }
    });
   
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgUrl,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg() {
    wx.showModal({
      content: '是否删除该照片',
      success: res => {
        if (res.confirm) {
          this.setData({
            imgUrl: ''
          })
        }
      }
    })
  },
  //省份校验
  checkProvince:function(card,vcity){
    var province = card.substr(0,2);
    if(vcity[province] == undefined){
        return false;
    }
    return true;
},

  //生日校验
  checkBirthday: function (card){
    var len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if(len == '15'){
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/; 
        var arr_data = card.match(re_fifteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date('19'+year+'/'+month+'/'+day);
        return this.verifyBirthday('19'+year,month,day,birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if(len == '18'){
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
        var arr_data = card.match(re_eighteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date(year+'/'+month+'/'+day);
        return this.verifyBirthday(year,month,day,birthday);
    }
    return false;
},

  //日期校验
  verifyBirthday:function (year,month,day,birthday)
{
    var now = new Date();
    var now_year = now.getFullYear();
    //年月日是否合理
    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
    {
        //判断年份的范围（0岁到120岁之间)
        var time = now_year - year;
        if(time >= 0 && time <= 120)
        {
            return true;
        }
        return false;
    }
    return false;
},

  //校验位校验
  checkParity:function(card){
    //15位转18位
    card = this.changeFivteenToEighteen(card);
    var len = card.length;
    if(len == '18'){
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
        var cardTemp = 0, i, valnum; 
        for(i = 0; i < 17; i ++) { 
            cardTemp += card.substr(i, 1) * arrInt[i]; 
        } 
        valnum = arrCh[cardTemp % 11]; 
        if (valnum == card.substr(17, 1).toLocaleUpperCase()) 
        {
            return true;
        }
        return false;
    }
    return false;
},

//15位转18位
 changeFivteenToEighteen:function(card){
  if(card.length == '15')
  {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
      var cardTemp = 0, i;   
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
      for(i = 0; i < 17; i ++) 
      { 
          cardTemp += card.substr(i, 1) * arrInt[i]; 
      } 
      card += arrCh[cardTemp % 11]; 
      return card;
  }
  return card;
},


  handleClick: function () {
    var that = this
    let verifyIDcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var idCard = that.data.idcard;
    var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org|mail|email)$/;
    var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
           };
    let verifyName = /^[\u2E80-\u9FFF]+$/;
    if (idCard == '' || !verifyIDcard.test(idCard) || !this.checkProvince(idCard,vcity) || 
    !this.checkBirthday(idCard) || !this.checkParity(idCard)) {
      setTimeout(() => {
        wx.showToast({
          title: '请确认身份证号码！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(that.data.nameTch == '' || !verifyName.test(that.data.nameTch)) {
      setTimeout(() => {
        wx.showToast({
          title: '请确认教师真实姓名！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(that.data.imgUrl == ''){
      setTimeout(() => {
        wx.showToast({
          title: '请确认身份证照片！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(!/^[0-9]*$/.test(that.data.Tqq)){
      setTimeout(() => {
        wx.showToast({
          title: 'qq请输入纯数字！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(!this.data.isflag){
      setTimeout(() => {
        wx.showToast({
          title: '请上传正确的身份证照片！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else if(!myReg.test(that.data.email)&&that.data.email!=''){
 
        setTimeout(() => {
          wx.showToast({
            title: '邮箱格式错误！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
    }else{
      that._addAuthUser();
      that._updateInfo();
    }
  },
  // 身份证信息
  _getAuthID() {
    const that = this;
    let data = {
      data: wx.getFileSystemManager().readFileSync(that.data.imgUrl[0], "base64")
    }
 
    getAuthID(data).then(res => {
      if(res.code == 200){
        wx.setStorageSync('photoId', res.data.photoId)
        this.setData({
          isflag: true
        })
        setTimeout(() => {
          wx.showToast({
            title: '身份信息正确！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '身份信息错误！',
            icon : 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 2000)
        }, 0);
      }
    });
  },
  _addAuthUser(){
    const that = this;
    let data = {
      idcard: that.data.idcard,
      name: that.data.nameTch,
      qq: that.data.Tqq,
      weixin: that.data.Tweixin,
      province: that.data.region[0],
      city: that.data.region[1],
      district: that.data.region[2],
      userid: that.data.userid,
      idcardPhoto: wx.getStorageSync('photoId')
    };
    addAuthUser(data).then(res=>{
      console.log(res)
    })
  },


  _updateInfo(){
    let that = this;
    var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org|mail|email)$/;
    if(!myReg.test(that.data.email)&&that.data.email!=''){
      setTimeout(() => {
        wx.showToast({
          title: '邮箱格式错误！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
    }else{
      let data={
        nickname:that.data.name,
        gender:that.data.gender,
        mail:that.data.email,
        birth:that.data.birth,
        userid:that.data.userid,
        defaultRole: 1 + parseInt(that.data.indexRole)
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
            }, 3000)
          }, 0);
          if(that.data.indexRole==1){
            wx.redirectTo({
              url: '../loginPhone/loginPhone',
            })
          }else if(that.data.indexRole==2){
            wx.redirectTo({
              url: '../loginPhone/loginPhone',
            })
          }
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '修改失败！',
              icon: "none",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 3000)
          }, 0);
        }       
      });
    }  
  },

  checkin(){
    var that = this
    if(this.data.indexRole==0){
      setTimeout(() => {
        wx.showToast({
          title: '请选择默认角色！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }else if(this.data.indexRole==1){
      that.handleClick()
    }else if(this.data.indexRole==2){
      that._infoIn()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('registInfo')){
      this.setData({
        userid: wx.getStorageSync('registInfo')
      })
    }else if(wx.getStorageSync('loginInfo')){
      this.setData({
        userid: wx.getStorageSync('loginInfo').userid
      })
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '页面出错！',
          icon: 'none'
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }
    
  let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let d = date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate() - 1
    this.setData({
      today: y + '-' + m + '-' + d,
      birth: y + '-' + m + '-' + d,
    })
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
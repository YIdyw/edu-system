import {
  getAuthID, addAuthUser, userAuthed
} from '../../network/authID'

Page({
  data: {
    idcard:"",
    name:"",
    qq:"",
    weixin:"",
    region: ['广东省', '广州市', '海珠区'],
    imgUrl: "",
  },
  userid (e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  truename (e) {
    this.setData({
      name: e.detail.value
    })
  },
  qqinput (e) {
    this.setData({
      qq: e.detail.value
    })
  },
  weixinput (e) {
    this.setData({
      weixin: e.detail.value
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
    var idCard = that.data.idcard
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
      wx.showToast({
        title: '请输入正确身份证号',
        icon: 'none'
      });
    }else if(that.data.name == '' || !verifyName.test(that.data.name)) {
      wx.showToast({
        title: '请输入正确姓名',
        icon: 'none'
      });
    }else if(that.data.imgUrl == ''){
      wx.showToast({
        title: '请上传身份证照片',
        icon: 'none'
      });
    }else {
      that._addAuthUser();
      wx.navigateBack({
        delta: 1,
      });
      wx.showToast({
        title: '认证成功',
      })
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
      }
    });
  },
  _addAuthUser(){
    const that = this;
    let data = {
      idcard: that.data.idcard,
      name: that.data.name,
      qq: that.data.qq,
      weixin: that.data.weixin,
      province: that.data.region[0],
      city: that.data.region[1],
      district: that.data.region[2],
      userid: wx.getStorageSync('loginInfo').userid,
      idcardPhoto: wx.getStorageSync('photoId')
    };
    addAuthUser(data).then(res=>{
      console.log(res)
      if(res.code == 200){
        that._userAuthed();
      }
    })
  },
  _userAuthed(){
    let loginInfo = wx.getStorageSync('loginInfo');
    loginInfo.authenticated = true;
    wx.setStorageSync('loginInfo', loginInfo)
    let data = {
      "user": loginInfo
    }
    userAuthed(data).then((res)=>{
      console.log(res)
    })
  }
})
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
  handleClick: function () {
    var that = this
    let verifyIDcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let verifyName = /^[\u2E80-\u9FFF]+$/;
    if (that.data.idcard == '' || !verifyIDcard.test(that.data.idcard)) {
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
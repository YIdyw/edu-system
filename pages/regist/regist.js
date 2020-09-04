import {
  registInfo
} from '../../network/regist'
import {
  getPhonecode,checkCode
} from '../../network/phonecode'
Page({
  data: {
    account:"",
    password:"",
    againpassword:"",
    name:"",
    phone:"",
    code:"",
    email:"",
    gender:0,
    birth: "",
    index: 2,
    picker: ['请选择', '教师','学生或家长'],
    sex: [{ id: 0, name: '男', checked: true}, 
          { id: 1, name: '女', checked: false}],
    count:false
  },
  useraccount (e) {
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
  username (e) {
    this.setData({
      name: e.detail.value
    });
  },
  userphone (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  inputcode(e){
    this.setData({
      code: e.detail.value
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
  PickerChange(e) {
    this.setData({
      index: e.detail.value
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
  _getPhonecode(){
    var that=this;
    var phone=that.data.phone;
    let data={
      phone:phone
    }
    getPhonecode(data).then(res => {
      console.log(res)
      if(res.code==200){
        wx.showToast({
          title: '验证码已发送请等待',
        });
      }else{
        wx.showToast({
          title: '验证码发送失败',
          icon: 'none'
        });
      }
    })
  },
  _checkCode(){
    var that=this
    let data={
      phone:that.data.phone,
      verifyCode:that.data.code
    }
    checkCode(data).then(res => {
      console.log(res)
      if(res.code==200){
        this.setData({
          count:true
        })
      }else{
        this.setData({
          count:false
        })
      }
    })
  },
  getcode(){
    var that=this;
    that._getPhonecode()
  },
  regist: function (e) {
    var that = this
    if (that.data.account == '') {
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      });
    }else if(that.data.password == ''||that.data.password.length<6) {
      wx.showToast({
        title: '密码格式错误',
        icon: 'none'
      });
    }else if(that.data.againpassword==''||that.data.againpassword!=that.data.password||that.data.password!=that.data.againpassword){
      wx.showToast({
        title: '请仔细确认密码',
        icon: 'none'
      });
    }else if(that.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
    }else if(that.data.index == 0){
      wx.showToast({
        title: '请选择角色',
        icon: 'none'
      });
    }else{
      //that._checkCode();
      that._registInfo();
    }
  },
  _registInfo() {
    const that = this;
    let data = {
        account: that.data.account,
        password: that.data.password,
        nickname: that.data.name,
        phone: that.data.phone,
        mail: that.data.email,
        birth: that.data.birth,
        gender: that.data.gender,
        defaultRole: that.data.index
    }
    registInfo(data).then(res => {
      wx.setStorageSync('registInfo', res.data)
      console.log(res)
     // if(that.data.count==true)
      if(that.data.code=="123456"){
        if(res.code==200){
          wx.navigateBack({
            delta: 1,
          });
          wx.showToast({
            title: '注册成功请登录',
          });
        }else{
          wx.showToast({
            title: '注册失败，请检查',
            icon: 'none'
          });
        }
      }else{
        wx.showToast({
          title: '验证手机失败',
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let d = date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate()
    this.setData({
      birth: y + '/' + m + '/' + d
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
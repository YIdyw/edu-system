import {
  getAllOrganization, relymgmt, relyPorcess
} from '../../network/organization'

Page({
  data: {
    isRely: false,
    organ: '请选择',
    disabled: false,
    idx: 0,
    basicsList: [{icon: 'usefullfill',name: '选择挂靠'},
                 {icon: 'radioboxfill',name: '等待审核'},
                 {icon: 'roundclosefill',name: '挂靠错误'},
                 {icon: 'roundcheckfill',name: '完成挂靠'}],
    basics: 0,
    orgmessage: {},
    loginInfo:[],
    orgmsg: [],
    modalShow: false,
  },
  // process
  basicsSteps() {
    this.setData({
      basics: this.data.basics == this.data.basicsList.length - 1 ? 0 : this.data.basics + 1
    })
  },
  // 挂靠机构选择
  PickerChange(e) {
    this.setData({
      idx: e.detail.value,
      orgmessage: this.data.orgmsg[e.detail.value]
    })
  },
  // 确认挂靠-btn
  chooseRely(){
    this.setData({
      modalShow: true
    });
  },
  // org确定
  orgConfirm(){
    this.hideModal();
    this.basicsSteps();
    this.setData({
      disabled: true,
    });
    this._relymgmt();
  },
  // 解除挂靠-process
  relyReselect(){
    this.setData({
      basics: 0,
      disabled: false
    });
  },
  // 解除挂靠-btn
  removeRely(){
    this.setData({
      isRely: false
    })
    wx.setStorageSync('relyOrg', '');
  },
  hideModal(e) {
    this.setData({
      modalShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getAllOrgazition();
    this._relyProcess();
  },
  /**获取全部机构信息 */
  _getAllOrgazition() {
    let relyInfo = wx.getStorageSync('relyInfo');
    if(relyInfo){
      getAllOrganization().then(res => {
        if(res.code == 200) {
          this.setData({
            orgmsg: res.data,
            orgmessage: res.data[relyInfo.relySelect],
            idx: relyInfo.relySelect,
            basics: relyInfo.relyProcess,
            disabled: true
          });
        }
      });
    }else{
      getAllOrganization().then(res => {
        if(res.code == 200) {
          this.setData({
            orgmsg: res.data,
            orgmessage: res.data[0]
          });
        }
      });
    }
    getAllOrganization().then(res => {
      if(res.code == 200) {
        this.setData({
          orgmsg: res.data,
          orgmessage: res.data[0]
        });
      }
    });
  },
  // 机构挂靠
  _relymgmt(){
    let relyOrg = wx.getStorageSync('relyOrg');
    let data = {
      orgId: relyOrg.orgId,
      teaId: this.data.loginInfo.userid
    };
    relymgmt(data).then(res=>{
      wx.showToast({
        title: '挂靠确认成功',
      });
      let data = {relySelect: this.data.idx, relyProcess: 1}
      wx.setStorageSync('relyInfo', data)
    });
  },
  // 挂靠进度查询
  _relyProcess(){
    let data = {
      userId : wx.getStorageSync('loginInfo').userid
    }
    relyPorcess(data).then((res)=>{
      if(res.code==200){
        if(res.data==2){
          this.setData({
            basics: 3
          })
        }else if(res.data==3){
          this.setData({
            basics: 2
          })
        }
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
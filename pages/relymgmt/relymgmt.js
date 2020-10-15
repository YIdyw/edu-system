import {
  getAllOrganization, relymgmt, relyPorcess, deleterely
} from '../../network/organization'

Page({
  data: {
    isRely: false,
    organ: '请选择',
    disabled: false,
    idx: 0,
    basicsList: [{icon: 'usefullfill',name: '选择挂靠'},
                 {icon: 'radioboxfill',name: '等待审核'},
                 {icon: 'roundcheckfill',name: '完成挂靠'},
                 {icon: 'roundclosefill',name: '挂靠错误'}],
    basics: 0,
    orgId: '',
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
    this._deleterely()
    this.relyReselect()
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
    this._relyProcess();
    this._getAllOrgazition();
    
  },
  /**获取全部机构信息 */
  _getAllOrgazition() {
      getAllOrganization().then(res => {
        if(res.code == 200) {
          if(this._getcallback){
            this._getcallback(res)
          }
          this.setData({
            orgmsg: res.data,
          });
        }
      });
  },
  // 机构挂靠
  _relymgmt(){
    let data = {
      orgId: this.data.orgmessage.orgId,
      teaId: wx.getStorageSync('loginInfo').userid
    };
    relymgmt(data).then(res=>{
      if(res.code==200){
        setTimeout(() => {
          wx.showToast({
            title: '挂靠确认成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '挂靠失败！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1500)
        }, 0);
      }
    });
  },
  // 挂靠进度查询
  _relyProcess(){
    let data = {
      userid : wx.getStorageSync('loginInfo').userid
    }
    relyPorcess(data).then((res)=>{
      if(res.code==200){
        let orgId = res.data.orgId
        if(res.data.checked==2){
          this.setData({
            isRely: true
          })
        }
        this.setData({
          basics: res.data.checked,
          orgId: res.data.orgId
        })
        this._getcallback = res => {
          let org = res.data
          for(let i = 0; i < org.length; i++){
            if(orgId == org[i].orgId){
              this.setData({
                orgmessage: org[i],
                idx: i,
                disabled: true
              })
              break
            }
          }
        }
        this.basicsSteps();
      }
    });
  },

  _deleterely(){
    let data = wx.getStorageSync('loginInfo').userid
    deleterely(data).then(res =>{
      if(res.code==200){
        if(res.code==200){
          setTimeout(() => {
            wx.showToast({
              title: '挂靠取消成功！',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '挂靠取消失败！',
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }
      }
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
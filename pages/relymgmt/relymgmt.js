import {
  getAllOrganization, relymgmt, relyPorcess, deleterely, confirmreturn
} from '../../network/organization'
import {
  getSearch
} from '../../network/search'
Page({
  data: {
    isRely: false,
    organ: '请选择',
    disabled: false,
    idx: 0,
    basicsList: [{icon: 'usefullfill',name: '选择挂靠'},
                 {icon: 'radioboxfill',name: '等待审核'},
                 {icon: 'roundcheckfill',name: '完成挂靠'},
                 {icon: 'roundclosefill',name: '挂靠错误'},
                 {icon: 'radioboxfill',name: '等待解除'},
                 {icon: 'roundclosefill',name: '解除失败'}],
    basics: 0,
    orgId: '',
    orgmessage: {},
    loginInfo:[],
    orgmsg: [],
    modalShow: false,
    isReturn: false,
  },
  keywordsearch(){
    this.setData({
      keyword: e.detail.value
    })
  },
  getsearch(e){
    this.setData({
      getsearch:e.detail.value
    })
  },

  search(){
    var that = this;
    if (that.data.getsearch == "") {
      that._getAllOrgazition()
      setTimeout(() => {
        wx.showToast({
          title: '查询全部成功！',
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
      }
    else{
      that._getSearch()      
    } 
  },

  _getSearch(){
    var that=this;
    let data={
      query: that.data.getsearch
    }
    getSearch(data).then(res => {
      console.log(res)
      if(res.code==200){ 
          that.setData({
            orgmsg: res.data.organizationVOSList,
          })
        setTimeout(() => {
          wx.showToast({
            title: '查询成功！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
        
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '请输入正确信息！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }
    });
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
  //驳回确认按钮
  reConfirm(){
    var that = this
    that._confirmReturn()
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
    var that = this
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'取消挂靠提示',
      content:'取消挂靠可能会影响您正常上课，请先于机构进行协商，请您确定是否要取消挂靠？',
      success:function(res){
        if(res.confirm){
          if(that.data.basics==4 || that.data.basics==5){
            setTimeout(() => {
              wx.showToast({
                title: '您已提交取消挂靠申请！',
                icon: 'none'
              });
              setTimeout(() => {
                wx.hideToast();
              }, 3000)
            }, 0);
          }else{
            that._deleterely()
          }
        }
      }
    })
    
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
        console.log("机构：", res)
        if(res.code == 200) {
          if(this._getcallback){
            this._getcallback(res)
          }
          this.setData({
            orgmsg: res.data.organizationVOSList,
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
      console.log(res)
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
      console.log("进度：", res)
      if(res.code==200){
        let orgId = res.data.orgId
        if(res.data.checked==1 ||res.data.checked==3 ||res.data.checked==4){
          this.setData({
            isRely: true,
            basics: res.data.checked,
            orgId: res.data.orgId
          })
        }else if(res.data==-1){
          this.setData({
            basics: -1
          })
        }else{
          this.setData({
            basics: res.data.checked,
            orgId: res.data.orgId
          })
        }
        if(res.data.checked==4){
          this.setData({
            isReturn: true
          })
        }
        this._getcallback = res => {
          let org = res.data.organizationVOSList
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

  //申请解除挂靠
  _deleterely(){
    let data = wx.getStorageSync('loginInfo').userid
    deleterely(data).then(res =>{
        if(res.code==200){
          this.setData({
            basics: 4
          })
          setTimeout(() => {
            wx.showToast({
              title: '申请解除成功！',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '申请解除失败！',
              icon: 'none'
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1500)
          }, 0);
        }
    })
  },

  //确认驳回
  _confirmReturn(){
    let data = wx.getStorageSync('loginInfo').userid
    confirmreturn(data).then(res =>{
      if(res.code==200){
        setTimeout(() => {
          wx.showToast({
            title: '请刷新页面！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '发生错误！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
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
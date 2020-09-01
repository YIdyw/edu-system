import {
  getSearch, getInstitute
} from '../../network/search'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    click:true,
    getsearch:'',
    keyword:'',
    TabCur: 0,
    scrollLeft:0,
    current:0,
    cardCur: 0,
    institute: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1025612458,2872287357&fm=26&gp=0.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=293427055,4248925225&fm=26&gp=0.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2193691212,2272708087&fm=26&gp=0.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00651-109.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=154138659,2887492908&fm=11&gp=0.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00443-3537.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3558977196,1893604046&fm=26&gp=0.jpg'
    }],
    show: "",
  },
  picture2(){
    wx.scanCode({
      success: (res) => {
        var show2code=res.result;
        wx.setStorageSync('show2code',show2code);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../code2msg/code2msg',
        })
        },
        fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
        },
        complete: (res) => {} 
    })
  },
  handleChange ({ detail }) {
    var that=this;
    this.setData({
        current: detail.key
    });
    if (that.data.current=='mine'){
      if(!wx.getStorageSync('loginInfo')){
        wx.navigateTo({
        url: '../my/my',
        })
      }else if(wx.getStorageSync('loginInfo').defaultRole==2){
        wx.navigateTo({
          url: '../my-tch/my-tch',
        })
      }else{ 
        wx.navigateTo({
          url: '../my-stu/my-stu',
        })
      }
      
    }else if(that.data.current=='group'){
      wx.navigateTo({
        url: '../sortPage/sortPage',
      })
    }
  },
  getsearch(e){
    this.setData({
      getsearch:e.detail.value
    })
  },
  _getSearch(){
    var that=this;
    let data={
      getsearch:that.data.getsearch
    }
    getSearch(data).then(res => {
      console.log(res)
      wx.setStorageSync('orgmessage', res.data)
      if(res.code==200){        
        wx.navigateTo({
            url: '../orgmessage/orgmessage',
          });
          wx.showToast({
            title: '查询成功',
          });
        
      }else{
        wx.showToast({
          title: '请输入正确信息',
          icon: 'none'
        })
      }
    });
  },
//将机构数据渲染到本页面参数中
  _getInstitute(){
    getInstitute().then(res =>{
      //console.log(res)测试结果案例，能顺利获得必需数据
      this.setData({
        institute : res
      })
    });
  },
  

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: this.data.scrollLeft
    })
  },
  
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  keywordsearch(){
    this.setData({
      keyword: e.detail.value
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  search(){
    var that = this;
    if (that.data.getsearch == "") {
      wx.showToast({
        title: '关键字不能为空',
        icon:'none',
      });
      }
    else{
      that._getSearch()      
    } 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.towerSwiper('swiperList');
    this._getInstitute();
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
import {
  getCourseQuery
} from '../../network/courseQuery'
Page({
  data: {
    tabCur: 0,
    tabTitle:[{id: 0, name: '正在开课'}, {id: 1, name: '开课历史'}],
    classNow: [],
    historyClass: []
    // radioItems: [
    //   { classname: 'cuIcon-favor', value: 1, checked: false },
    //   { classname: 'cuIcon-favor', value: 2, checked: false },
    //   { classname: 'cuIcon-favor', value: 3, checked: false },
    //   { classname: 'cuIcon-favor', value: 4, checked: false },
    //   { classname: 'cuIcon-favor', value: 5, checked: false }
    // ],
    // stars:0
  },
  signRecord(e){
    let courseId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../signRecord/signRecord?courseId=' + courseId,
    })
  },
  tabSelect(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.id,
    })
  },
  // radioChange: function (e) {
  //   var radioItems = this.data.radioItems;
  //   for (var i = 0; i < e.detail.value;i++) {
  //     radioItems[i].checked = true; 
  //     radioItems[i].classname = "icon-shixing";
  //   }
  //   for (var j = e.detail.value; j < radioItems.length; j++) {
  //     radioItems[j].checked = false;
  //     radioItems[j].classname = "icon-pingxing";
  //   }
  //   this.setData({
  //     radioItems: radioItems,
  //     stars: e.detail.value
  //   });
  // },
  _getCourseQuery(){
    let data = {
      // id: wx.getStorageSync('loginInfo').userid,
      id: 46,
      info:{
        history: true,
        name: "",
        pageNum: 1,
        pageSize: 10,
        typeId: 0
      }
    }
    getCourseQuery(data).then(res => {
      if(res.code==200){
        let classNow = []
        let historyClass = []
        let today = new Date();
        let now = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        for(let i=0; i<res.data.length; i++){
          if(res.data[i].endTime > now){
            classNow.push(res.data[i])
          }else{
            historyClass.push(res.data[i])
          }
        }
        this.setData({
          classNow: classNow,
          historyClass: historyClass
        });
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '暂无开课情况！',
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCourseQuery();
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
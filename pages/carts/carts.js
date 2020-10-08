// pages/carts/carts.js
import {
  getAll, selectMer, deleteMer, unselectMer, selectAllMer, unselectAllMer, makeOrder
} from '../../network/carts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:false,    // 全选状态，默认全选
    isnull: true,
    courseid: '',
    userid: '',
    orgid: '',
    screen : {
      minHeight : 'auto'
    },
    height:''
  },

  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
        if(carts[i].cartState==1) {                   // 判断选中才会计算价格
            total += carts[i].merPrice;     // 所有价格加起来
        }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
        totalPrice: total.toFixed(2)
    });
},

getAll() {
    getAll(this.data.userid).then(res=>{
      if(res.code==200){
        console.log('获取购物车信息成功')
        this.setData({
          carts: res.data
        })
        this.getTotalPrice()
        if(res.data.length==0){
          this.setData({
            isnull: false
          })
        }
      }
    })                  
},

delete(e) {
  let index = e.currentTarget.dataset.index
  let data = {
    userid: this.data.userid,
    merid: this.data.carts[index].merId
  }
  deleteMer(data).then(res =>{
    if(res.code==200){
      setTimeout(() => {
        wx.showToast({
          title: '删除成功！',
          icon: "success",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
      this.getAll()
    }
  })
},

select(e) {
  let index = e.currentTarget.dataset.index
  console.log(e)
  let data = {
    userid: this.data.userid,
    merid: this.data.carts[index].merId
  }
  selectMer(data).then(res =>{
    if(res.code==200){
      setTimeout(() => {
        wx.showToast({
          title: '已添加！',
          icon: "success",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
      this.getAll()
    }
  })                    
},

unselect(e) {
  let index = e.currentTarget.dataset.index
  let data = {
    userid: this.data.userid,
    merid: this.data.carts[index].merId
  }
  unselectMer(data).then(res =>{
    if(res.code==200){
      setTimeout(() => {
        wx.showToast({
          title: '已取消！',
          icon: "success",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
      this.getAll()
    }
  })          
},

selectAll() {
  let data = {
    userid: this.data.userid
  }
  selectAllMer(data).then(res =>{
    if(res.code==200){
      this.setData({
        selectAllStatus: true
      })
      setTimeout(() => {
        wx.showToast({
          title: '已全选！',
          icon: "success",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
      this.getAll()
    }
  })                            
},

unselectAll() {
  let data = {
    userid: this.data.userid
  }
  unselectAllMer(data).then(res =>{
    if(res.code==200){
      this.setData({
        selectAllStatus: false
      })
      setTimeout(() => {
        wx.showToast({
          title: '取消全选！',
          icon: "success",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
      this.getAll()
    }
  })                    
},

makeOrder() {
  let data = {
    userid: this.data.userid
  }
  if(this.data.totalPrice>0){
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '是否购买？',
      content: '请选择是否购买',
      success(res){
        if(res.confirm){
          makeOrder(data).then(res =>{
            console.log(res)
            if(res.code==200){
              setTimeout(() => {
                wx.showToast({
                  title: '订单提交成功！',
                  icon: "success",
                });
                setTimeout(() => {
                  wx.hideToast();
                }, 1000)
              }, 0);
              wx.redirectTo({
                url: '../settlement/settlement?orderid='+res.data.orderId,
              })
            }
          })
        }
      }
    })
  }else {
    wx.showToast({
      title: '您还未选择商品！',
      icon: 'loading'
    })
  }
  
  
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: wx.getStorageSync('loginInfo').userid
    })
    this.getAll()
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          minHeight: res.windowHeight
        });
        var check = this.data.minHeight - 120
        this.setData({
          height: check
        })
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
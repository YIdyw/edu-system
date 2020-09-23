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
    selectAllStatus:true,    // 全选状态，默认全选
    courseid: '',
    userid: '',
    orgid: ''
  },

  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
        if(carts[i].selected) {                   // 判断选中才会计算价格
            total += carts[i].num * carts[i].price;     // 所有价格加起来
        }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
        carts: carts,
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
      }
    })                  
},

delete() {
 
},

select() {
                        
},

unselect() {
                        
},

selectAll() {
                             
},

unselectAll() {
                             
},

makeOrder() {

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: wx.getStorageSync('loginInfo').userid
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
    this.setData({
      hasList: true,        // 既然有数据了，那设为true吧
      carts:[
        {id:1,title:'新鲜芹菜 半斤',image:'/image/s5.png',num:4,price:0.01,selected:true},
        {id:2,title:'素米 500g',image:'/image/s6.png',num:1,price:0.03,selected:true}
      ]
    });
 
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
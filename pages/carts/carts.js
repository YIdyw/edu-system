// pages/carts/carts.js
import {
  getAll, selectMer, deleteMer, unselectMer, selectAllMer, unselectAllMer, makeOrder, childMakeOrder, updateMer
} from '../../network/carts'
import {
  addChild, getAllChild, childBuyCourse
} from '../../network/moreChild'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:false,    // 全选状态，默认全选
    ischild: false,         //是否为子用户购买      
    isadd: false,           //是否添加子用户
    child: '',              //子用户数据
    subId: '',
    id: 0,
    sex: [{ id: 0, name: '男', checked: true}, 
    { id: 1, name: '女', checked: false}],
    name: '',
    gender:0,
    birth: "",
    secondTel:'',
    isnull: true,
    courseid: '',
    userid: '',
    orgid: '',
    screen : {
      minHeight : 'auto'
    },
    height:''
  },

  username (e) {
    this.setData({
      name: e.detail.value
    });
  },

  userbirth(e){
    this.setData({
      birth: e.detail.value
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

  secondTel: function (e) {
      this.setData({
        secondTel: e.detail.value
        })
  },

  choseTxtColor:function(e){
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      id: id,
      subId:  child[id].subUserId
    })
  },

  _getAllChild(userid){
    getAllChild(userid).then(res =>{
      if(res.code == 200){
        console.log(res)
        this.setData({
          child: res.data,
          ischild: true
        })
      }
    })
  },

  _add(){
    this.setData({
      isadd: true
    })
  },

  _no(){
    this.setData({
      ischild: false
    })
  },

  _ok(){
    let data = {
    }
  },

  hideModal(){
    this.setData({
      isadd: false
    })
  },

  addChildBtn(){
    var that = this
    let data = {
      subUserBirth: this.data.birth,
      subUserGender: this.data.gender,
      subUserName: this.data.name,
      subUserPhone: this.data.secondTel,
      userId: this.data.userid
    }
    addChild(data).then(res =>{
      if(res.code == 200){
        that._getAllChild(that.data.userid)
        setTimeout(() => {
          wx.showToast({
            title: '添加成功！',
            icon: "success",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '添加失败！',
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }
    })
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
        this.setData({
          carts: res.data
        })
        let all = false
        for(let i = 0; i < res.data.length; i++){
          if(res.data[i].cartState == 1){
            all = true
          }else{
            all = false
          }
        }
        this.setData({
          selectAllStatus: all
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
    merid: [this.data.carts[index].merId],
    cartState: 1
  }
  updateMer(data).then(res =>{
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
    merid: [this.data.carts[index].merId],
    cartState: 0
  }
  updateMer(data).then(res =>{
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

_meridAll(){
  var merId = []
  let carts = this.data.carts
  for(let i = 0; i < carts.length; i++){
    merId.push(parseInt(carts[i].merId))
  }
  return merId
},
selectAll() {
  let merid = this._meridAll()
  let data = {
    userid: this.data.userid,
    cartState: 1,
    merid: merid
  }
  updateMer(data).then(res =>{
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
  let merid = this._meridAll()
  let data = {
    userid: this.data.userid,
    cartState: 0,
    merid: merid
  }
  updateMer(data).then(res =>{
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
      title: '用户类型',
      content: '请选择直接为当前用户购买还是添加子用户购买？',
      confirmText: '直接购买',
      cancelText: '子用户',
      success (res) {
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
        }else if(res.cancel){
          this._getAllChild(wx.getStorageSync('loginInfo').userid)
        }
      }
    })
  }else {
    setTimeout(() => {
      wx.showToast({
        title: '您还未选择商品！',
        icon: "loading",
      });
      setTimeout(() => {
        wx.hideToast();
      }, 1000)
    }, 0);
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
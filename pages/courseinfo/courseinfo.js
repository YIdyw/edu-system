// pages/courseinfo/courseinfo.js
import {
 idGetOrgCourse, listenClass
} from '../../network/orginout'
import {
  addCart, findmerid, selectMer, unselectAllMer, makeOrder
} from '../../network/carts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseinfo:'',//课程信息
    flag: false,//判断该课程是否在机构课程中
    teacherid: [],//该课程所有上课老师id
    dateinput:'',//原输入试听时间变量，现已改为选择时间
    isstu: false,//判断是否为学生
    orgid: '',//机构id
    index: '',//该课程id
    merid: '',//该课程商品id
    userid: '',//用户id
    start: '',//课程开始时间
    end: '',//课程结束时间
    screen : {
      minHeight : 'auto'
    },
  },

  //根据courseid获取课程的编号merid**********************************************
  _findmerid(courseId){
    findmerid(courseId).then(res =>{
      if(res.code==200){
        console.log("成功获取merid：",res.data[0].merId)
        this.setData({
          merid: res.data[0].merId
        })
      }
    })
  },


  //加入购物车**********************************************
  _addCart(){
    let data = {
      userid: wx.getStorageSync('loginInfo').userid,
      merid: this.data.merid
    }
    addCart(data).then(res =>{
      if(res.code==200){
        wx.showModal({
          cancelColor: 'cancelColor',
          title: '是否进入购物车？',
          success:function(res){
            if(res.confirm){
              wx.redirectTo({
                url: '../carts/carts',
              })
            }else if(res.cancel){
              console.log("用户没有进入购物车")
            }
          }
        })
      }
    })
  },

  //选择该商品(目前版本只允许管理员推送课程商品，用户自行选购功能未被使用)**********************************************
  select() {
    let data = {
      userid: this.data.userid,
      merid: this.data.merid
    }
    selectMer(data).then(res =>{
      if(res.code==200){

        //制作订单
        this.makeOrder()
        
      }
    })                    
  },

  //取消全选
  unselectAll() {
    let data = {
      userid: this.data.userid
    }
    unselectAllMer(data).then(res =>{
      if(res.code==200){

        //选择当前页面的商品
        this.select()

        
      }
    })                    
  },

  //制作订单
  makeOrder() {
    let data = {
      userid: this.data.userid
    }
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

  },

  buy(){
    var that = this
    that.unselectAll()
    
  },

  //购买课程
  buyclass(){
    var that = this
    wx.showModal({
      title: '是否购买？',
      content: '请选择直接购买还是加入购物车',
      cancelText: '购物车',
      confirmText: '购买',
      cancelColor: 'cancelColor',
      success:function(res){
        if(res.confirm){
          that.buy()
        }else if(res.cancel){
          that._addCart()
        }
      }
    })
    
  },

  cancel(e) {
    this.setData({
      modalName: null
    })
  },

  //选择试听时间**********************************************
  chooselistentime(e){
    this.setData({
      time: e.detail.value
    });
  },

  //选择试听**********************************************
  trylisten(){
    let logininfo = wx.getStorageSync('loginInfo')
    if (!logininfo.userid){
      setTimeout(() => {
        wx.showToast({
          title: '还未登陆！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
    } else {
      let data={      
        courseId:this.data.courseinfo.courseId,
        studentId:logininfo.userid,
        trialTime:this.data.time+' 16:00:00'
      }
      listenClass(data).then(res=>{
        console.log(res)
        if(res.code==200){        
          setTimeout(() => {
            wx.showToast({
              title: '试听成功！',
              icon: "success",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1000)
          }, 0);
          this.setData({
            modalName: null
          })
        
      }else{
        setTimeout(() => {
          wx.showToast({
            title: res.msg,
            icon: "none",
          });
          setTimeout(() => {
            wx.hideToast();
          }, 1000)
        }, 0);
      } 
      });
    }  
  },

  //输入试听时间**********************************************
  dateInput(e){
    this.setData({
      dateinput: e.detail.value
    })
  },

  //试听课程
  listenclass(e){
    var that=this;
    that.data.idx=e.currentTarget.id;
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  //跳转到教师页面
  teacher(e){
    let index = e.currentTarget.dataset.menuindex
    let temp = this.data.courseinfo.teacherList[index]
    let teacher = this.data.teacherid[index]
    wx.redirectTo({
      url: '../detail_teacher/detail_teacher?current='+temp[teacher]+'&name='+this.data.courseinfo.teacherList[index].name,
    })
  },

  //获取机构的课程信息
  _getOrgCourse(data,index){
    idGetOrgCourse(data).then(res => {
      console.log(res)
      for(let i=0;i<res.data.length;i++){
          if(res.data[i].courseId == index){
            if(start != null){
              var start = res.data[i].enrollStartTime.split(' ')
              this.setData({
                start: start[0],
              })
            }
            if(end != null){
              var end = res.data[i].enrollEndTime.split(' ')
              this.setData({
                end: end[0],
              })
            }
            
            
            this.setData({
              courseinfo: res.data[i],
              flag: true
            })
          }
      }
      if (this.getInfoCallback) {
        this.getInfoCallback(res)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let d = date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate() + 1
    this.setData({
      tomorrow: y + '-' + m + '-' + d,
      time: y + '-' + m + '-' + d, 
    })
    if(wx.getStorageSync('loginInfo')&&wx.getStorageSync('loginInfo').defaultRole == 3){
      this.setData({
        isstu: true
      })
    }
    let orgid = options.orgid
    let index = options.index
    this.setData({
      orgid: options.orgid,
      index: options.index,
      userid: wx.getStorageSync('loginInfo').userid
    })
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          minHeight: res.windowHeight
        });
      }
    });
    this._getOrgCourse(orgid, index)
    this.getInfoCallback = res =>{
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].courseId == index){
          that._findmerid(res.data[i].courseId)
          for(let j=0;j<res.data[i].teacherList.length;j++){
            this.setData({
              ['teacherid['+j+']']: 'teacher'+[j+1]+'Id'
            })
          }
        }
    }
      
    }
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
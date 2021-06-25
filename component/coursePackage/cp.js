// component/popup_coursepackage.js

import {
  queryAppointment, appointmentAgree
} from '../../network/information'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    layout:{},
    islayout: true,
    remark:'',
    isrefuse:true,
    refuse_data:{},
    recordId_index:'',
    flag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //老师查阅课包约课记录
  teacherlp: function (userid) {
    queryAppointment(userid).then(res => {
      console.log(res)
      if(res.code == 200){
        this.setData({
          islayout:false,
          layout:res.data
        })
      }
      if (this.getInfoCallback) {
        this.getInfoCallback(res)     //这里为了防止网络获取延迟，设置回调函数
      }
    })
  },
  //修改学生申请的审核状态
  changecheck(e){
    console.log(e.currentTarget)
    var that = this
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'批假操作',
        content:"确认批准学生的请求?",
        cancelText:'拒绝',
        confirmText:'同意',
        success(res){
          if(res.confirm){
            let data = {
              isAgree : true,
              recordId : that.data.layout[e.currentTarget.dataset.index].recordId,
              remark: this.data.remark,
            }
            appointmentAgree(data).then(res=>{
              if(res.code == 200){
                wx.showToast({
                  title: '已同意该学生申请',
                })
              }
            })
            that.data.layout[e.currentTarget.dataset.index].isAgree = true
            that.setData({
              layout:that.data.layout
            })
          }
          else{
            that.setData({
              isrefuse: false,
              recordId_index: e.currentTarget.dataset.index,
            })     
          }
  
        }
    })
  },
  
  cancelM(){
    this.setData({
      islayout:true
    })
  },
  
  confirmM(){
    this.setData({
      islayout:true
    })
  },
  
  cancel_refuse(){
    this.setData({
      isrefuse:true,
      remark:''
    })
  },
  
  _refuse_content(e){
    this.setData({
      remark:e.detail.value
    })
  },
  
  confirm_refuse(){
    let data = {
      isAgree : false,
      recordId : that.data.layout[e.currentTarget.dataset.index].recordId,
      remark: this.data.remark,
    }
    appointmentAgree(data).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '已拒绝该学生申请',
        })
      }
    })
    that.data.layout[e.currentTarget.dataset.index].isAgree = false
    that.setData({
      layout:that.data.layout
    })
  
  },

  }
})

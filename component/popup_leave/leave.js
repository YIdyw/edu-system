// component/popup_leave/leave.js

import {
  teache_lookup, teacher_deal, push_leava
} from '../../network/courseMakeup'

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
    refuse_content:'',
    isrefuse:true,
    refuse_data:{},
    recordId_index:'',
    flag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
  //老师查阅请假记录
  teacherlp: function (userid) {
  teache_lookup(userid).then(res => {
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
  var agree = 20
  var that = this
  wx.showModal({
    cancelColor: 'cancelColor',
    title:'批假操作',
      content:"确认批准学生的请假么?",
      cancelText:'拒绝',
      confirmText:'同意',
      success(res){
        if(res.confirm){
          let data = {
            isChecked : agree,
            recordId : that.data.layout[e.currentTarget.dataset.index].recordId,
            courseId:that.data.layout[e.currentTarget.dataset.index].courseId,
            userId:that.data.layout[e.currentTarget.dataset.index].userId
          }
          teacher_deal(data).then(res=>{
            if(res.code == 200){
              wx.showToast({
                title: '已同意该学生请假',
              })
            }
          })
          that.data.layout[e.currentTarget.dataset.index].isChecked = agree
          that.setData({
            layout:that.data.layout
          })
          let push_data = {
            recordId:that.data.layout[e.currentTarget.dataset.index].recordId,
            userId:that.data.layout[e.currentTarget.dataset.index].userId
          }
      
          push_leava(push_data).then(res => {
            if (res.code == 200){
              console.log("推送成功")
            }
          })
        }
        else{
          that.setData({
            isrefuse:false,
            recordId_index:e.currentTarget.dataset.index,
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
    refuse_content:''
  })
},

_refuse_content(e){
  this.setData({
    refuse_content:e.detail.value
  })
},

confirm_refuse(){
  var refuse = 30
  let data = {
    declineReason:this.data.refuse_content,
    isChecked : refuse,
    recordId : this.data.layout[this.data.recordId_index].recordId,
    courseId:this.data.layout[this.data.recordId_index].courseId,
    userId:this.data.layout[this.data.recordId_index].userId
  }
  console.log(data)
  teacher_deal(data).then(res=>{
    if(res.code == 200){
      wx.showToast({
        title: '已拒绝该学生请假',
      })
    }
  })

  this.data.layout[this.data.recordId_index].isChecked = refuse
  this.setData({
    layout:this.data.layout
  })
  this.setData({
    isrefuse:true
  })

  let push_data = {
    recordId:this.data.layout[this.data.recordId_index].recordId,
    userId:this.data.layout[this.data.recordId_index].userId
  }

  push_leava(push_data).then(res => {
    if (res.code == 200){
      console.log("推送成功")
    }
  })

},
  }
})

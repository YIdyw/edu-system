// component/popup_makeup/makeup.js
import {
  push_leava, tealookup, teaMakeUp
} from '../../network/scheduleQuery'
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
    ismakeup: true,     //是否补课
    makeup: '',          //补课记录
    refuse_content:'',
    isrefuse:true,
    refuse_data:{},
    recordId_index:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //老师查阅请假记录
  teacherlp: function (userid) {
    tealookup(userid).then(res => {
      console.log(res)
      if(res.code == 200){
        this.setData({
          ismakeup: false,
          makeup: res.data
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
      title:'补课审批操作',
        content:"确认批准学生的补课申请么?",
        cancelText:'拒绝',
        confirmText:'同意',
        success(res){
          if(res.confirm){
            let data = {
              isChecked : agree,
              recordId : that.data.makeup[e.currentTarget.dataset.index].recordId,
              courseId:that.data.makeup[e.currentTarget.dataset.index].courseId,
              userId:that.data.makeup[e.currentTarget.dataset.index].userId
            }
            teaMakeUp(data).then(res=>{
              if(res.code == 200){
                wx.showToast({
                  title: '已同意该学生补课',
                })
              }
            })
            that.data.makeup[e.currentTarget.dataset.index].isChecked = agree
            that.setData({
              makeup: that.data.makeup
            })
            let push_data = {
              recordId:that.data.makeup[e.currentTarget.dataset.index].recordId,
              userId:that.data.makeup[e.currentTarget.dataset.index].userId
            }
        
            push_leava(push_data).then(res => {
              if (res.code == 200){
                console.log("推送成功")
              }
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
      ismakeup: true
    })
  },
  
  confirmM(){
    this.setData({
      ismakeup: true
    })
  },
  
  cancel_refuse(){
    this.setData({
      ismakeup: true,
      refuse_content: ''
    })
  },
  
  _refuse_content(e){
    this.setData({
      refuse_content: e.detail.value
    })
  },
  
  confirm_refuse(){
    var refuse = 30
    let data = {
      declineReason:this.data.refuse_content,
      isChecked : refuse,
      recordId : this.data.makeup[this.data.recordId_index].recordId,
      courseId: this.data.makeup[this.data.recordId_index].courseId,
      userId: this.data.makeup[this.data.recordId_index].userId
    }
    console.log(data)
    teaMakeUp(data).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '已拒绝该学生补课',
        })
      }
    })
  
    this.data.makeup[this.data.recordId_index].isChecked = refuse
    this.setData({
      makeup:this.data.makeup
    })
    this.setData({
      isrefuse: true
    })
  
    let push_data = {
      recordId:this.data.makeup[this.data.recordId_index].recordId,
      userId:this.data.makeup[this.data.recordId_index].userId
    }
  
    push_leava(push_data).then(res => {
      if (res.code == 200){
        console.log("推送成功")
      }
    })
  
  },
  }
})

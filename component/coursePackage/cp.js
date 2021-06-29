// component/popup_coursepackage.js
import {
  queryAppointment, appointmentAgree1, appointmentAgree2
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
    coursePackage:{},
    iscoursePackage: true,
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
          iscoursePackage:false,
          coursePackage:res.data
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
              recordId : that.data.coursePackage[e.currentTarget.dataset.index].recordId,
            }
            appointmentAgree2(data).then(res=>{
              console.log(res)
              if(res.code == 200){
                wx.showToast({
                  title: '已同意申请',
                })
              }
            })
            that.data.coursePackage[e.currentTarget.dataset.index].isAgree = 1
            that.setData({
              coursePackage:that.data.coursePackage
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
      iscoursePackage:true
    })
  },
  
  confirmM(){
    this.setData({
      iscoursePackage:true
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
    var that = this
    let data = {
      isAgree : false,
      recordId : that.data.coursePackage[that.data.recordId_index].recordId,
      remark: that.data.remark,
    }
    appointmentAgree1(data).then(res=>{
      if(res.code == 200){
        wx.showToast({
          title: '已拒绝申请',
        })
      }
    })
    that.data.coursePackage[that.data.recordId_index].isAgree = -1
    that.data.coursePackage[that.data.recordId_index].remark = that.data.remark
    that.setData({
      coursePackage:that.data.coursePackage,
      isrefuse:true
    })
  
  },

  }
})

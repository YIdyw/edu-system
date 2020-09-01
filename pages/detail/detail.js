// pages/detail/detail.js
import {
  getDetail
} from '../../network/search'
var URL;
//baseURL
URL = {
    //机构的统一地址
    instituteDetil : '/organization/' ,
    institute_teacherDetail : '/teacher?orgId=' ,
    teacherDetail : '/teacher/',
    course: '/course/'
    //其他接口暂未开放
  }
//暴露出来的接口


//网络请求方法


Page({

  /**
   * 页面的初始数据
   */
  data: {
    institute : {},
    institute_teachers : {},
    teacher : [],
    course : {},
    flag: false,
    screen : {
      minHeight : 'auto'
    },
    common : {},
    degs: 0,
    degss: 0,
    orgid: ''
  },
  
  teacher(e){
    let index = e.currentTarget.dataset.menuindex
    wx.navigateTo({
      url: '../detail_teacher/detail_teacher?current='+this.data.institute_teachers.data[index].baseInfo.userid+'&name='+this.data.institute_teachers.data[index].authInfo.name,
    })
},

 course(e){
    let index = e.currentTarget.dataset.menuindex
    wx.navigateTo({
      url: '../courseinfo/courseinfo?index='+this.data.course.data[index].courseId+'&orgid='+this.data.orgid,
    })
 },
  getInstituteDetail (id) {
    var url = URL.instituteDetil + id;
    
    //console.log(url);
    getDetail(url).then(res => {
      //console.log(res);
      
      //console.log(res);
      var url1 = URL.institute_teacherDetail + res.data.orgInfo.orgId;
      //console.log(url1);
      getDetail(url1).then(res1 => {
      //console.log(res1);
      
     /* var list = [];
      for(var i=0; i<res1.data.length;i++){
        var url2 = URL.teacherDetail + res1.data[i].baseInfo.userid;
        
        getDetail(url2).then(res2 => {
          console.log(res2);
          list[i] = res2.data.adverPhoto
        })
        
      }*/
      
      
      
      
      //console.log('teacher:',this.data.teacher);
      this.setData({
        institute : res,
        institute_teachers : res1,
        //teacher : list
      })
      //console.log(this.data.institute)
    });
    });
    
    
  },

  getCourse : function(id){
    var url = URL.course + id
    //console.log(url)
    getDetail(url).then(res =>{
      this.setData({
        course : res
      })
    });
  },

  rotateAnim: function(){
    let deg = this.data.degs
    deg = deg == 0 ? 90 : 0
    this.setData({
      degs: deg,
    })
  },
  
  rotateAnim1: function(){
    let deg1 = this.data.degss
    deg1 = deg1 == 0 ? 90 : 0
    this.setData({
      degss: deg1
    })
  },
  

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    //console.log(option.judge);
    this.setData({
      orgid: option.current
    })
    if(option.judge == 1) {
      var self = this;
      wx.getSystemInfo({
       success: function( info ) {
          self.setData({
            'screen.minHeight' : info.windowHeight + 'px'
          });
        }
      })
    //获取数据
    self.getInstituteDetail(option.current) ;
    self.getCourse(option.current)
    }
    else{

    } 
  }
});



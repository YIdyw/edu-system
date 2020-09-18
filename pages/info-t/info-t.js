import {
  getAllSubject, addPicture, putTeacherInfo, getTeacherInfo, updateTeacherInfo
} from '../../network/checkin'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: '',       // 学校
    educations: ['请选择', '博士生研究生', '硕士研究生', '本科', '专科', '其他'],
    eduIdx: 0,        // 学历
    eduNum: "",       // 学历编号
    eduImg: '',       // 学历证书照片
    eduImgId: '',     // 学历证书照片ID
    degrees: ['请选择', '博士学位', '学术硕士学位', '专业硕士学位', '学士学位', '其他'],
    deIdx: 0,         // 学位
    degNum: "",       // 学位编号
    degImg: '',       // 学位证书照片
    degImgId: '',     // 学位证书照片ID
    trainings: 0,     // 培训经历数目
    awards: 0,        // 荣誉获奖数目
    works: 0,         // 工作经历数目
    privHome: "",     // 个人主页
    privWeibo: "",    // 个人微博
    workTypes: [{ id: 0, name: '兼职', checked: true}, 
                { id: 1, name: '全职', checked: false}],
    worktype: 0,      // 工作类型
    subjects: [{id: 0, name: '音乐', checked: false},
               {id: 1, name: '舞蹈', checked: false},
               {id: 2, name: '美术', checked: false},
               {id: 3, name: '专业艺考', checked: false}, 
               {id: 4, name: '书法', checked: false},
               {id: 5, name: '互联网', checked: false}],
    subjectChoose: [],  // 擅长科目选择
    courseCategory: [], // 课程类别id
    privImg: "",        // 个人照片
    privImgId: '',    // 个人照片id
    pubImg: "",         // 宣传照片
    pubImgId: '',     // 宣传照片id
    briefInfo: "",      // 个人简介
    flag: false,        // 是否登记过
    updateflag: false,   //信息更新标识
    checkinInfo:[]      // 登记过时读取信息
  },
  handleSchool(e){
    this.setData({
      school: e.detail.value
    });
  },
  eduChange(e){
    this.setData({
      eduIdx: e.detail.value
    });
  },
  handleEduNum(e){
    this.setData({
      eduNum: e.detail.value
    });
  },
  degreeChange(e){
    this.setData({
      deIdx: e.detail.value
    });
  },
  handleDegNum(e){
    this.setData({
      degNum: e.detail.value
    });
  },
  handleTraining(e){
    this.setData({
      trainings: e.detail.value
    });
  },
  handleAwards(e){
    this.setData({
      awards: e.detail.value
    });
  },
  handleWorks(e){
    this.setData({
      works: e.detail.value
    })
  },
  handlePrivHome(e){
    var priv = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (!priv.test(e.detail.value)){
      wx.showToast({
        title: '网址格式错误',
        icon: 'none'
      })
    }else{
      this.setData({
        privHome: e.detail.value
      });
    }
  },
  handlePrivWeibo(e){
    var weibo = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (!weibo.test(e.detail.value)){
      wx.showToast({
        title: '网址格式错误',
        icon: 'none'
      })
    }else{
      this.setData({
        privWeibo: e.detail.value
      });
    }
  },
  handleTypeChange(e){
    let worktype = e.currentTarget.dataset.type
    let workTypes = this.data.workTypes
    workTypes[worktype].checked = false
    worktype == 1? worktype=0 : worktype=1
    workTypes[worktype].checked = true
    this.setData({
      worktype: worktype,
      workTypes: workTypes
    });
  },
  subjectChange(e){
    let subs = [{id: 0, name: '音乐', checked: false}, {id: 1, name: '舞蹈', checked: false},
                {id: 2, name: '美术', checked: false}, {id: 3, name: '专业艺考', checked: false}, 
                {id: 4, name: '书法', checked: false}, {id: 5, name: '互联网', checked: false}]
    let select = e.detail.value
    if(select.length <= 5){
      for(let i=0; i<select.length; i++){
        subs[select[i]].checked = true
      }
      this.setData({
        subjects: subs,
        subjectChoose: select
      });
    }else{
      for(let i=0; i<select.length-1; i++){
        subs[select[i]].checked = true
      }
      select.splice(5, 1)
      this.setData({
        subjects: subs,
        subjectChoose: select
      });
    }
  },
  chooseImg(e){
    let type = e.currentTarget.dataset.type
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res=>{
        if(type == 'eduImg'){
          this.setData({
            eduImg: res.tempFilePaths
          });
          this._deu();
        }else if(type=='degImg'){
          this.setData({
            degImg: res.tempFilePaths
          });
          this._deg();
        }else if(type == 'privImg'){
          this.setData({
            privImg: res.tempFilePaths
          });
          this._priv();
        }else if(type == 'pubImg'){
          this.setData({
            pubImg: res.tempFilePaths
          });
          this.pubImgId();
        }
      }
    });
  },
  ViewImage(e) {
    let type = e.currentTarget.dataset.type
    if(type == 'eduImg'){
      wx.previewImage({
        urls: this.data.eduImg,
        current: e.currentTarget.dataset.url
      });
    }else if(type == 'degImg'){
      wx.previewImage({
        urls: this.data.degImg,
        current: e.currentTarget.dataset.url
      });
    }else if(type == 'privImg'){
      wx.previewImage({
        urls: this.data.privImg,
        current: e.currentTarget.dataset.url
      });
    }else if(type == 'pubImg'){
      wx.previewImage({
        urls: this.data.pubImg,
        current: e.currentTarget.dataset.url
      });
    }
  },
  delImg(e) {
    let type = e.currentTarget.dataset.type
    wx.showModal({
      content: '是否删除该照片',
      success: res => {
        if(res.confirm) {
          if(type == 'eduImg'){
            this.setData({
              eduImg: '',
              eduImgId:1
            });
          }else if(type=='degImg'){
            this.setData({
              degImg: '',
              degImgId:1
            });
          }else if(type == 'privImg'){
            this.setData({
              privImg: '',
              privImgId:1
            });
          }else if(type == 'pubImg'){
            this.setData({
              pubImg: '',
              pubImgId:1
            });
          }
        }
      }
    });
  },
  handleBrief(e){
    this.setData({
      briefInfo: e.detail.value
    });
  },
  checkin(){
    let that = this.data
    if(this.data.checkinInfo){
      this.setData({
        school: this.data.checkinInfo.gradSchool,
        eduNum: this.data.checkinInfo.gradCertId
      })
    }
    
    if(that.school=="" || that.eduIdx==0 || that.eduNum==""|| that.eduImg=="" || that.subjectChoose.length == 0){
      wx.showToast({
        title: '请完成必填项后提交',
        icon: 'none'
      })
    }else{
      this._putTeacherInfo();
    }
  },
  modify(){
    this.setData({
      flag: false
    })
  },
  _getAllSubject(){
    getAllSubject().then(res => {
      if(res.code == 200) {
        this.setData({
          courseCategory: res.data
        });
      }
    })
  },

  _deu(){
    let that = this.data
    if (that.eduImg.length) {
      let eduImg = {
        data: wx.getFileSystemManager().readFileSync(that.eduImg[0], "base64"),
        description: 'eduImg/' + wx.getStorageSync('loginInfo').userid,
        title: 'eduImg'
      }
      addPicture(eduImg).then(res => {
        if (res.code == 200) {
          this.setData({
            eduImgId: res.data
          });
        }
      });
    }
  },

  _deg() {
    let that = this.data
    if (that.degImg.length) {
      let degImg = {
        data: wx.getFileSystemManager().readFileSync(that.degImg[0], "base64"),
        description: 'degImg/' + wx.getStorageSync('loginInfo').userid,
        title: 'degImg'
      }
      addPicture(degImg).then(res => {
        if (res.code == 200) {
          this.setData({
            degImgId: res.data
          });
        }
      });
    }
  },

  _priv() {
    let that = this.data
    if (that.privImg.length) {
      let privImg = {
        data: wx.getFileSystemManager().readFileSync(that.privImg[0], "base64"),
        description: 'privImg/' + wx.getStorageSync('loginInfo').userid,
        title: 'privImg'
      }
      addPicture(privImg).then(res => {
        if (res.code == 200) {
          this.setData({
            privImgId: res.data
          });
        }
      });
    }
  },

  _pub() {
    let that = this.data
    if (that.pubImg.length) {
      let pubImg = {
        data: wx.getFileSystemManager().readFileSync(that.pubImg[0], "base64"),
        description: 'pubImg/' + wx.getStorageSync('loginInfo').userid,
        title: 'pubImg'
      }
      addPicture(pubImg).then(res => {
        if (res.code == 200) {
          this.setData({
            pubImgId: res.data
          });
        }
      });
    }
  },
  
  _putTeacherInfo(){
    wx.showLoading({
      title: '教师资料上传中',
    });
    let that = this.data
    let id = []
    for(let i=0; i<that.subjectChoose.length; i++){
      for(let j=0; j<that.courseCategory.length; j++){
        if(that.subjects[that.subjectChoose[i]].name == that.courseCategory[j].label){
          id.push(that.courseCategory[j].value)
          break;
        }
      }
    }
    
    let data = {
      userid: wx.getStorageSync('loginInfo').userid,
      gradSchool: that.school,
      education: that.educations[that.eduIdx],
      gradCertPhoto: that.eduImgId,
      gradCertId: that.eduNum,
      degree: that.degrees[that.deIdx],
      degreeCertPhoto: that.degImgId,
      degreeCertId: that.degNum,
      trainNum: that.trainings,
      awardsNum: that.awards,
      workNum: that.works,
      homepage: that.privHome,
      weibo: that.privWeibo,
      fullTime: that.worktype,
      courseType1Id: id[0] ? id[0] : '',
      courseType2Id: id[1] ? id[1] : '',
      courseType3Id: id[2] ? id[2] : '',
      courseType4Id: id[3] ? id[3] : '',
      courseType5Id: id[4] ? id[4] : '',
      photoId: that.privImgId,
      adverPhoto: that.pubImgId,
      briefIntro: that.briefInfo
    }
    if(this.data.updateflag){
      updateTeacherInfo(data).then((res) => {
        console.log('更新数据')
        if (res.code == 200) {
          this.setData({
            flag: true,
            checkinInfo: data
          });
          wx.showToast({
            title: '更新成功！',
          })
        }
      })
    }
    else{
      putTeacherInfo(data).then((res) => {
        console.log('插入数据')
        if (res.code == 200) {
          this.setData({
            flag: true,
            checkinInfo: data
          });
          wx.showToast({
            title: '登记成功！',
          })
        }
      })
    }
  },
  _getTeacherInfo(){
    let that = this.data
    let data = wx.getStorageSync('loginInfo').userid
    getTeacherInfo(data).then((res)=>{
      if (this.getInfoCallback) {
        this.getInfoCallback(res)
      }
      console.log(res)
      if(res.code == 200){
        this.setData({
          checkinInfo: res.data,
          flag: true,
          updateflag: true
        });
        let index = []
        index.push(that.checkinInfo.courseType1Id)
        index.push(that.checkinInfo.courseType2Id)
        index.push(that.checkinInfo.courseType3Id)
        index.push(that.checkinInfo.courseType4Id)
        index.push(that.checkinInfo.courseType5Id)
        var sindex = 0
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < that.courseCategory.length; j++) {
            if (index.indexOf(that.courseCategory[j].value)>=0) {
              if(that.subjects[i].name == that.courseCategory[j].label){ 
              this.setData({
                ['subjects['+i+'.].checked']: true,
                ['subjectChoose['+sindex+']']: i
              })
              sindex++
              break;
              }
            }
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let login = wx.getStorageSync('loginInfo').authenticated
    if(login){
      this._getAllSubject();
      this._getTeacherInfo();
      this.getInfoCallback = res => {
        if (res.code == 200){
          switch(res.data.education) {
            case '博士生研究生':
              this.setData({
                eduIdx: 1
              })
              break;
            case '硕士研究生':
              this.setData({
                eduIdx:2
              })
              break;
            case '本科':
              this.setData({
                eduIdx: 3
              })
              break;
            case '专科':
              this.setData({
                eduIdx: 4
              })
              break;
            case '其他':
              this.setData({
                eduIdx: 5
              })
              break;
            default:
              this.setData({
                eduIdx: 0
              })
              break;
          }
          switch(res.data.degree) {
            case '博士学位':
              this.setData({
                deIdx: 1
              })
              break;
            case '学术硕士学位':
              this.setData({
                deIdx:2
              })
              break;
            case '专业硕士学位':
              this.setData({
                deIdx: 3
              })
              break;
            case '学士学位':
              this.setData({
                deIdx: 4
              })
              break;
            case '其他':
              this.setData({
                deIdx: 5
              })
              break;
            default:
              this.setData({
                deIdx: 0
              })
              break;
          }
        var url = 'http://139.129.101.91:8081/offline-education-system/picture/'
        var edu = res.data.gradCertPhoto
        var deg = res.data.degreeCertPhoto
        var pri = res.data.photoId
        var pub = res.data.adverPhoto
        if(edu != 1){
          this.setData({
            eduImg: [url + edu],
            eduImgId: edu
          })
        }
        if(deg != 1){
          this.setData({
            degImg: [url + deg],
            degImgId: deg
          })
        }
        if(pri != 1){
          this.setData({
            privImg: [url + pri],
            privImgId: pri
          })
        }
        if(pub != 1){
          this.setData({
            pubImg: [url + pub],
            pubImgId: pub
          })
        }
      }
    }
    }else{
      wx.reLaunch({
        url: '../my-tch/my-tch',
      });
      wx.showToast({
        title: '请先在个人中心认证',
        icon: 'none'
      })
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
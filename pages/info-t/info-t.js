import {
  getAllSubject, addPicture, putTeacherInfo, getTeacherInfo, updateTeacherInfo, teacherCourse
} from '../../network/checkin'
import {
  cancelTime
} from '../../network/timeSelect'
import {
  relyPorcess, deleterely
} from '../../network/organization'
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
    workTypes: [{ value: '0', name: '兼职', checked: true}, 
                { value: '1', name: '全职', checked: false}],
    fulltime: 0,      // 工作类型
    subjects: [{id: 0, name: '西洋乐', checked: false},
               {id: 1, name: '民乐', checked: false},
               {id: 2, name: '打击乐', checked: false},
               {id: 3, name: '声乐', checked: false}, 
               {id: 4, name: '舞蹈', checked: false},
               {id: 5, name: '美术', checked: false},
               {id: 6, name: '专业艺考', checked: false},
               {id: 7, name: '书法', checked: false}],
    slength: 0,
    subjectChoose: [],  // 擅长科目选择
    courseCategory: [], // 课程类别id
    privImg: "",        // 个人照片
    privImgId: '',    // 个人照片id
    pubImg: "",         // 宣传照片
    pubImgId: '',     // 宣传照片id
    briefInfo: "",      // 个人简介
    flag: false,        // 是否登记过
    updateflag: false,   //信息更新标识
    checkinInfo:[],      // 登记过时读取信息
    isRely: false        //是否已经挂靠
  },

  //教师学校输入框******************************************
  handleSchool(e){
    if(!(/^[\u2E80-\u9FFF]+$/.test(e.detail.value))){
      setTimeout(() => {
        wx.showToast({
          title: '请输入正确的学校名称！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 3000)
      }, 0);
    }else{
      this.setData({
        school: e.detail.value
      });
    }
    
  },

  //教师学历选择框******************************************
  eduChange(e){
    this.setData({
      eduIdx: e.detail.value
    });
  },

  //教师学历编号输入框******************************************
  handleEduNum(e){
    this.setData({
      eduNum: e.detail.value
    });
  },

  //教师学位选择框******************************************
  degreeChange(e){
    this.setData({
      deIdx: e.detail.value
    });
  },

  //教师学位编号输入框******************************************
  handleDegNum(e){
    this.setData({
      degNum: e.detail.value
    });
  },

  //培训信息******************************************
  handleTraining(e){
    this.setData({
      trainings: e.detail.value
    });
  },

  //获奖信息******************************************
  handleAwards(e){
    this.setData({
      awards: e.detail.value
    })
  },

  //工作信息******************************************
  handleWorks(e){
    this.setData({
      works: e.detail.value
    })
  },

  //个人主页******************************************
  handlePrivHome(e){
    var priv = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (!priv.test(e.detail.value)){
      setTimeout(() => {
        wx.showToast({
          title: '网站格式错误！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
    }else{
      this.setData({
        privHome: e.detail.value
      });
    }
  },

  //个人微博******************************************
  handlePrivWeibo(e){
    var weibo = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (!weibo.test(e.detail.value)){
      setTimeout(() => {
        wx.showToast({
          title: '网站格式错误！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
    }else{
      this.setData({
        privWeibo: e.detail.value
      });
    }
  },

  //工作类型（兼职、全职）******************************************
  handleTypeChange(e){
    let workTypes = this.data.workTypes
    for (let i = 0, len = workTypes.length; i < len; ++i) {
      workTypes[i].checked = workTypes[i].value === e.detail.value
      if(workTypes[i].checked){
        this.setData({
          fulltime:i
        })
      }
    }
    this.setData({
      workTypes: workTypes
    });
  },

//获取教师擅长科目******************************************
  _teacherCourse(){
    let sub = this.data.subjects;
    let l = 0;
    teacherCourse(wx.getStorageSync('loginInfo').userid).then(res =>{
      if(res.code == 200){
        console.log(res)
        for(let i = 0; i < res.data.length; i++){
          for(let j = 0; j < 8; j++){
            if(res.data[i] == sub[j].name){
              sub[j].checked = true
              l++
            }
          }
        }
        this.setData({
          subjects: sub,
          slength: l
        })
      }else{
        setTimeout(() => {
          wx.showToast({
            title: '获取擅长科目出错！',
            icon: 'none'
          });
          setTimeout(() => {
            wx.hideToast();
          }, 3000)
        }, 0);
      }
    })
  },

  //增加擅长科目******************************************
  addOne(str){
    for(let i = 0; i< str.length; i++){
      str[i]++;
    }
    this.setData({
      subjectChoose: str
    })
  },

  //擅长科目选择******************************************
  subjectChange(e){
    var that = this
    this.setData({
      slength: 0
    })
    let subs = [{id: 0, name: '西洋乐', checked: false},  {id: 1, name: '民乐', checked: false},
                {id: 2, name: '打击乐', checked: false},  {id: 3, name: '声乐', checked: false}, 
                {id: 4, name: '舞蹈', checked: false},    {id: 5, name: '美术', checked: false},
                {id: 6, name: '专业艺考', checked: false}, {id: 7, name: '书法', checked: false}]
    let select = e.detail.value
    if(select.length <= 5){
      for(let i=0; i<select.length; i++){
        subs[select[i]].checked = true
      }
      that.addOne(select)
      this.setData({
        subjects: subs,
      });
    }else{
      for(let i=0; i<select.length-1; i++){
        subs[select[i]].checked = true
      }
      select.splice(5, 1)
      this.setData({
        subjects: subs,
      });
      that.addOne(select)
    }
  },

  //选择图片******************************************
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
          this._pub();
        }
      }
    });
  },

//预览图片******************************************
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

    // 挂靠进度查询******************************************
    _relyProcess(){
      let data = {
        userid : wx.getStorageSync('loginInfo').userid
      }
      relyPorcess(data).then((res)=>{
        if(res.code==200){
          if(res.data.checked==1 || res.data.checked==3 || res.checked==4){
            this.setData({
              isRely: true,
            })
          }
        }
      });
    },

    //解除挂靠******************************************
    _deleteRely(){
      let data = wx.getStorageSync('loginInfo').userid
      deleterely(data).then(res =>{
          if(res.code==200){
            setTimeout(() => {
              wx.showToast({
                title: '申请解除成功！',
              });
              setTimeout(() => {
                wx.hideToast();
              }, 3000)
            }, 0);
          }else{
            setTimeout(() => {
              wx.showToast({
                title: '申请解除失败！',
                icon: 'none'
              });
              setTimeout(() => {
                wx.hideToast();
              }, 3000)
            }, 0);
          }
      })
    },

    //删除图片******************************************
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

  //个人简介******************************************
  handleBrief(e){
    this.setData({
      briefInfo: e.detail.value
    });
  },

  //教师提交信息时，补充上次提交信息（教师提交信息时，会先判断这些是否修改了，未修改就用上次提交的信息提交）******************************************
  checkin(){
    let that = this.data
    console.log(this.data)
    if(this.data.checkinInfo){
      if(this.data.school==''){
        this.setData({
          school: this.data.checkinInfo.gradSchool,
       })
      }
      if(this.data.eduNum==''){
        this.setData({
          eduNum: this.data.checkinInfo.gradCertId
        })
      }
    }
    
    if(that.school=="" || that.eduIdx==0 || that.eduNum==""|| that.eduImg=="" || that.subjectChoose.length == 0){
      setTimeout(() => {
        wx.showToast({
          title: '请完成必填项后提交！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
    }else{
      this._putTeacherInfo();
    }
  },

  //教师修改信息（提交信息与修改信息不同，第一次为提交，后面都为修改）******************************************
  modify(){
    var that = this
    if(this.data.isRely){
      wx.showModal({
        cancelColor: 'cancelColor',
        title:'教师信息修改提示',
        content:'您目前目前不允许修改信息，请确定是否先解除挂靠关系（已排课不允许申请解除）？',
        success:function(res){
          if(res.confirm){
            wx.showModal({
              cancelColor: 'cancelColor',
              title:'取消挂靠提示',
              content:'取消挂靠可能会影响您正常上课，请先于机构进行协商，请您确定是否要取消挂靠？',
              success:function(res){
                if(res.confirm){
                  that._deleteRely()
                }
              }
            })    
          }
        }
      })
    }else{
      this.setData({
        flag: false
      })
    } 
  },
  //获取全部课程列表
  // _getAllSubject(){
  //   getAllSubject().then(res => {
  //     console.log("all:", res)
  //     if(res.code == 200) {
  //       this.setData({
  //         courseCategory: res.data
  //       });
  //       if(this._getcallback){
  //         this._getcallback(res.data)
  //       }
  //     }else{
  //       setTimeout(() => {
  //         wx.showToast({
  //           title: '请刷新页面1！',
  //           icon: "none",
  //         });
  //         setTimeout(() => {
  //           wx.hideToast();
  //         }, 3000)
  //       }, 0);
  //     }
  //   })
  // },

  //学历证书照片******************************************
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

  //学位证书照片******************************************
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

  //个人照片******************************************
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

  //宣传照片******************************************
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
  
  //教师上传信息******************************************
  _putTeacherInfo(){
    setTimeout(() => {
      wx.showLoading({
        title: '教师资料上传中',
      });
      setTimeout(() => {
        wx.hideLoading();
      }, 1500)
    }, 0);
    let that = this.data
    let id = that.subjectChoose

    if(this.data.trainings==0){
      this.setData({
        trainings: this.data.checkinInfo.trainNum,
     })
    }
    if(this.data.awards==0){
      this.setData({
        awards: this.data.checkinInfo.awardsNum
      })
    }
    if(this.data.works==0){
      this.setData({
        works: this.data.checkinInfo.workNum,
     })
    }
    if(this.data.privWeibo==''){
      this.setData({
        privWeibo: this.data.checkinInfo.weibo
      })
    }
    if(this.data.privHome==''){
      this.setData({
        privHome: this.data.checkinInfo.homepage
      })
    }
    if(this.data.briefInfo==''){
      this.setData({
        briefInfo: this.data.checkinInfo.briefIntro
      })
    }
    if(this.data.degNum==''){
      this.setData({
        degNum: this.data.checkinInfo.degNum
      })
    }
    



    let data = {
      userid: wx.getStorageSync('loginInfo').userid,
      degNum: that.degNum,
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
      fullTime: that.fulltime,
      courseType1Id: id[0] ? id[0] : '',
      courseType2Id: id[1] ? id[1] : '',
      courseType3Id: id[2] ? id[2] : '',
      courseType4Id: id[3] ? id[3] : '',
      courseType5Id: id[4] ? id[4] : '',
      photoId: that.privImgId,
      adverPhoto: that.pubImgId,
      briefIntro: that.briefInfo,

    }
    console.log(data)
    //判断是更新信息还是提交信息
    if(this.data.updateflag){
      updateTeacherInfo(data).then((res) => {
        console.log('更新数据')
        console.log(res)
        setTimeout(() => {
          wx.showLoading({
            title: '教师资料上传中',
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 1500)
        }, 0);
        if (res.code == 200) {
          this.setData({
            flag: true,
            checkinInfo: data
          });
          setTimeout(() => {
            wx.showToast({
              title: '更新成功！',
              icon: "success",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1000)
          }, 0);
        }else{
          setTimeout(() => {
            wx.showToast({
              title: res.msg,
              icon: "none",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 3000)
          }, 0);
        }
      })
    }
    else{
      putTeacherInfo(data).then((res) => {
        console.log('插入数据')
        if (res.code == 200) {
          cancelTime(wx.getStorageSync('loginInfo').userid).then(res=>{
            console.log(res)
          })
          this.setData({
            flag: true,
            checkinInfo: data
          });
          setTimeout(() => {
            wx.showToast({
              title: '登记成功！',
              icon: "success",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 1000)
          }, 0);
        }
      })
    }
  },

  //获取教师信息******************************************
  _getTeacherInfo(){
    let that = this.data
    let data = wx.getStorageSync('loginInfo').userid
    getTeacherInfo(data).then((res)=>{
      if (this.getInfoCallback) {
        this.getInfoCallback(res)
      }
      if(res.code == 200){
        console.log("get:", res)
        this.setData({
          checkinInfo: res.data,
          flag: true,
          updateflag: true
        });
        if(res.data.fullTime){
          let workTypes = this.data.workTypes
          workTypes[0].checked = false
          workTypes[1].checked = true
          this.setData({
            workTypes: workTypes,
            fulltime: 1
          })
        }
        // this._getcallback = res => {
        //   console.log(that.checkinInfo)
        //   let index = []
        //   index.push(that.checkinInfo.courseType1Id)
        //   index.push(that.checkinInfo.courseType2Id)
        //   index.push(that.checkinInfo.courseType3Id)
        //   index.push(that.checkinInfo.courseType4Id)
        //   index.push(that.checkinInfo.courseType5Id)
        //   var sindex = 0
        //   for (let i = 0; i < 8; i++) {
        //     for (let j = 0; j < res.length; j++) {
        //       if (index.indexOf(res[j].value)>=0) {
        //         if(that.subjects[i].name == res[j].label){ 
        //         this.setData({
        //           ['subjects['+i+'.].checked']: true,
        //           ['subjectChoose['+sindex+']']: i
        //         })
        //         sindex++
        //         break;
        //         }
        //       }
        //     }
        //   }
        // } 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let login = wx.getStorageSync('loginInfo').authenticated
    if(login){
      that._getTeacherInfo();
      that._teacherCourse();
      //this._getAllSubject();

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
        var url = 'https://www.sanshidiboundless.net:444/offline-education-system/picture/'
        var edu = res.data.gradCertPhoto
        var deg = res.data.degreeCertPhoto
        var pri = res.data.photoId
        var pub = res.data.adverPhoto
        //判断是否有提交的照片信息，为空时可能为0或1
        if(!(edu == 0 || edu == 1)){
          this.setData({
            eduImg: [url + edu],
            eduImgId: edu
          })
        }
        if(!(deg == 0 || deg == 1)){
          this.setData({
            degImg: [url + deg],
            degImgId: deg
          })
        }
        if(!(pri == 0 || pri == 1)){
          this.setData({
            privImg: [url + pri],
            privImgId: pri
          })
        }
        if(!(pub == 0 || pub ==1)){
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
      setTimeout(() => {
        wx.showToast({
          title: '请先在个人中心认证！',
          icon: "none",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1500)
      }, 0);
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
    if(this.data.flag){
      this._relyProcess()
    }
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
import request from './request.js'

export function getSearch(data) {
  return request({
    url: '/organization/name',
    method: 'POST',
    data: data
  })
} 

//第一次测试：调用机构接口来访问数据
export function getInstitute(){
  return request({
    url: '/organizations/all',
    method: 'GET',
  })
}

export function getDetail(url){
  return request({
    url: url,
    method: 'GET',
  })
}

//如果当前用户为学生或者家长的话，获取他所挂靠的机构
export function  getOrgInfo(data) {
  return request({
    url: '/student/organizations/'+ data,
    method: 'GET',
  })
}

//获取当前机构的近期活动内容
export function getOrgAct(data) {
  return request({
    url: '/organization/activity/latest',
    method: 'POST',
    data:{
      orgId: data
    }
  })
}


//查询当前学生是否已经报名该机构
export function checkOrg(data) {
  return request({
    url: '/student/'+data.userid+'/organization/'+data.orgid,
    method: 'GET'
  })
}

//获取学生和机构的报名关系，包括是否报名以及在当前机构是否有课
export function getRelation(data) {
  return request({
    url: '/student/'+ data.userid + '/organization/' + data.orgid,
    method: 'GET'
  })
}

export function getTeacherCourse(data) {
  return request ({
    url: '/promote/userId?userId=' + data,
    method: 'GET'
  })
}
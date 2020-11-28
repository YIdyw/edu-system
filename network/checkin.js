import request from './request.js'

// 照片添加
export function addPicture(data){
  return request({
    url: '/picture',
    method: 'POST',
    data: data
  });
}

// 更新教师信息
export function updateTeacherInfo(data) {
  return request({
    url: '/teacher',
    method: 'PUT',
    data: data
  });
}

// 获取全部科目编号
export function getAllSubject() {
  return request({
    url: '/coursecategory',
    method: 'GET',
  })
} 

// 提交登记
export function putTeacherInfo(data){
  return request({
    url: '/teacher',
    method: 'POST',
    data: data
  });
}

// 检验是否登记
export function getTeacherInfo(data){
  return request({
    url:'/teacher/'+data,
    method: 'GET'
  });
}

// 教师擅长科目查询
export function teacherCourse(data){
  return request({
    url:'/coursecategory/querycourse/'+data,
    method: 'GET'
  });
}
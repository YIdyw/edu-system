import request from './request.js'

// 学生请假
export function askForLeave(data){
  return request({
    url: '/course/leave',
    method: 'POST',
    data: data
  });
}

// 老师批假
export function teacheragree(data){
  return request({
    url: '/course/leave',
    method: 'PUST',
    data: data
  });
}

// 学生申请补课
export function stuMakeUp(data){
  return request({
    url: '/course/makeup',
    method: 'POST',
    data: data
  });
}

// 老师批准是否补课
export function teaMakeUp(data){
  return request({
    url: '/course/makeup',
    method: 'PUT',
    data: data
  });
}

//根据课程id查询课程所属机构
export function query_org(data){
  return request({
    url:'/course/queryCourse/'+ data,
    method:'GET'
  })
}
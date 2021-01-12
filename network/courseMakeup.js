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
export function askForLeave(data){
  return request({
    url: '/appoint/'+data,
    method: 'GET',
    data: data
  });
}

// 老师批准是否补课
export function askForLeave(data){
  return request({
    url: '/appoint/'+data,
    method: 'GET',
  });
}
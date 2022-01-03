import request from './request.js'

export function scheduleQuery(data) {
  return request({
    url: '/course/syllabus',
    method: 'POST',
    data: data
  })
} 

// 学生请假
export function askForLeave(data){
  return request({
    url: '/course/leave',
    method: 'POST',
    data: data
  });
}

// 老师查阅请假记录
export function teache_lookup(data){
  return request({
    url: '/course/leave/teacher',
    method: 'GET',
    data:{
      teaId:data
    },
  });
}

// 老师处理请假
export function teacher_deal(data){
  return request({
    url: '/course/leave',
    method: 'PUT',
    data: data
  });
}

//老师处理结果推送给学生
export function push_leava(data){
  return request({
    url: '/weixin/leaveReminder/' + data.userId + '/' + data.recordId,
    method:'POST',
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

// 老师查阅补课记录
export function tealookup(data){
  return request({
    url: '/course/makeup',
    method: 'GET',
    data:{
      teaId:data
    },
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

//根据学生自己的id以及当前课程的courseid查询当前课程是否已经请假
export function is_checkout(data){
  return request({
    url:'/course/leave/user',
    method:'GET',
    data:data
  })
}
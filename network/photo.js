import request from './request.js'

export function getBannerPicture() {
  return request({
    url: '/platform/getBannerPicture',
    method: 'POST',
  })
} 
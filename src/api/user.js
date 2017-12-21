import request from '@/utils/request'

export function userList(query) {
  return request({
    url: '/sysUser',
    method: 'get'
    // method: 'get',
    // params: query
  })
}

export function fetchArticle() {
  return request({
    url: '/sysUser/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/sysUser/pv',
    method: 'get',
    params: { pv }
  })
}


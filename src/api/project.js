import request from '@/utils/request'

export function projectTreeList(query) {
  return request({
    url: '/project',
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


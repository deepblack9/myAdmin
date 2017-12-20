import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/sysRole',
    method: 'get'
    // method: 'get',
    // params: query
  })
}

export function fetchDetail() {
  return request({
    url: '/sysRole/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/sysRole/pv',
    method: 'get',
    params: { pv }
  })
}


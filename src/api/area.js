import request from '@/utils/request'

export const getCitys = (params) => {
  return request({
    url: '/area/city',
    params
  })
}

export const getHots = () => {
  return request({
    url: '/area/hot'
  })
}

// 小区关键词查询
export const getCom = ({ name, id }) => {
  return request({
    url: '/area/community',
    params: { name, id }
  })
}
// 根据城市名称获取城市id
export const getCityValue = (name) => {
  return request({
    url: '/area/community',
    params: {
      name
    }
  })
}

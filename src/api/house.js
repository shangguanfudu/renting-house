import request from '@/utils/request'
// 根据条件查询
export const checkIf = (id) => {
  return request({
    url: '/houses',
    params: { id }
  })
}
// 获取房屋详情
export const getDetail = (id) => {
  return request({
    url: `/houses/${id}`
  })
}

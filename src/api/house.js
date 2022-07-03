import request from '@/utils/request'
// 根据id查询
export const checkIf = (id) => {
  return request({
    url: '/houses',
    params: { cityId: id }
  })
}
// 根据条件查询
export const checkHouse = ({ cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end }) => {
  return request({
    url: '/houses',
    params: { cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end }
  })
}
// 获取房屋详情
export const getDetail = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
// 获取房屋查询条件
export const getConditions = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
// 发布房屋所需条件
export const getAddConditions = () => {
  return request({
    url: '/houses/params'
  })
}

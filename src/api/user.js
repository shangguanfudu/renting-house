import request from '@/utils/request'

// 登录
export const loginUp = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: { username, password }
  })
}
// 获取用户信息
export const getInfo = () => {
  return request({
    url: '/user'
  })
}
// 发布房源
export const pubHouse = ({
  title,
  description,
  houseImg,
  oriented,
  supporting,
  price,
  roomType,
  size,
  floor,
  community
}) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data: {
      title,
      description,
      houseImg,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    }
  })
}
// 获取已发布房源
export const getHouse = () => {
  return request({
    url: '/user/houses'
  })
}
// 房屋是否收藏
export const isFav = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}
// 添加收藏
export const addFav = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`
  })
}
// 删除收藏
export const delFav = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/favorites/${id}`
  })
}
// 查看收藏列表
export const getFav = () => {
  return request({
    url: '/user/favorites'
  })
}

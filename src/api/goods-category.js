// 商品分类相关Api
import req from '@/utils/request'

// 获取商品列表
export const getGoodsCategoryList = (type = 3) => req({
  method: 'get',
  url: '/categories',
  params: {
    type
  }
}).then(res => res.data)

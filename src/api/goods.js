// 商品管理相关接口
import req from '@/utils/request'

// 获取商品列表
export const getGoodsList = ({ pagenum = 1, pagesize = 5, query = '' }) => req({
  method: 'get',
  url: '/goods',
  params: { // GET 参数
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)

// 删除商品
export const deleteGoodsById = (goodsId) => req({
  method: 'delete',
  url: `/goods/${goodsId}`
}).then(res => res.data)

// 新增商品
export const addGoods = ({ goods_name,
  goods_cat,
  goods_price,
  goods_number,
  goods_weight,
  goods_introduce = '',
  pics = {},
  attrs = [] }) => req({
  method: 'post',
  url: '/goods',
  data: { // post 参数
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    goods_introduce,
    pics,
    attrs
  }
}).then(res => res.data)

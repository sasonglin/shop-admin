<template>
 <div>
   <el-steps :active="1" simple>
    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
    <el-step title="步骤 2" icon="el-icon-tickets"></el-step>
    <el-step title="步骤 3" icon="el-icon-edit-outline"></el-step>
    <el-step title="步骤 4" icon="el-icon-upload"></el-step>
    <el-step title="步骤 5" icon="el-icon-success"></el-step>
  </el-steps>
  <el-tabs tab-position="left">
    <el-tab-pane label="基本信息">
       <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="formData.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model.number="formData.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model.number="formData.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="formData.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <!--级联选择器
          options 数据
          v-model=“结果数据”它会把用户的所有节点的value都同步到这个数据中
          change 选中的改变事件
          props 设置参数，告诉选择器value，label，children等属性
          在数据中的体现
          -->
          <el-cascader
            :options="goodsCategories"
            v-model="formData.goods_cat"
            @change="handleChange"
            :props="{ value: 'cat_id', label: 'cat_name', children: 'children' }"
            >
          </el-cascader>
        </el-form-item>
        <el-form-item label="是否促销">
          <el-radio-group v-model="formData.is_promote">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品参数">配置管理</el-tab-pane>
    <el-tab-pane label="商品属性">角色管理</el-tab-pane>
    <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
    <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
  </el-tabs>
 </div>
</template>

<script>
import { getGoodsCategoryList } from '@/api/goods-category.js'
import { constants } from 'fs';
export default {
  name: 'AddGoods',
  created () {
    this.loadGoodsCategories()
  },
  data () {
    return {
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: false
      },
      goodsCategories: [],
      selectedOptions: [],
      selectedOptions2: []
    }
  },
  methods: {
    async loadGoodsCategories () {
      const { data, meta } = await getGoodsCategoryList()
      console.log(data, meta)
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },
    handleChange (value) {
      console.log(value)
    },
    onSubmit () {
    }
  }
}
</script>

<style scoped>
.el-tabs {
  margin-top: 30px;
}
.el-input {
  width: 100%;
}
.el-cascader {
  width: 100%;
}
</style>

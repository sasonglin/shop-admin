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
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品参数">
      <el-row class="param-row" v-for="param in goodsCategoryParams" :key="param.attr_id">
        <el-col :span="4"> {{ param.attr_name }} </el-col>
        <el-col :span="20">
          <el-checkbox-group  v-model="param.attr_selected_vals" size="small">
            <el-checkbox
            class="s-cb"
            :label="val"
            border
            v-for="val in param.attr_selected_vals"
            :key = 'val+ Math.random()'
            >

            </el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="商品属性">
      <el-form label-position="right" label-width="120px">
        <el-form-item :label="attr.attr_name"
        v-for="attr in goodsCategoryAttrs" :key="attr.attr_id">
          <el-input v-model="attr.attr_vals"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品图片">
      <!--
        action :给其地址，组件会自动发送请求
        headers :设置上传的请求头部(由于是组建自动发送请求，所以不走拦截器，这里需要手动写入token)
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        upload 会自己去请求
        :on-success 虽然是属性，但在图片上传成功时会执行定义好的方法
         -->
      <el-upload
        action="http://localhost:8888/api/private/v1/upload"
        :on-success = "handleUploadSuccess"
        :headers = "uploadHeaders"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-tab-pane>
    <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
  </el-tabs>
 </div>
</template>

<script>
import { getGoodsCategoryList, getGoodsParamsList } from '@/api/goods-category.js'
import { getToken } from '@/utils/auth.js'
import { addGoods } from '@/api/goods.js'
export default {
  name: 'AddGoods',
  created () {
    this.loadGoodsCategories()
  },
  data () {
    return {
      uploadHeaders: { // 配置上传的请求头
        Authorization: getToken()
      },
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: false,
        pics:[]
      },
      goodsCategories: [],
      goodsCategoryAttrs: [], // 商品属性
      goodsCategoryParams: [] // 商品参数
    }
  },
  methods: {
    async loadGoodsCategories () {
      const { data, meta } = await getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },
    handleChange (value) {
      const catId = value[value.length - 1]

      // 根据用户所选分类加载商品属性
      this.loadGoodsCategoriesAttrs(catId)
      // 根据用户所选分类加载商品参数
      this.loadGoodsCategoriesParams(catId)
    },
    async onSubmit () {
      const {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat,
        is_promote,
        pics
      } = this.formData

      // 商品属性
      const categoryParams = this.goodsCategoryParams.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })

      // 商品参数
      const categoryAttrs = this.goodsCategoryParams.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_selected_vals.join(',') // 字符串需要','隔开,将数组转换为字符串
        }
      }).filter(item => item.attr_value.length > 0) // 以防加入空字符

      // 将获得的数据并成一个数组提交到服务器接口
      const attrs = [...categoryAttrs, ...categoryParams]
      console.log(attrs)

      const { meta } = await addGoods({
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat: goods_cat.join(','),
        is_promote,
        attrs,
        pics
      })
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.replace('/goods/goods')
      }
    },
    async loadGoodsCategoriesAttrs (catId) {
      const { data, meta } = await getGoodsParamsList(catId, 'only') // 获取去商品属性
      if (meta.status === 200) {
        this.goodsCategoryAttrs = data
      }
    },
    async loadGoodsCategoriesParams (catId) {
      const { data, meta } = await getGoodsParamsList(catId) // 获取去商品参数
      if (meta.status === 200) {
        data.forEach(param => {
          param.attr_selected_vals = param.attr_vals.split(',')
        })
        this.goodsCategoryParams = data
      }
    },
    /**
     * 上传图片成功处理函数
     * response 是请求成功的响应数据
     * file 上传的文件信息对象
     */
    handleUploadSuccess (response, file) {
     this.formData.pics.push({
       pic: response.data.tmp_path
     })
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
.param-row {
  margin-bottom: 15px;
}
.s-cb {
  margin-bottom: 10px;
}
</style>

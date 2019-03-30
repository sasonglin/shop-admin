<template>
 <div>
    <el-row>
      <el-col>
        <el-cascader
        :options="goodsCategories"
        v-model="selectedOptions"
        @change="handleChange"
        :props="{ value: 'cat_id', label: 'cat_name', children: 'children' }"
        ></el-cascader>
      </el-col>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="动态参数">
         <el-table
          :data="formParamsMany"
          border
          stripe
          style="width: 100%">
          <el-table-column type="index" label="编号" width="60px"></el-table-column>
          <el-table-column
            prop="attr_name"
            label="属性名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="attr_vals"
            label="属性值">
          </el-table-column>
          <el-table-column
            label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" round
                >编辑</el-button>
                <el-button size="mini" type="danger" round
                @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数">
        <el-table
          :data="formParamsOnly"
          border
          stripe
          style="width: 100%">
          <el-table-column type="index" label="编号" width="60px"></el-table-column>
          <el-table-column
            prop="attr_name"
            label="属性名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="attr_vals"
            label="属性值">
          </el-table-column>
          <el-table-column
            label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" round
                >编辑</el-button>
                <el-button size="mini" type="danger" round
                @click="handleDelete(scope.row)"
                >删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
 </div>
</template>

<script>
import { getGoodsCategoryList, getGoodsParamsList } from '@/api/goods-category.js'
export default {
  created () {
    this.loadGoodsCategories()
    this.loadGoodsParams()
  },
  data () {
    return {
      formParamsOnly: [],
      formParamsMany: [],
      id: '',
      goodsCategories: [],
      selectedOptions: [1, 3, 6]
    }
  },
  methods: {
    async loadGoodsCategories () {
      const { data, meta } = await getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },
    async loadGoodsParams () {
      const { data, meta } = await getGoodsParamsList(this.selectedOptions[this.selectedOptions.length - 1], 'only')
      const { data: dataMany } = await getGoodsParamsList(this.selectedOptions[this.selectedOptions.length - 1])
      if (meta.status === 200) {
        this.formParamsOnly = data
        this.formParamsMany = dataMany
      }
    },
    handleChange (value) {
      console.log(value)
      this.id = value[value.length - 1]
      this.loadGoodsParams()
      // const { data, meta }  = await getGoodsParamsList(value)
    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    handleDelete (item) {
    }
  }
}
</script>

<style scope>
.el-row {
  margin-bottom: 10px;
}
</style>

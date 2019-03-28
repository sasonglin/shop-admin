<template>
<div class="main">
  <el-row :gutter="20">
    <el-col :span="7">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select" @keyup.native='loadGoodsList()'>
        <el-button slot="append" icon="el-icon-search" @click="loadGoodsList()"></el-button>
      </el-input>
    </el-col>
  </el-row>
  <template>
    <el-table
      :data="goods"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" round
          >编辑</el-button>
          <el-button size="mini" type="danger" round
          @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
          size="mini" type="warning" round>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15]"
      :page-size = '5'
      layout="total, sizes, prev, pager, next, jumper"
      :total="UserTotal">
    </el-pagination>
  </template>
</div>
</template>

<script>
import { getGoodsList, deleteGoodsById } from '@/api/goods.js'
export default {
  name: 'GoodsList',
  created () {
    this.loadGoodsList()
  },
  data () {
    return {
      size: 5,
      searchText: '',
      page: 1,
      UserTotal: 0,
      goods: []
    }
  },
  methods: {
    async loadGoodsList (page = this.page, size = this.size) {
      const { data, meta } = await getGoodsList({ pagenum: page, pagesize: size, query: this.searchText })
      if (meta.status === 200) {
        this.UserTotal = data.total
        this.goods = data.goods
      }
    },
    async handleDelete (item) {
      this.$confirm('此操作会删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await deleteGoodsById(item.goods_id)
        console.log(meta)
        if (meta.status === 200) {
          this.loadGoodsList()
          this.$message({
            message: `商品删除成功`,
            type: 'success'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange (size) {
      this.size = size
      this.loadGoodsList()
    },
    handleCurrentChange (page) {
      this.page = page
      this.loadGoodsList()
    }
  }
}
</script>

<style>

</style>

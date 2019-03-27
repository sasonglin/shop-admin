<template>
  <el-table
    :data="rights"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
        {{ ['一级', '二级', '三级'][scope.row.level] }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getRightsList } from '@/api/rights.js'
export default {
  created () {
    this.loadRightsList()
  },
  data () {
    return {
      rights: []
    }
  },
  methods: {
    async loadRightsList () {
      const { data, meta } = await getRightsList()
      if (meta.status === 200) {
        this.rights = data
      }
    }
  }
}
</script>

<style>

</style>

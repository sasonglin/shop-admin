<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <AppBreadcrumb :list="[{ label: '首页', path: '/' }, { label: '权限管理' }, { label: '角色列表' }]"></AppBreadcrumb>
      </div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addFormList = true">添加用户</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table
          :data="roles"
          stripe
          border
          v-loading="tableLoading"
          style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="roleDesc"
            label="描述"
            width="300px">
          </el-table-column>
          <!--
            自定义表格列
            自定义内容写到
            <template slot-scope="scope"></template> 里面
            scope.row 就是遍历的数组元素
            scope.$index 就是遍历的索引
          -->
          <el-table-column
            prop="email"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" round
              >编辑</el-button>
              <el-button size="mini" type="danger" round
              @click="handleRoleDelete(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import * as Roles from '@/api/role.js'
export default {
  created () {
    this.loadList()
  },
  data () {
    return {
      roles: [],
      tableLoading: true
    }
  },
  methods: {
    async loadList () {
      const { data, meta } = await Roles.getRoleList()
      if (meta.status === 200) {
        this.roles = data
        this.tableLoading = false
      }
    },
    async handleRoleDelete (id) {
      const { meta } = await Roles.deleteRoleById(id)
      if (meta.status === 200) {
        this.$message({
          message: `${meta.msg}`,
          type: 'success'
        })
        this.loadList()
      }
    }
  },
  components: {
  }
}
</script>

<style>
.main {
  height: 100%;
}

.el-card {
 height: 100%;
}
.el-table {
  margin-top: 15px;
}
</style>

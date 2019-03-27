<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <AppBreadcrumb :list="[{ label: '首页', path: '/' }, { label: '权限管理' }, { label: '角色列表' }]"></AppBreadcrumb>
      </div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="$refs.showAddFormEL.showRoleAdd()">添加用户</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table
          :data="roles"
          stripe
          border
          v-loading="tableLoading"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
               <!-- 一级 -->
              <el-row class="first" v-for="first in scope.row.children" :key="first.id">
                <el-col :span='4'>
                  <hr>
                 <el-tag closable @close="handleDeleteRights(scope.row, first)">{{ first.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <hr>
                <el-col :span="20">
                   <!-- 二级 -->
                  <el-row class="second" v-for="second in first.children" :key="second.id">
                    <el-col :span="4">
                      <el-tag closable type="success" @close="handleDeleteRights(scope.row, second)">{{ second.authName }}</el-tag>
                      <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                       <!-- 三级 -->
                      <el-tag class="third"
                       @close="handleDeleteRights(scope.row, third)"
                       v-for="third in second.children"
                       :key="third.id"
                        closable type="warning">{{ third.authName }}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
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
              <el-button
              @click="$refs.showRightsEL.showRightList(scope.row)"
              size="mini" type="warning" round>角色授权</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <!-- 新增 -->
    <RoleAdd ref = 'showAddFormEL'
    @successAdd = 'loadList'
    ></RoleAdd>
    <!-- 角色授权 -->
    <RightsList ref = 'showRightsEL'
    @editRightsuccess = 'loadList'
    ></RightsList>
  </div>
</template>

<script>
import * as Roles from '@/api/role.js'
import RoleAdd from './role-add.vue'
import RightsList from './edit-right.vue'
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
      this.$confirm('此操作会删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await Roles.deleteRoleById(id)
        if (meta.status === 200) {
          this.$message({
            message: `${meta.msg}`,
            type: 'success'
          })
          this.loadList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  components: {
    RoleAdd,
    RightsList
  }
}
</script>

<style scoped>
.el-card {
 height: 100%;
}
.el-table {
  margin-top: 15px;
}
.first {
  margin-bottom: 10px;
}

.second, .third {
  margin-top: 5px;
}

.third {
  margin-right: 5px;
}
i {
  font-size: 20px;
  margin-left: 20px;
  vertical-align: middle;
}
</style>

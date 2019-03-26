<template>
  <el-dialog title="角色分配" :visible.sync="roleFormList" width=30%>
    <el-form :model="roleFormData" size="middle">
      <el-form-item label="用户名 :" label-width="75px" prop="username">
        <el-input v-model="roleFormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色 :" label-width="75px" prop="email">
        <el-select placeholder="请选择" v-model="roleFormData.rid">
          <el-option label="请选择" :value="-1"></el-option>
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormList = false">取 消</el-button>
      <el-button type="primary" @click="handleRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { findUserById, changeRole } from '@/api/users.js'
import { getRoleList } from '@/api/role.js'
export default {
  name: 'UserEditRole',
  data () {
    return {
      roleFormList: false,
      roleFormData: {
        username: ''
      },
      roles: []
    }
  },
  methods: {
    async handleRole () {
      const { id: userId, rid: roleId } = this.roleFormData
      const { meta } = await changeRole(userId, roleId)
      console.log(meta)
      if (meta.status === 200) {
        this.$message({
          message: `${meta.msg}`,
          type: 'success'
        })
        this.roleFormList = false
      }
    },
    // 异步串行模式
    // async showRoleDialog (item) {
    //   const { data, meta } = await findUserById(item.id)
    //   if (meta.status === 200) {
    //     this.roleFormData = data
    //     this.roleFormList = true
    //   }

    //   const { data: roleData, meta: roleMeta } = await getRoleList()
    //   if (roleMeta.status === 200) {
    //     this.roles = roleData
    //   }
    // }

    // 异步并行
    async showRoleDialog (item) {
      const [userData, roleData] = await Promise.all([
        findUserById(item.id),
        getRoleList()
      ])
      if (userData.meta.status === 200) {
        this.roleFormData = userData.data
        this.roleFormList = true
      }
      if (roleData.meta.status === 200) {
        this.roles = roleData.data
      }
    }
  }
}
</script>

<style>

</style>

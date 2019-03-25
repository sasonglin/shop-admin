<template>
  <el-dialog title="角色分配" :visible.sync="roleFormList" width=30%>
    <el-form :model="roleFormData" size="middle">
      <el-form-item label="用户名 :" label-width="75px" prop="username">
        <el-input v-model="roleFormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色 :" label-width="75px" prop="email">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormList = false">取 消</el-button>
      <el-button type="primary" @click="handleRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserEditRole',
  data () {
    return {
      roleFormList: true,
      roleFormData: {
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    handleRole () {
    },
    showRoleDialog (item) {
    }
  }
}
</script>

<style>

</style>

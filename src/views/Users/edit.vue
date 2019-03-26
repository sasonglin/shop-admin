<template>
  <el-dialog title="编辑用户" :visible.sync="editFormList" width=30%>
    <el-form :model="editFormData" size="middle" :rules="editFormRules">
      <el-form-item label="用户名 :" label-width="75px" prop="username">
        <el-input v-model="editFormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱 :" label-width="75px" prop="email">
        <el-input v-model="editFormData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话 :" label-width="75px" prop="mobile">
        <el-input v-model="editFormData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormList = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 引入封装的axios方法，准备做请求
import { findUserById, updateUserById } from '@/api/users.js'

export default {
  name: 'UserEdit',
  data () {
    return {
      editFormList: false,
      editFormData: {
        username: '',
        email: '',
        mobile: ''
      },
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleEdit () {
      const { id, email, mobile } = this.editFormData
      const { meta } = await updateUserById(id, { email, mobile })
      if (meta.status === 200) {
        this.$message({
          message: '编辑/修改，已完成~',
          type: 'success'
        })
        // 设置自定义事件，使父元素可以接收进行相应操作
        this.$emit('editSuccess')
        this.editFormList = false
      }
    },
    async showEditDialog (item) {
      const { data, meta } = await findUserById(item.id)
      if (meta.status === 200) {
        this.editFormData = data
        this.editFormList = true
      }
    }
  }
}
</script>

<style>

</style>

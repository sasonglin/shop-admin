<template>
  <el-dialog title="添加角色" :visible.sync="addRoleForm" width=40% >
    <el-form :model="addForm"  :rules="addFormRules" ref = 'roleForm'>
      <el-form-item label="角色名称" label-width="85px" prop="roleName">
        <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="85px"  prop="roleDesc">
        <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addRoleForm = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { create } from '@/api/role.js'
export default {
  name: 'RoleAdd',
  data () {
    return {
      addRoleForm: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showRoleAdd () {
      this.addRoleForm = true
    },
    handleAdd () {
      this.$refs.roleForm.validate(valid => {
        if (!valid) {
          return
        }
        this.submitAdd()// 表单验证通过，准备提交
      })
    },
    async submitAdd () {
      const { meta } = await create(this.addForm)
      if (meta.status === 201) {
        this.$refs.roleForm.resetFields();// 清空表单数据
        this.addRoleForm = false // 隐藏弹框
        this.$emit('successAdd')
        this.$message({
          message: `恭喜你${meta.msg}`,
          type: 'success'
        })
      } else if (meta.status === 400) {
        this.$message.error(`添加失败：${meta.msg}`);
      }
    }
  }
}
</script>

<style>

</style>

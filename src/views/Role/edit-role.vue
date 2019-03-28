<template>
   <el-dialog title="编辑角色" :visible.sync="editRoleForm" width=40% >
    <el-form :model="editForm"  :rules="editFormRules" ref = 'roleForm'>
      <el-form-item label="角色名称" label-width="85px" prop="roleName">
        <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="85px"  prop="roleDesc">
        <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editRoleForm = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editRoleById } from '@/api/role.js'
export default {
  name: 'RoleEdit',
  data () {
    return {
      editRoleForm: false,
      editForm: {
        roleName: '',
        roleDesc: ''
      },
      editFormRules: {
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
    showEditForm (item) {
      console.log(item)
      this.editForm = item
      this.editRoleForm = true
    },
    async handleEdit () {
      const editForm = this.editForm
      const { meta } = await editRoleById(editForm.id, editForm)
      if (meta.status === 200) {
        this.editRoleForm = false
        this.$message({
          message: '编辑角色成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>

</style>

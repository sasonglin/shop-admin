<template>
  <div class="main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addFormList = true">添加用户</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table
          :data="users"
          stripe
          border
          style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话"
            width="150px"
            >
          </el-table-column>
          <!--
            自定义表格列
            自定义内容写到
            <template slot-scope="scope"></template> 里面
            scope.row 就是遍历的数组元素
            scope.$index 就是遍历的索引
          -->
          <el-table-column
            label="状态"
            width="150px">
            <template slot-scope="scope">
              <el-switch
                style="display: block"
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="开启"
                inactive-text="禁用"
                @change="handleChangeState(scope.row)"
                >
              </el-switch>
            </template>
          </el-table-column>
           <el-table-column
            prop="email"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" round
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button size="mini" type="danger" round
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-button size="mini" type="warning" round>分配角色</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="addFormList" width=40%>
      <el-form :model="addFormData" size="middle" :rules="addFormRules" ref='addFormDataEL'>
        <el-form-item label="用户名 :" label-width="75px" prop="username">
          <el-input v-model="addFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" label-width="75px" prop="password">
          <el-input v-model="addFormData.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱 :" label-width="75px" prop="email">
          <el-input v-model="addFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话 :" label-width="75px" prop="mobile">
          <el-input v-model="addFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormList = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import req from '@/utils/request.js';
import * as Users from '@/api/users.js'
export default {
  name: 'UserList',
  async  created () {
    // const resData = await req({
    //   method: 'get',
    //   url: '/users',
    //   params: {
    //     pagenum: 1,
    //     pagesize: 5
    //   }
    // })
    this.loadList()
  },
  data () {
    return {
      users: [],
      searchText: '',
      addFormList: false,
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        value3: true,
        value4: false
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
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
    async loadList () {
      const { data, meta } = await Users.find({ pagenum: 1, pagesize: 100 })
      if (meta.status === 200) {
        this.users = data.users
      }
    },
    handleAdd () {
      // 检测表单中是否存在数据
      this.$refs.addFormDataEL.validate(valid => {
        if (!valid) {
          return
        }
        this.submitAdd()// 表单验证通过，准备提交
      })
    },
    async submitAdd () {
      const { meta, data } = await Users.create(this.addFormData)
      console.log(data);
      if (meta.status === 201) {
        this.$message({
          message: `恭喜你：${meta.msg}`,
          type: 'success'
        });
        this.$refs.addFormDataEL.resetFields() // 清空表单内容
        this.addFormList = false // 隐藏对话框
        this.loadList() // 页面重新加载
      } else if (meta.status === 400) {
        this.$message.error(`添加失败：${meta.msg}`);
      }
    },
    handleEdit () {
    },
    handleDelete () {
    },
    async handleChangeState (item) {
      const { data, meta } = await Users.changeState(item.id, item.mg_state)
      console.log(Users.changeState());
      if (meta.status === 200) {
        this.$message({
          message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`,
          type: 'success'
        })
      }
    }
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

.el-input__inner {
  width: 600px;
}
</style>

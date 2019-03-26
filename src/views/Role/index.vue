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
        <el-col :span="4">
          <el-button type="primary" @click="addFormList = true">添加用户</el-button>
        </el-col>
      </el-row>
      <template>
        <el-table
          :data="users"
          stripe
          border
          v-loading="tableLoading"
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
            prop="email"
            label="操作">
            <template slot-scope="">
              <el-button size="mini" type="primary" round
              >编辑</el-button>
              <el-button size="mini" type="danger" round
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

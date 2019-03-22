<template>
  <div class="content">
    <el-container>
    <el-header>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">
        <img src="./logo.png" alt="">
        </div>
        </el-col>
      <el-col :span="18"><div class="grid-content bg-purple">黑马程序员</div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple">
        <a href="#">退出</a>
        </div></el-col>
    </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="fas fa-user-secret fa-lg"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>用户列表</span>
            </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="fas fa-fist-raised fa-lg"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="fas fa-user-astronaut fa-lg"></i>
                <span>角色列表</span>
            </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="fas fa-th-large"></i>
                <span>权限列表</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- Layout 的子路由将被渲染到这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.content {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color:  #b3c0d1;
  height: 200px;
}
.el-main {
  background-color: #e9eef3;
}
.el-aside {
  background-color: #d3dce6;
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-col {
  line-height: 50px;
}
.fas {
  margin-right: 10px;
}
</style>

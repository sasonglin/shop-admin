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
          <el-button type="danger" round @click.prevent='handleLocalStorage'>
            <i class="fas fa-sign-out-alt"></i>
           退出
          </el-button>
        </div></el-col>
    </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          :router="true"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="fas fa-user-secret fa-lg"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
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
          <el-submenu index="3">
            <template slot="title">
              <i class="fab fa-product-hunt fa-lg"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
               <i class="fas fa-clipboard-list fa-lg"></i>
                <span>商品列表</span>
            </template>
            </el-menu-item>
            <el-menu-item index="3-2">
              <template slot="title">
                <i class="fab fa-steam-square fa-lg"></i>
                <span>分类参数</span>
            </template>
            </el-menu-item>
            <el-menu-item index="3-3">
              <template slot="title">
                <i class="fas fa-tag fa-lg"></i>
                <span>商品分类</span>
            </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="fas fa-phone-volume fa-lg"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
               <i class="fas fa-stream fa-lg"></i>
                <span>订单列表</span>
            </template>
            </el-menu-item>
            <el-menu-item index="4-2">
              <template slot="title">
               <i class="fas fa-database fa-lg"></i>
                <span>数据统计</span>
            </template>
            </el-menu-item>
            <el-menu-item index="4-3">
              <template slot="title">
                <i class="fas fa-server fa-lg"></i>
                <span>数据报表</span>
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
    },
    handleLocalStorage () {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
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
  background-color:  #fff;
  height: 200px;
}
.el-main {
  background-color: darkgrey;
}
.el-aside {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-col {
  line-height: 50px;
}
.fas,.fab{
  margin-right: 10px;
}
</style>

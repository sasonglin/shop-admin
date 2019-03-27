<template>
   <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    :router="true"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu v-for="first in rightsMenus" :key='first.id' :index='first.path'>
      <template slot="title">
        <i class="fas fa-user-secret fa-lg"></i>
        <span>{{ first.authName }}</span>
      </template>
      <el-menu-item v-for="second in first.children" :key='second.id' :index="`/${second.path}`">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>{{ second.authName }}</span>
      </template>
      </el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="2">
      <template slot="title">
        <i class="fas fa-fist-raised fa-lg"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/roles">
        <template slot="title">
          <i class="fas fa-user-astronaut fa-lg"></i>
          <span>角色列表</span>
      </template>
      </el-menu-item>
      <el-menu-item index="/rights">
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
    </el-submenu> -->
   </el-menu>
</template>

<script>
import { getMeanNav } from '@/api/menus.js'
export default {
  name: 'Navmean',
  created () {
    this.loadList()
  },
  data () {
    return {
      rightsMenus: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    async loadList () {
      const { data, meta } = await getMeanNav()
      if (meta.status === 200) {
        this.rightsMenus = data
      }
    }
  }
}
</script>

<style scoped>
.fas,.fab{
  margin-right: 10px;
}
</style>

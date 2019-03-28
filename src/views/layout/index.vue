<template>
  <div class="content">
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>
    <el-container>
      <el-aside width="200px">
        <Navmean></Navmean>
      </el-aside>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- <AppBreadcrumb :list="[{ label: '首页', path: '/' }, { label: '权限管理' }, { label: '角色列表' }]"></AppBreadcrumb> -->
            <AppBreadcrumb :list="getAppBreadcrumbs()"></AppBreadcrumb>
          </div>
        <!-- Layout 的子路由将被渲染到这里 -->
        <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import AppHeader from './header.vue'
import Navmean from './navmean'

export default {
  created () {
    console.log(this.$route.matched)
  },
  methods: {
    getAppBreadcrumbs () {
      const bread = [{ label: '首页', path: '/' }]
      this.$route.matched.slice(1).forEach(route => {
        bread.push({
          label: route.meta.label
        })
      })
      return bread
    }
  },
  components: {
    AppHeader,
    Navmean
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
.el-main {
  background-color: darkgrey;
}
.el-aside {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-card {
  min-height: 100%;
}
</style>

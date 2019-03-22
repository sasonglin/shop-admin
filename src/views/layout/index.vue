<template>
  <div class="content">
    <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
export default {

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
}
.el-main {
  background-color: #e9eef3;
}
.el-aside {
  background-color: #d3dce6;
}
</style>

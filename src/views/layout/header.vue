<template>
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
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.el-header {
  background-color:  #fff;
  height: 200px;
}
.el-col {
  line-height: 50px;
}
</style>

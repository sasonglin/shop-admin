<template>
  <div>
    <h1>欢迎光临<i class="el-icon-d-arrow-left"></i>一番<i class="el-icon-d-arrow-right"></i>管理系统</h1>
    <template>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in tming" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tming: [
        require('./timg.jpg'),
        require('./timg2.jpg'),
        require('./timg3.jpg'),
        require('./timg4.jpg'),
        require('./timg5.jpg')
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
img {
 width: 100%;
 height: 300px;
}
h1 {
  height: 60px;
  font-size: 30px;
  margin: 0 auto;
  margin-bottom:20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div>
    <p>Users 列表页</p>
  </div>
</template>

<script>
import req from '@/utils/request.js';
export default {
  name: 'UserList',
  async  created () {
    const resData = await req({
      method: 'get',
      url: '/users',
      params: {
        pagenum: 1,
        pagesize: 5
      }
    })
    console.log(resData);
  }
}
</script>

<style>

</style>

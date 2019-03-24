<template>
  <div>
    <p>Users 列表页</p>
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
    const { data, meta } = await Users.find({ pagenum: 1, pagesize: 100 })
    console.log(data, meta);
  }
}
</script>

<style>

</style>

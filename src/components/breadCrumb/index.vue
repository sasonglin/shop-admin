<template>
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <template v-for="item in list">
    <template v-if="item.path">
      <el-breadcrumb-item
        :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
    </template>
    <template v-else>
      <el-breadcrumb-item>{{ item.label }}</el-breadcrumb-item>
    </template>
  </template>
</el-breadcrumb>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
  props: {// 严谨写法
    list: {
      type: Array, // 类型Array，数组类型
      default: function () { // 参数选填，如果没有参数就默认选择return参数
        return [{ label: '首页' }, { path: '/' }]
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>

<template>
  <el-dialog title="角色授权" :visible.sync="RightsList" width=40% >
    <el-tree
      :data="rights"
      show-checkbox
      default-expand-all
      node-key="id"
      :default-checked-keys="defaultChecked"
      :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="RightsList = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleRightEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRightsList } from '@/api/rights.js'
export default {
  name: 'RoleEditRights',
  data () {
    return {
      RightsList: false,
      rights: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defaultChecked: []
    }
  },
  methods: {
    showRightList (role) {
      this.loadRight()
      this.getRightsCheck(role.children)
      this.RightsList = true
    },
    async loadRight () {
      const { data, meta } = await getRightsList('tree')
      if (meta.status === 200) {
        this.rights = data
      }
    },
    getRightsCheck (role) {
      const tmp = []
      role.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            tmp.push(third.id)
          })
        })
      })
      this.defaultChecked = tmp
    },
    async handleRightEdit () {
    }
  }
}
</script>

<style>

</style>

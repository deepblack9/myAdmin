<template>
  <!-- <div class="app-container"> -->
  <el-container>
    <!-- <div style="padding-bottom: 2px"> -->
    <el-header style="height: 40px; padding: 0px 0px; text-align: left; font-size: 12px">
      <el-input style="width: 200px"size="mini"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
        <el-dropdown>
          <el-button type="primary" size="mini" class="el-dropdown-link">
            目录<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>增加目录</el-dropdown-item>
            <el-dropdown-item>修改目录</el-dropdown-item>
            <el-dropdown-item>删除目录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <el-button type="primary" size="mini" class="el-dropdown-link">
            工程<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>增加工程</el-dropdown-item>
            <el-dropdown-item>修改工程</el-dropdown-item>
            <el-dropdown-item>删除工程</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    <!-- </div> -->
    </el-header>
    <!-- <div :style="{height:treeHeight + 'px'}" style="border:1px"> -->
    <el-main :style="{height:treeHeight - 50 + 'px'}" style="padding: 0px; border: 1px solid #dcdfe6">
      <el-tree
        style="width:100%"
        class="filter-tree"
        :data="list"
        :props="defaultProps"
        :filter-node-method="filterNode"
        ref="tree2"
        highlight-current
        node-key="id"
        :default-expanded-keys="[0]"
        :node-click="handleNodeClick">
      </el-tree>
    <!-- </div> -->
    </el-main>
  <!-- </div> -->
  </el-container>
</template>

<script>
import { parseTime } from '@/utils'
import DndList from '@/components/DndList'
import { projectTreeList } from '@/api/project'

let id = 1000

export default {
  name: 'sysUser',
  // directives: {
  //   waves
  // },
  components: { DndList },
  computed: {
    treeHeight() {
      return this.$store.getters.tableHeight
    },
    filterList2() {
      return this.list2.filter(v => {
        if (this.isNotInList1(v)) {
          return v
        }
        return false
      })
    }
  },
  data() {
    return {
      list: null,
      allRoleList: [],
      curRoleList: [],
      total: null,
      listLoading: true,

      filterText: '',
      data2: [{
        id: 0,
        label: '用户档案',
        children: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      temp: {
        uid: undefined,
        username: '',
        password: '',
        idcard: '',
        phone: '',
        email: '',
        statuscode: 'enable',
        createtime: '',
        createuser: '',
        updatetime: '',
        updateuser: ''
      }
      // rules: {
      //   phone: [
      //     { required: true, message: '请输入手机号码', trigger: 'change' }
      //   ],
      //   username: [
      //     { required: true, message: '请输入用户姓名', trigger: 'blur' }
      //   ],
      //   password: [
      //     { required: true, message: '请输入密码', trigger: 'change' },
      //     { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
      //   ],
      //   idcard: [
      //     { required: true, message: '请输入身份证号', trigger: 'change' }
      //   ],
      //   email: [
      //     { type: 'email', required: true, message: '请输入Email', trigger: 'change' }
      //   ],
      //   statuscode: [
      //     { required: true, message: '请选择状态', trigger: 'change' }
      //   ]
      // }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        enable: 'success',
        disable: 'danger',
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    statusLabelFilter(status) {
      const statusMap = {
        enable: '启用',
        disable: '停用'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleNodeClick(obj, node, el) {
      console.log('handleNodeClick')
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    getList() {
      this.listLoading = true
      projectTreeList(this.listQuery).then(response => {
        this.list = response.data.data.items
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined
        this.listQuery.end = undefined
        return
      }
      this.listQuery.start = parseInt(+time[0] / 1000)
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleRole() {
      this.dialogStatus = 'role'
      this.dialogRoleVisible = true
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(() => {

      })
    },
    create(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024
          // this.temp.timestamp = +new Date()
          // this.temp.author = '原创作者'
          // this.list.unshift(this.temp)
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        } else {
          return false
        }
      })
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.temp.timestamp = +this.temp.timestamp
          // for (const v of this.list) {
          //   if (v.id === this.temp.id) {
          //     const index = this.list.indexOf(v)
          //     this.list.splice(index, 1, this.temp)
          //     break
          //   }
          // }
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.temp = {
        uid: undefined,
        username: '',
        password: '',
        idcard: '',
        phone: '',
        email: '',
        statuscode: 'enable',
        createtime: '',
        createuser: '',
        updatetime: '',
        updateuser: ''
      }
    },
    // handleFetchPv(pv) {
    //   fetchPv(pv).then(response => {
    //     this.pvData = response.data.pvData
    //     this.dialogPvVisible = true
    //   })
    // },
    handleDownload() {
      // require.ensure([], () => {
      //   const { export_json_to_excel } = require('vendor/Export2Excel')
      //   const tHeader = ['时间', '地区', '类型', '标题', '重要性']
      //   const filterVal = ['timestamp', 'province', 'type', 'title', 'importance']
      //   const data = this.formatJson(filterVal, this.list)
      //   export_json_to_excel(tHeader, data, 'table数据')
      // })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

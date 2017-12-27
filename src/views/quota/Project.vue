<template>
  <div class="app-container calendar-list-container">
    <!-- <div class="filter-container"> -->
    <el-form class="small-space" ref="userQueryForm" :model="listQuery" size="mini" style='margin-bottom:20px;'>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="手机号" v-model="listQuery.phone">
      </el-input>

      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.status" placeholder="状态">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

<!--       <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select> -->

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
      <!-- <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox> -->
    <!-- </div> -->
    </el-form>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row style="width: 100%;" :style="{ height: tableHeight }">

      <el-table-column align="center" label='序号' width="60">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>

<!--       <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.uid}}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="手机号" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="密码">
        <template slot-scope="scope">
          <span>{{scope.row.password}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.idcard}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="email">
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="70">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.statuscode | statusFilter">{{statusLabelFilter(scope.row.statusname)}}</el-tag> -->
          <el-tag :type="scope.row.statuscode | statusFilter">{{scope.row.statuscode | statusLabelFilter}}</el-tag>
        </template>
      </el-table-column>

<!--       <el-table-column width="160px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.createuser}}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="160px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{scope.row.createuser}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="warning" @click="handleRole(scope.row)">角色
          </el-button>

          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleUpdate(scope.row)">修改
          </el-button>
          <!-- <el-button v-if="scope.row.status!='draft'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿</el-button> -->
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div ref="pagination" v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
      <el-form class="small-space" ref="userForm" :model="temp" :rules="rules" label-position="left" label-width="70px" style='width: 400px; margin-left:20px;'>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="username">
          <el-input v-model="temp.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="temp.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="身份证" prop="idcard">
          <el-input v-model="temp.idcard"></el-input>
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="temp.email"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="statuscode">
          <el-select class="filter-item" v-model="temp.statuscode" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item.value" :label="item.lebal" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('userForm')">确 定</el-button>
        <el-button v-else type="primary" @click="update('userForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogRoleVisible" width="500px">
      <div class="components-container">
        <div class="editor-container">
          <dnd-list :list1="curRoleList" :list2="allRoleList" list1Title="已有角色" list2Title="可选角色" v-loading="listLoading"></dnd-list>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">取 消</el-button>
        <el-button @click="saveRole()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
// import { userList, fetchPv } from '@/api/article'
import { userList } from '@/api/user'
import { roleList } from '@/api/role'
// import waves from '@/directive/waves/index.js' // 水波纹指令
import { parseTime } from '@/utils'
import DndList from '@/components/DndList'

const calendarTypeOptions = [
  { key: 'CN', display_name: '中国' },
  { key: 'US', display_name: '美国' },
  { key: 'JP', display_name: '日本' },
  { key: 'EU', display_name: '欧元区' }
]

// arr to obj
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'sysUser',
  // directives: {
  //   waves
  // },
  components: { DndList },
  computed: {
    tableHeight() {
      // console.log(this.$refs['filterForm'])
      console.log(this.$refs['userForm'])
      // - this.$refs['filterForm'].style.offsetHeight - this.$refs['pagination'].style.offsetHeight
      return this.$store.getters.mainHeight
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
      listQuery: {
        page: 1,
        limit: 20,
        status: undefined,
        phone: undefined
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
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入身份证号', trigger: 'change' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入Email', trigger: 'change' }
        ],
        statuscode: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      // importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      // sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
      // statusOptions: ['enable', 'disable'],
      statusOptions: [{
        value: 'enable',
        label: '启用'
      }, {
        value: 'disable',
        label: '停用'
      }],
      dialogRoleVisible: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加',
        role: '角色'
      },
      dialogPvVisible: false,
      pvData: [],
      showAuditor: false,
      tableKey: 0
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
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
    this.getRoleList()
  },
  methods: {
    getList() {
      this.listLoading = true
      userList(this.listQuery).then(response => {
        this.list = response.data.data.items
        this.total = response.data.data.total
        this.listLoading = false
      })
    },
    getRoleList() {
      if (this.allRoleList.length === 0) {
        this.listLoading = true
        roleList(this.listQuery).then(response => {
          var tempList = response.data.data.items
          for (var index in tempList) {
            this.allRoleList.push({ 'key': tempList[index].rid, 'label': tempList[index].rolename })
          }
          this.listLoading = false
        })
      }
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

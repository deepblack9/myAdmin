<template>
  <div class="app-container calendar-list-container">
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row style="width: 100%;" :style="{ height: tableHeight }">

      <!-- <el-table-column align="center" label='参数编码' width="60">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="参数名称" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-columnalign="center" label="单位" width="110px" >
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="参数值" width="110px">
        <template slot-scope="scope">
          <span>{{scope.row.password}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型" width="180px">
        <template slot-scope="scope">
          <span>{{scope.row.idcard}}</span>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <el-form class="small-space" ref="userForm" :model="temp" :rules="rules" label-position="left" label-width="70px" style='width: 400px; margin-left:20px;'>
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
    </div> -->
  </div>
</template>

<script>
import { userList } from '@/api/user'
import DndList from '@/components/DndList'

export default {
  name: 'sysUser',
  // directives: {
  //   waves
  // },
  components: { DndList },
  computed: {
    tableHeight() {
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
      dialogPvVisible: false,
      pvData: [],
      showAuditor: false,
      tableKey: 0
    }
  },
  created() {
    this.getList()
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
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
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClickTop" style="height:100%">
      <el-tab-pane label="预算工程" name="project">
        <project></project>
      </el-tab-pane>
      <el-tab-pane label="工程信息" name="projectInfo">
        <project-info></project-info>
      </el-tab-pane>
      <el-tab-pane label="工程说明" name="projectMemo">工程说明</el-tab-pane>
      <el-tab-pane label="费率与取费设置" name="feeSet">费率与取费设置</el-tab-pane>
      <el-tab-pane label="工程项目" name="items">工程项目</el-tab-pane>
      <el-tab-pane label="材料价格调整" name="revise">材料价格调整</el-tab-pane>
      <el-tab-pane label="取费表" name="fee">取费表</el-tab-pane>
      <el-tab-pane label="报表" name="report">报表</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Project from './Project'
import ProjectInfo from './ProjectInfo'

export default {
  components: { Project, ProjectInfo },
  data() {
    return {
      list: null,
      listLoading: true,

      activeName: 'project'
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClickTop(tab, event) {
      // console.log(tab, event)
    },
    fetchData() {
      // this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>

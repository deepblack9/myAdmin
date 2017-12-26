<template>
  <div class="components-container">
    <split-pane v-on:resize="resize" :min-percent='20' :default-percent='30' split="vertical">
      <template slot="paneL">
        <el-container style="height:100%">
          <el-header style="height:43px;padding:2px 1px">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
          </el-header>
          
          <el-main style="padding:1px">
            <el-tree
              style="width:100%"
              class="filter-tree"
              :data="data2"
              :props="defaultProps"
              :filter-node-method="filterNode"
              ref="tree2"
              :node-click="handleNodeClick">
            </el-tree>
          </el-main>
        </el-container>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <el-tabs v-model="activeNameTop" type="card" @tab-click="handleClickTop" style="height:100%">
              <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
              <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
              <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
            <!-- <div class="top-container"></div> -->
          </template>
          <template slot="paneR">
            <el-tabs v-model="activeNameBottom" type="card" @tab-click="handleClickBottom" style="height:100%">
              <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
              <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
              <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
            <!-- <div class="bottom-container"></div> -->
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

import splitPane from 'vue-splitpane'

export default {
  components: { splitPane },
  data() {
    return {
      list: null,
      listLoading: true,

      activeNameTop: 'second',
      activeNameBottom: 'second',

      filterText: '',
      data2: [{
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
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
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
    handleNodeClick(obj, node, el) {
      console.log("handleNodeClick")
    },
    handleClickTop(tab, event) {
      console.log(tab, event)
    },
    handleClickBottom(tab, event) {
      console.log(tab, event)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    fetchData() {
      // this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style  scoped>
  .components-container {
    position: relative;
    /*height: 90vh;*/
    height: 100%;
  }

  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
</style>
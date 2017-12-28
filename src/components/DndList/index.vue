<template>
  <div class="dndList">
    <div class="dndList-list" :style="{width:width1}">
      <h3>{{list1Title}}</h3>
      <draggable :list="list1" class="dragArea" :options="{group:'article'}">
        <div class="list-complete-item" v-for="element in list1" :key='element.key'>
          <div class="list-complete-item-handle">{{element.label}}</div>
          <div style="position:absolute;right:0px;">
            <span style="float: right ;margin-top: -23px;margin-right:5px;" @click="deleteEle(element)">
              <i style="color:#ff4949" class="el-icon-delete"></i>
            </span>
          </div>
        </div>
      </draggable>
    </div>
    <div class="dndList-list" :style="{width:width2}">
      <h3>{{list2Title}}</h3>
      <draggable :list="filterList2" class="dragArea" :options="{group:'article'}">
        <div class="list-complete-item" v-for="element in filterList2" :key='element.key'>
          <div class='list-complete-item-handle2' @click="pushEle(element)">{{element.label}}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DndList',
  components: { draggable },
  computed: {
    filterList2() {
      return this.list2.filter(v => {
        // console.log(v)
        if (this.isNotInList1(v)) {
          return v
        }
        return false
      })
    }
  },
  props: {
    list1: {
      type: Array,
      default() {
        return []
      }
    },
    list2: {
      type: Array,
      default() {
        return []
      }
    },
    list1Title: {
      type: String,
      default: 'list1'
    },
    list2Title: {
      type: String,
      default: 'list2'
    },
    width1: {
      type: String,
      default: '48%'
    },
    width2: {
      type: String,
      default: '48%'
    }
  },
  methods: {
    isNotInList1(v) {
      return this.list1.every(k => v.key !== k.key)
    },
    isNotInList2(v) {
      return this.list2.every(k => v.key !== k.key)
    },
    deleteEle(ele) {
      for (const item of this.list1) {
        if (item.key === ele.key) {
          const index = this.list1.indexOf(item)
          this.list1.splice(index, 1)
          break
        }
      }
      if (this.isNotInList2(ele)) {
        this.list2.unshift(ele)
      }
    },
    pushEle(ele) {
      this.list1.push(ele)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 5px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .dndList-list {
    float: left;
    padding-bottom: 5px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      scroll: auto;
      margin-top: 5px;
      min-height: 50px;
      padding-bottom: 5px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 0px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4AB7BD;
}

.list-complete-item.sortable-ghost {
  background: #30B08F;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>

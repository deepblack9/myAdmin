<template>
  <div id="app" :style="{ width: width + 'px', height: height + 'px' }">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  },
  mounted() {
    // 这里是给到了一个默认值 （这个很重要）
    this.$store.dispatch('updateClientSize', { clientWidth: document.documentElement.clientWidth, clientHeight: document.documentElement.clientHeight })
    // 然后监听window的resize事件
    const that = this
    window.onresize = function temp() {
      that.width = document.documentElement.clientWidth
      that.height = document.documentElement.clientHeight
      that.$store.dispatch('updateClientSize', { clientWidth: document.documentElement.clientWidth, clientHeight: document.documentElement.clientHeight })
    }
  }
}
</script>

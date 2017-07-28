<template>
  <div id="app">
    <tab>
      <tab-item selected @on-item-click="onItemClick">出租车</tab-item>
      <tab-item @on-item-click="onItemClick">代驾</tab-item>
      <tab-item @on-item-click="onItemClick">公交</tab-item>
      <tab-item @on-item-click="onItemClick">快车</tab-item>
    </tab>
    <div class="main_w">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'

let vm = null

export default {
  name: 'ddmain',
  data () {
    return {
      currentView: 'taxi'
    }
  },
  methods: {
    onItemClick (index) {

      console.log('on item click:', index)

      if (index === 0) {
        vm.currentView = 'taxi'
      } else if (index === 1) {
        vm.currentView = 'daijia'
      } else if (index === 2) {
        vm.currentView = 'gongjiao'
      }
    },
  },
  created() {
    vm = this

  },
  components: {
    Tab,
    TabItem
  }
}
</script>

<style scoped>

</style>

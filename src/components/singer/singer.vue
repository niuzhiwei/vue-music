<template>
  <div class="singer">
    <list-view :data='singers'></list-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import ListView from 'base/listview/listview'
export default {
  components: { ListView },
  data() {
    return {
      singers: []
    }
  },
  mounted() {
    this._getSingerList()
  },
  methods: {
    async _getSingerList() {
      const res = await getSingerList()
      this.singers = res.singers
    }
  }
}
</script>
<style lang='stylus' scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0px;
  width: 100%;
}
</style>

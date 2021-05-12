<template>
  <div class="singer">
    <list-view
      :data='singers'
      @select="selectSinger"
    ></list-view>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'
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
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    async _getSingerList() {
      const res = await getSingerList()
      this.singers = res.singers
    },
    selectSinger(item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
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

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>

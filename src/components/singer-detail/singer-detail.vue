<template>
  <music-list
    :songs="songs"
    :title="title"
    :bgImage="bgImage"
  ></music-list>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import MusicList from 'components/music-list/music-list'
export default {
  components: { MusicList },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.pic
    }
  },
  created() {
    this._getDetail()
  },
  methods: {
    async _getDetail() {
      if (!this.singer.mid) {
        this.$router.push('/singer')
      }
      const res = await getSingerDetail(this.singer)
      this.songs = res.songs
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';
</style>

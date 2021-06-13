<template>
  <div class="song-list">
    <ul>
      <li
        class="item"
        v-for="(song,index) in songs"
        :key="song.id"
        @click="selectItem(song,index)"
      >
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">
            {{getDesc(song)}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    selectItem(item, index) {
      this.$emit('select', item, index)
    },
    getDesc(song) {
      return `${song.singer}-${song.album}`
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;

    .content {
      flex: 1;
      lien-height: 20px;
      overflow: hidden;

      .name {
        no-wrap();
        color: $color-text;
      }

      .desc {
        no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>

<template>
  <div class="recommend">
    <scroll
      ref="scroll"
      class="recommend-content"
      :data='albums'
    >
      <div>
        <div
          v-if="sliders.length"
          class="slider-wrapper"
        >
          <slider>
            <div
              v-for="item in sliders"
              :key='item.id'
            >
              <a :href="item.link">
                <img
                  @load="loadImage"
                  :src="item.pic"
                >
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">
            热门歌单推荐
          </h1>
          <ul>
            <li
              class="item"
              v-for="item in albums"
              :key="item.id"
            >
              <div class="icon">
                <img
                  width="60"
                  height="60"
                  v-lazy="item.pic"
                >
              </div>
              <div class="text">
                <h2
                  class="name"
                  v-html="item.username"
                ></h2>
                <p
                  class="desc"
                  v-html="item.title"
                ></p>
              </div>
            </li>
          </ul>
          <div
            class="loading-container"
            v-show="!albums.length"
          >
            <loading></loading>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getRecommend } from 'api/recommend'
export default {
  data() {
    return {
      sliders: [],
      albums: []
    }
  },
  components: { Slider, Scroll, Loading },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        this.sliders = res?.sliders
        this.albums = res?.albums
      })
    },
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

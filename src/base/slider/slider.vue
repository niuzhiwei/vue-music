<template>
  <div
    class="slider"
    ref="slider"
  >
    <div
      class="slider-group"
      ref="sliderGroup"
    >
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item,index) in dots"
        :key="index"
        :class="{active:currentPageIndex===index}"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { addClass } from 'common/js/dom'
BScroll.use(Slide)
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
    })
    window.addEventListener('resize', () => {
      if (!this.slider) return
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      const sliderWidth = this.$refs.slider.clientWidth
      let width = 0 // eslint-disable-line no-unused-vars
      for (let i = 0; i < this.children.length; i++) {
        width += sliderWidth
        const child = this.children[i]
        child && addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {
          loop: this.loop,
          threshold: 0.3,
          autoplay: false
        },
        useTransition: true,
        bounce: false,
        stopPropagation: true,
        probeType: 2,
        click: true
      })
      if (this.autoPlay) {
        this.autoGoNext()
      }
      this.slider.on('scrollEnd', () => {
        // 检测如果滚动就触发回调函数
        if (this.autoPlay) {
          this.autoGoNext()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        clearTimeout(this.playTimer)
      })
      this.slider.on('slideWillChange', (page) => {
        this.currentPageIndex = page.pageX
      })
    },
    nextPage() {
      this.slider.next()
    },
    autoGoNext() {
      clearTimeout(this.playTimer)
      this.playTimer = setTimeout(() => {
        this.nextPage()
      }, this.interval)
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    }
  },
  activated() {
    this.slider.enable()
    this.slider.refresh()
  },
  deactivated() {
    this.slider.disable()
  },
  destroyed() {
    clearTimeout(this.playTimer)
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>

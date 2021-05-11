<template>
  <div class="tab">
    <router-link
      to='/recommend'
      custom
      v-slot="{ navigate,isActive }"
    >
      <div
        class="tab-item"
        :class="[isActive && 'router-link-active']"
      >
        <span
          class="tab-link"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
        >推荐</span>
      </div>
    </router-link>

    <router-link
      to='/singer'
      custom
      v-slot="{ navigate,isActive }"
    >
      <div
        class="tab-item"
        :class="[isActive && 'router-link-active']"
      >
        <span
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
          class="tab-link"
        >歌手</span>
      </div>
    </router-link>
    <router-link
      to='/rank'
      custom
      v-slot="{ navigate,isActive }"
    >
      <div
        class="tab-item"
        :class="[isActive && 'router-link-active']"
      >
        <span
          class="tab-link"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
        >排行</span>
      </div>
    </router-link>
    <router-link
      to='/search'
      custom
      v-slot="{ navigate,isActive }"
    >
      <div
        class="tab-item"
        :class="[isActive && 'router-link-active']"
      >
        <span
          class="tab-link"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
        >搜索</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable';

.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;

  .tab-item {
    flex: 1;
    text-align: center;

    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }

    &.router-link-active {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>

<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
export default {
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout ?? 'empty';
      return `${layout}-layout`;
    },
  },
};
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import 'assets/normolize.css';
@import "assets/index.css";
</style>

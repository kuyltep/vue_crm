<template>
  <div class="app-main-layout">

    <navbar @clickOnBtn="isOpen = !isOpen"></navbar>
    <sidebar :value="isOpen"></sidebar>

    <main :class="{ full: !isOpen }" class="app-content">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue'
export default {
  data() {
    return {
      isOpen: true,
    }
  },
  components: {
    Navbar, Sidebar
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  }
}
</script>

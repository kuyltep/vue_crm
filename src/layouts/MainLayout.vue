<template>
  <div>
    <loader v-if="lodaing"></loader>
    <div v-else class="app-main-layout">

      <navbar @clickOnBtn="isOpen = !isOpen"></navbar>
      <sidebar :value="isOpen" :key="locale"></sidebar>

      <main :class="{ full: !isOpen }" class="app-content">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link to="/record" class="btn-floating btn-large blue" href="#" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>

  </div>
</template>
<script>
import Navbar from '@/components/app/Navbar.vue';
import Sidebar from '@/components/app/Sidebar.vue'
import Loader from '@/components/app/Loader.vue';
export default {
  data() {
    return {
      isOpen: true,
      lodaing: true,
    }
  },
  components: {
    Navbar, Sidebar,
    Loader
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.lodaing = false;
  },
  computed: {
    locale() {
      return this.$store.getters.info.locale;
    }
  }
}
</script>

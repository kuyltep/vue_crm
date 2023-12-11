<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons" @click="refresh">refresh</i>
      </button>
    </div>
    <loader v-if="loading"></loader>
    <div v-else class="row">
      <home-bill :rates="currency.rates"></home-bill>
      <home-currency :rates="currency.rates" :date="currency.date"></home-currency>
    </div>
  </div>
</template>

<script>

import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
export default {
  data() {
    return {
      loading: true,
      currency: null,
    }
  },
  name: 'home',
  components: {
    HomeBill, HomeCurrency,
  },
  async mounted() {
    const currency = await this.$store.dispatch('fetchCurrency');
    this.currency = currency;
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      const currency = await this.$store.dispatch('fetchCurrency');
      this.currency = currency;
      this.loading = false
    }
  }
}
</script>
<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ localeFilter('Home_Account-in-currency') }}</span>

        <p class="currency-line" v-for="cur of currencies" :key="cur">
          <span>{{ getCurrency(cur) }}{{ currencyFilter(cur)
          }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import localeFilter from '@/filters/locale.filter';
export default {
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR']
    }
  },

  props: ['rates'],
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates["EUR"]);
    },


  },
  methods: {
    localeFilter,
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
    currencyFilter(cur) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency', currency: cur
      }).format(cur).slice(8)
    }
  }
}
</script>
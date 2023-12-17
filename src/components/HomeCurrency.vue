<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ localeFilter("Home_Currency-rates") }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ localeFilter('Home_Currency') }}</th>
              <th>{{ localeFilter('Home_Rate') }}</th>
              <th>{{ localeFilter('Home_Date') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{ currencyFilter(cur) }}</td>
              <td>{{ rates[cur].toFixed(2) }}</td>
              <td>{{ date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import localeFilter from '@/filters/locale.filter';
export default {
  props: ['rates', 'date'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    }
  },
  methods: {
    localeFilter,
    currencyFilter(cur) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency', currency: cur
      }).format(cur).slice(8)
    }

  }
}
</script>
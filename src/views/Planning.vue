<template>
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('Planning_Planning') }}</h3>
      <h4>{{ formatCurrency(bill) }}</h4>
    </div>
    <loader v-if="loading"></loader>
    <p class="center" v-else-if="!categories.length">{{ localeFilter('No-categories') }} <router-link to="/categories">{{
      localeFilter('Add-new-category') }}</router-link></p>
    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ formatCurrency(category.spend) }} {{ localeFilter('Planning_Of') }} {{ formatCurrency(category.limit) }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div :class="[category.progressColor]" class="determinate" :style="{ width: category.progressPercent + '%' }">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import localeFilter from '@/filters/locale.filter';
import { mapGetters } from 'vuex';
export default {
  name: 'planning',
  data() {
    return {
      bill: null,
      loading: true,
      categories: [],
    }
  },
  computed: {
    ...mapGetters(['info']),

  },
  methods: {
    localeFilter,
    formatCurrency(currency) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(currency);
    }
  },
  async mounted() {
    this.bill = this.info.bill;
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories');
    this.categories = categories.map(cat => {
      const spend = records.filter(record => record.categoryId === cat.id).filter(record => record.type === 'outcome').reduce((total, record) => {
        return total += +record.amount;
      }, 0);
      const percent = spend / cat.limit * 100;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = progressPercent < 60 ? 'green' : progressPercent < 100 ? 'yellow' : 'red';

      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue > 0 ? `${localeFilter('Planning_Left')}` : `${localeFilter('Plannig_Excess')}`} ${this.formatCurrency(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false;
  }
}
</script>
<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ formatCurrency(bill) }}</h4>
    </div>
    <loader v-if="loading"></loader>
    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую
        категорию</router-link></p>
    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ formatCurrency(category.spend) }} из {{ formatCurrency(category.limit) }}
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
      const tooltip = `${tooltipValue > 0 ? 'Осталось' : 'Превышение на'} ${this.formatCurrency(Math.abs(tooltipValue))}`

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
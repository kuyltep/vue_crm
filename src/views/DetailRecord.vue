<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'outcome' ? 'Расход' : 'Доход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div :class="[record.type === 'outcome' ? 'red' : 'green']" class="card">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount + " " + currencyFilter('RUB') }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ dateFilter(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Запись с id={{ $route.params.id }} не найдена</p>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
export default {
  name: 'detail',
  data() {
    return {
      record: null,
      loading: true,
    }
  },
  methods: {

    dateFilter(date) {
      return date.slice(0, 10) + " " + date.slice(11, 19)
    },
    currencyFilter(cur) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency', currency: cur
      }).format(cur).slice(8)
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);
    this.record = {
      ...record,
      categoryName: category.title,
    }
    this.loading = false;
  },

}
</script>
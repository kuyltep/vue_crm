<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <loader v-if="loading"></loader>
    <p class="center" v-else-if="!records.length">Пока что нет записей. <router-link to="/record">Добавить новую
        запись</router-link></p>
    <section v-else>
      <history-table :records="records"></history-table>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
export default {
  name: 'history',
  data() {
    return {
      records: [],
      categories: [],
      loading: true,
    }
  },
  async mounted() {
    // this.records = this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories') || [];
    const records = await this.$store.dispatch('fetchRecords') || [];
    this.records = records.map((record, index) => {
      return {
        ...record,
        index: index + 1,
        categoryName: this.categories.find(category => category.id === record.categoryId).title,
        typeText: record.type === 'outcome' ? 'Расход' : 'Доход',
        typeClass: record.type === 'outcome' ? 'red' : 'green',
      }
    })
    this.loading = false;
  },
  components: {
    HistoryTable
  }
}
</script>
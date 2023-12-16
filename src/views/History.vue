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
      <history-table :records="items"></history-table>
      <paginate v-model="page" :page-count="pageCounter" :click-handler="pageChangeHandler" :prev-text="'Назад'"
        :next-text="'Вперед'" :page-class="'waves-effect'" :margin-pages="2" :container-class="'pagination'">
      </paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import paginationMixin from '@/mixins/mixin.pagination';
export default {
  name: 'history',
  mixins: [paginationMixin],
  data() {
    return {
      records: [],
      loading: true,
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords') || [];
    const categories = await this.$store.dispatch('fetchCategories') || [];
    this.setupPagination(this.records.map((record, index) => {
      return {
        ...record,
        index: index + 1,
        categoryName: categories.find(category => category.id === record.categoryId).title,
        typeText: record.type === 'outcome' ? 'Расход' : 'Доход',
        typeClass: record.type === 'outcome' ? 'red' : 'green',
      }
    }));
    this.loading = false;
  },
  components: {
    HistoryTable
  }
}
</script>
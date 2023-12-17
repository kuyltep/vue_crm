<template>
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('History_History-of-records') }}</h3>
    </div>

    <div class="history-chart" style="height: 400px;">
      <canvas ref="canvas"></canvas>
    </div>

    <loader v-if="loading"></loader>
    <p class="center" v-else-if="!records.length">Пока что нет записей. <router-link to="/record">Добавить новую
        запись</router-link></p>
    <section v-else>
      <history-table :records="items"></history-table>
      <paginate v-model="page" :page-count="pageCounter" :click-handler="pageChangeHandler" :prev-text="`${backText}`"
        :next-text="`${nextText}`" :page-class="'waves-effect'" :margin-pages="2" :container-class="'pagination'">
      </paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import paginationMixin from '@/mixins/mixin.pagination';
import Chart from 'chart.js/auto';
import category from '@/store/category';
import localeFilter from '@/filters/locale.filter';
export default {
  name: 'history',
  mixins: [paginationMixin],
  data() {
    return {
      records: [],
      categories: [],
      loading: true,
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords') || [];
    this.categories = await this.$store.dispatch('fetchCategories') || [];
    this.setup();
    this.loading = false;
  },
  methods: {
    localeFilter,
    setup() {
      this.setupPagination(this.records.map((record, index) => {
        return {
          ...record,
          index: index + 1,
          categoryName: this.categories.find(category => category.id === record.categoryId).title,
          typeText: record.type === 'outcome' ? 'Расход' : 'Доход',
          typeClass: record.type === 'outcome' ? 'red' : 'green',
        }
      }));

      new Chart(this.$refs.canvas, {
        type: 'pie',
        data: {
          labels: [...this.categories].map(category => category.title),
          datasets: [{
            label: "Расходы по категориям",
            data: [...this.categories].map(category => {
              return this.records.reduce((acc, record) => {
                return record.categoryId === category.id && record.type === 'outcome' ? acc + record.amount : acc;
              }, 0)
            }),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  },
  computed: {
    nextText() {
      return localeFilter('History_Next-text');
    },
    backText() {
      return localeFilter('History_Back-text');
    }
  },
  components: {
    HistoryTable
  }
}
</script>
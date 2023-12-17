<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ localeFilter('History_Sum') }}</th>
        <th>{{ localeFilter('History_Date') }}</th>
        <th>{{ localeFilter('History_Category') }}</th>
        <th>{{ localeFilter('History_Type') }}</th>
        <th>{{ localeFilter('History_Open') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="record in records" :key="record.id">
        <td>{{ record.index }}</td>
        <td>{{ record.amount }} {{ currencyFilter('RUB') }}</td>
        <td>{{ dateFilter(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{ record.typeText }}</span>
        </td>
        <td>
          <button class="btn-small btn" v-tooltip="'Посмотерть запись'"
            @click="$router.push(`/detail-record/${record.id}`)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localeFilter from '@/filters/locale.filter';
export default {
  props: {
    records: {
      type: Array,
      required: true,
    }
  },
  methods: {
    localeFilter,
    currencyFilter(cur) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency', currency: cur
      }).format(cur).slice(8)
    },
    dateFilter(date) {
      return date.slice(0, 10) + " " + date.slice(11, 19)
    }
  }
}
</script>
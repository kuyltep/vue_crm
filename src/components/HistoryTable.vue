<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
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
export default {
  props: {
    records: {
      type: Array,
      required: true,
    }
  },
  methods: {
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
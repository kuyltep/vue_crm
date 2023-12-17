<template>
  <ul :class="{
    open: value,
  }" class="sidenav app-sidenav">
    <li v-for="link in links" :key="link.url">
      <router-link active-class="active" :to="link.url" :exact="link.exact" href="#"
        class="waves-effect waves-orange pointer">{{ link.title }}</router-link>
    </li>
    <!-- <router-link tag="li" active-class="active" to="" exact>
      <a href="#" class="waves-effect waves-orange pointer">Счет</a>
    </router-link> -->

  </ul>
</template>

<script>
import localeFilter from '@/filters/locale.filter';
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: localeFilter('Menu_Account'), url: '/', exact: true },
      { title: localeFilter('Menu_History'), url: '/history' },
      { title: localeFilter('Menu_Planning'), url: '/planning' },
      { title: localeFilter('Menu_New-record'), url: '/record' },
      { title: localeFilter('Menu_Categories'), url: '/categories' },

    ]
  }),
  computed: {
  },
  methods: {
    localeFilter,
  }
}
</script>
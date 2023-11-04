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
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/', exact: true },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' },

    ]
  }),
}
</script>
<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading"></loader>
      <div class="row" v-else>
        <category-create @created="addNewCategory"></category-create>
        <category-edit v-if="categories.length" @updated="updateCategories" :key="categories.length + updateCount"
          :categories="categories"></category-edit>
        <p v-else class="{center}">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import Loader from '@/components/app/Loader.vue';
export default {
  name: 'categories',
  components: {
    CategoryCreate, CategoryEdit,
    Loader,
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const index = this.categories.findIndex(cat => cat.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateCount++;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  }
}
</script>


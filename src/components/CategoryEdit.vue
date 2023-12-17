<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localeFilter("Category-Edit_Edit-title") }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
          </select>
          <label>{{ localeFilter("Category-Edit_Select-category") }}</label>
        </div>

        <div class="input-field">
          <input :class="{ error: v$.title.$dirty && v$.title.$invalid }" type="text" id="name" v-model="title" />
          <label for="name">{{ localeFilter('Category-Edit_Title') }}</label>
          <span class="helper-text invalid" v-if="v$.title.$dirty && v$.title.$invalid">{{
            localeFilter('Category-Edit_Title-error') }}</span>
        </div>

        <div class="input-field">
          <input :class="{ error: v$.limit.$dirty && v$.limit.minValue.$invalid }" id="limit" type="number"
            v-model="limit" />
          <label for="limit">{{ localeFilter('Category-Edit_Limit') }}</label>
          <span v-if="v$.limit.$dirty && v$.limit.minValue.$invalid" class="helper-text invalid">{{
            localeFilter('Category-Edit_Limit-error') }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ localeFilter("Category-Edit_Update") }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import localeFilter from '@/filters/locale.filter';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null,
    }
  },
  methods: {
    localeFilter,
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        }
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория успешно обновлена');
        this.$emit('updated', categoryData);
      } catch (error) {

      }
    }
  },

  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(category => category.id === catId)
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const { title, limit, id } = this.categories[0];
    this.title = title;
    this.limit = limit;
    this.current = id;
  },
  validations() {
    return {
      title: { required },
      limit: { required, minValue: minValue(100) }
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>
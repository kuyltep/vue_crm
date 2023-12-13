<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input :class="{ error: v$.title.$dirty && v$.title.$invalid }" type="text" id="name" v-model="title" />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="v$.title.$dirty && v$.title.$invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input :class="{ error: v$.limit.$dirty && v$.limit.minValue.$invalid }" id="limit" type="number"
            v-model="limit" />
          <label for="limit">Лимит</label>
          <span v-if="v$.limit.$dirty && v$.limit.minValue.$invalid" class="helper-text invalid">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
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
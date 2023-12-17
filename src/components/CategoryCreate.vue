<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localeFilter('Category-Create_Title') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input v-model.trim="title" :class="{ invalid: v$.title.$dirty && v$.title.required.$invalid }" id="name"
            type="text" />
          <label for="name">{{ localeFilter('Category-Create_Name') }}</label>
          <span v-if="v$.title.$dirty && v$.title.required.$invalid" class="helper-text invalid">{{
            localeFilter("Category-Create_Name-error") }}</span>
        </div>

        <div class="input-field">
          <input v-model.number="limit" :class="{ invalid: v$.limit.$dirty && v$.limit.minValue.$invalid }" id="limit"
            type="number" />
          <label for="limit">{{ localeFilter("Category-Create_Limit") }}</label>
          <span v-if="v$.limit.$dirty && v$.limit.minValue.$invalid" class="helper-text invalid">{{
            localeFilter("Category-Create_Limit-error") }} {{ v$.limit.minValue.$params.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ localeFilter('Category-Create_Create-btn') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import localeFilter from '@/filters/locale.filter'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      title: '',
      limit: 100,
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
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        })
        this.title = '';
        this.limit = 100;
        this.v$.$reset();
        this.$message('Категория была создана');
        this.$emit('created', category);
      } catch (error) {
      }

    }
  },
  validations() {
    return {
      title: { required },
      limit: { required, minValue: minValue(100) },
    }
  },
  mounted() {
    M.updateTextFields();
  }
}
</script>
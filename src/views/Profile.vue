<template>
  <metainfo></metainfo>
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('Profile-title') }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input :class="{ invalid: v$.name.$dirty && v$.name.required.$invalid }" v-model="name" id="description"
          type="text">
        <label for="description">{{ localeFilter('Name') }}</label>
        <span v-if="v$.name.$dirty && v$.name.required.$invalid" class="helper-text invalid">{{ localeFilter('Name-input')
        }}</span>
      </div>
      <div class="switch">
        <label>
          Engilsh
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Russian
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ localeFilter('Update') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapGetters, mapActions } from 'vuex';
import localeFilter from '@/filters/locale.filter';
export default {
  name: 'Profile',
  setup() {

    return { v$: useVuelidate() };


  },
  data() {
    return {
      name: '',
      isRuLocale: true,
    }
  },

  mounted() {
    this.isRuLocale = this.info.locale === 'ru-RU';
    this.name = this.info.name;
    setTimeout(() => M.updateTextFields(), 0);
  },
  computed: {
    ...mapGetters(['info']),

  },
  methods: {
    ...mapActions(['updateInfo']),
    localeFilter,
    async submitHandler() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
      } catch (error) {

      }
      // if (this.v$.$invalid) {
      //   this.v$.$touch();
      //   return;
      // }

    }
  },
  validations() {
    return {
      name: { required },
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
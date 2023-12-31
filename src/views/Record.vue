<template>
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('Record_New-record') }}</h3>
    </div>
    <loader v-if="loading"></loader>
    <p class="center" v-else-if="!categories.length">{{ localeFilter('No-categories') }}<router-link to="/categories">{{
      localeFilter('Add-new-category') }}</router-link></p>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
        </select>
        <label>{{ localeFilter('Record_Input-category') }}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{ localeFilter("Record_Income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{ localeFilter('Record_Outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input :class="{ invalid: v$.amount.$dirty && v$.amount.minValue.$invalid }" id="amount" type="number"
          v-model.number="amount">
        <label for="amount">{{ localeFilter('Record_Sum') }}</label>
        <span v-if="v$.amount.$dirty && v$.amount.minValue.$invalid" class="helper-text invalid">{{
          localeFilter('Record_Sum-error') }}</span>
      </div>

      <div class="input-field">
        <input :class="{ invalid: v$.description.$dirty && v$.description.required.$invalid }" id="description"
          type="text" v-model="description">
        <label for="description">{{ localeFilter('Record_Description') }}</label>
        <span v-if="v$.description.$dirty && v$.description.required.$invalid" class="helper-text invalid">{{
          localeFilter('Record_Description-error') }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ localeFilter('Record_Create') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import localeFilter from '@/filters/locale.filter';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import Loader from '@/components/app/Loader.vue';
import { mapGetters } from 'vuex';
export default {
  components: { Loader },
  name: 'record',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      loading: true,
      categories: [],
      category: null,
      select: null,
      type: 'outcome',
      amount: 1,
      description: '',
    };
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    }
  },
  methods: {
    localeFilter,
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount;
          console.log(bill);
          await this.$store.dispatch('updateInfo', { bill });
          this.$message('Запись успешно создана');
          this.amount = 1;
          this.description = '';
          this.v$.$reset();
        } catch (error) {
        }

      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
      }
    }
  },
  validations() {
    return {
      amount: { required, minValue: minValue(1) },
      description: { required },
    }
  },

  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    this.loading = false;
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);

  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>
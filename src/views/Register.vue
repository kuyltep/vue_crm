<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ localeFilter('Home-Accounting_Title') }}</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="email"
          :class="{ invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid) }">
        <label for="email">{{ localeFilter('Home-Accounting_Email') }}</label>
        <small v-if="v$.email.$dirty && v$.email.email.$invalid" class="helper-text invalid">Please input correct
          email</small>
        <small v-else-if="v$.email.$dirty && v$.email.required.$invalid" class="helper-text invalid">Please input
          email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model.trim="password"
          :class="{ invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid) }">
        <label for="password">{{ localeFilter('Home-Accounting_Password') }}</label>
        <small v-if="v$.password.$dirty && v$.password.minLength.$invalid" class="helper-text invalid">Password length
          must be more {{ v$.password.minLength.$params.min }}. Now he is {{
            password.length }}</small>
        <small v-else-if="v$.password.$dirty && v$.password.required.$invalid" class="helper-text invalid">Please input
          your password</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model.trim="name"
          :class="{ invalid: v$.name.$dirty && v$.name.required.$invalid }">
        <label for="name">{{ localeFilter('Home-Accounting_Name') }}</label>
        <small v-if="v$.name.$dirty && v$.name.required.$invalid" class="helper-text invalid">Inpur your name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{ localeFilter('Home-Accounting_Agree') }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ localeFilter('Home-Accounting_Register') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ localeFilter('Home-Accounting_Have-account') }}
        <router-link to="/login">{{ localeFilter('Home-Accounting_Sing-in') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import localeFilter from "@/filters/locale.filter";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: 'register',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: '',
    }
  },
  methods: {
    localeFilter,
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {

      }
    }
  },
  validations() {
    return {
      email: { email, required, },
      password: { required, minLength: minLength(6), },
      name: { required },
      agree: { checked: v => v },
    }
  }
}
</script>
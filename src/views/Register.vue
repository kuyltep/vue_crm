<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="email"
          :class="{ invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid) }">
        <label for="email">Email</label>
        <small v-if="v$.email.$dirty && v$.email.email.$invalid" class="helper-text invalid">Please input correct
          email</small>
        <small v-else-if="v$.email.$dirty && v$.email.required.$invalid" class="helper-text invalid">Please input
          email</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model.trim="password"
          :class="{ invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid) }">
        <label for="password">Пароль</label>
        <small v-if="v$.password.$dirty && v$.password.minLength.$invalid" class="helper-text invalid">Password length
          must be more {{ v$.password.minLength.$params.min }}. Now he is {{
            password.length }}</small>
        <small v-else-if="v$.password.$dirty && v$.password.required.$invalid" class="helper-text invalid">Please input
          your password</small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model.trim="name"
          :class="{ invalid: v$.name.$dirty && v$.name.required.$invalid }">
        <label for="name">Имя</label>
        <small v-if="v$.name.$dirty && v$.name.required.$invalid" class="helper-text invalid">Inpur your name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
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
    submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const fordData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      this.$router.push('/')
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
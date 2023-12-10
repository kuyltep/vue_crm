<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input v-model.trim="email"
          :class="{ invalid: (v$.email.$dirty && v$.email.email.$invalid) || (v$.email.$dirty && v$.email.required.$invalid) }"
          id="email" type="text" name="email" />
        <label for="email">Email</label>
        <small v-if="v$.email.$dirty && v$.email.email.$invalid" class="helper-text invalid">Please input correct
          email</small>
        <small v-else-if="v$.email.$dirty && v$.email.required.$invalid" class="helper-text invalid">Please input
          email</small>



      </div>
      <div class="input-field">
        <input v-model.trim="password"
          :class="{ invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid) }"
          id="password" type="password" name="password" />
        <label for="password">Пароль</label>
        <small v-if="v$.password.$dirty && v$.password.minLength.$invalid" class="helper-text invalid">Password length
          must be more {{ v$.password.minLength.$params.min }}. Now he is {{
            password.length }}</small>
        <small v-else-if="v$.password.$dirty && v$.password.required.$invalid" class="helper-text invalid">Please input
          your password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти<i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import messages from '@/utils/messages';
export default {
  name: 'login',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
      }

    }
  },
  validations() {
    return {
      email: { email, required, },
      password: { required, minLength: minLength(6), }
    }

  },
  mounted() {
    if (messages[this.$route.query.message]) {

      this.$message(messages[this.$route.query.message]);
    }
  }
}
</script>


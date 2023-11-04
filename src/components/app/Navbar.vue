<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#">
          <i @click.prevent="$emit('clickOnBtn')" class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFormat }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
    }
  },
  methods: {
    logout() {
      this.$router.push('/login?message=logout')
    }
  },
  mounted() {
    this.interval = setInterval(() => { this.date = new Date() }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  computed: {
    dateFormat() {
      const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }
      return new Intl.DateTimeFormat('ru-RU', options).format(this.date);
    }
  }
}
</script>
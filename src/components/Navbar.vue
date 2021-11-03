<template>
  <div id="navbar">
    <b-navbar type="light" variant="light" fixed="top">

      <b-navbar-brand class="px-2">
        <b>Upman</b>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto px-2">
        <b-button variant="outline-danger" @click="performLogout" :disabled="disabled" v-if="$store.state.loggedIn">
          Logout
        </b-button>
        <b-button variant="outline-success" :to="{name: 'Login'}" :disabled="disabled" v-else>Login</b-button>
      </b-navbar-nav>

    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    performLogout() {
      this.$api.unsetApiKey()
      this.$store.dispatch("unsetLoggedIn").then(() => this.$router.push({name: 'Login'})).catch()
    }
  }
}
</script>

<style scoped>

</style>
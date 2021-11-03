<template>
  <b-overlay :show="pending" rounded="sm">
    <b-card
        title="Login"
        :border-variant="loginFail? 'danger' : ''"
    >
      <b-form @submit.prevent="performLogin" @input="formChanged" class="my-3">

        <b-form-group
            id="input-group-apikey"
            label="Api key:"
            label-for="input-apikey"
            class="my-3"
        >
          <b-form-input
              id="input-apikey"
              v-model="form.key"
              required
              placeholder=""
              autocomplete="off"
              type="password"
          />
        </b-form-group>

        <div class="text-right">
          <b-button type="submit" variant="primary">Login</b-button>
        </div>
      </b-form>

    </b-card>
  </b-overlay>
</template>

<script>
export default {
  name: "LoginBox",
  data() {
    return {
      form: {
        key: ""
      },
      pending: false,
      loginFail: false
    }
  },
  methods: {
    performLogin() {
      this.pending = true;
      this.$api.tryAndSetApiKey(this.form.key).then((reporters) => {

        this.$showToast("Login successful", "success", false)

        const updateReporters = this.$store.dispatch('updateReporters', reporters)
        const setLoggedIn = this.$store.dispatch('setLoggedIn')

        Promise.all([updateReporters, setLoggedIn]).then(() => {
          this.$router.push({name: "Dashboard"})
        })

      }).catch(({text}) => {
        this.$showToast(text)
        this.loginFail = true
        this.pending = false
      })
    },

    formChanged() {
      this.loginFail = false
    }
  }
}
</script>
<template>
  <b-overlay :show="pending" rounded="sm">
    <b-card
        title="Login"
        tag="login"
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
    },
    formChanged() {
      this.loginFail = false;
    }
  }
}
</script>
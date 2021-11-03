<template>
  <b-row class="justify-content-md-center">
    <b-col sm="12" md="6" xl="4" class="py-4">
      <login-box/>
    </b-col>
  </b-row>
</template>

<script>
import LoginBox from "@/components/LoginBox";

export default {
  name: "Login",
  components: {
    LoginBox
  }
}
</script>

<style scoped>

</style>
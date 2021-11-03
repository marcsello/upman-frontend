<template>
  <div id="app">

    <navbar :disabled="!$store.state.appReady"/>

    <div id="content">
      <b-container v-if="$store.state.appReady">
        <router-view/>
      </b-container>
      <full-screen-loader v-else/>
    </div>

    <div id="footer">
      <b-container>
        <footer-content/>
      </b-container>
    </div>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import FooterContent from "@/components/FooterContent";
import FullScreenLoader from "@/components/FullScreenLoader";

export default {
  components: {
    FooterContent,
    Navbar,
    FullScreenLoader
  },
  created() {
    if (this.$api.haveApiKey) {

      this.$api.listReporters().then((reporters) => {

        const updateReporters = this.$store.dispatch('updateReporters', reporters)
        const setLoggedIn = this.$store.dispatch('setLoggedIn')

        Promise.all([updateReporters, setLoggedIn]).then(() => {
          this.$store.dispatch('setAppReady').then(() => {

            // TODO: I hate this so much
            if (this.$router.currentRoute.name === 'Login') {
              this.$router.push({name: 'Dashboard'})
            }

          }).catch()
        })

      }).catch(() => {
        this.$api.unsetApiKey()
        this.$store.dispatch('setAppReady').then(() => {
          this.$router.push({name: "Login"}).catch()
        }).catch()
      })


    } else {
      this.$store.dispatch('setAppReady').then(() => {
        this.$router.push({name: "Login"}).catch()
      }).catch()
    }
  }
}
</script>

<style>
#content {
  margin-top: 70px;
  margin-bottom: 20px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#footer {
  padding: 1em;
  margin-top: auto;
  background: #E9ECEF;
}
</style>

<template>
  <div class="text-center chungus-loader-container">
    <p>
      <b-spinner/>
    </p>
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  name: "FullScreenLoader",
  props: {
    text: {
      type: String,
      default: "Upman is loading..."
    }
  }
}
</script>

<style scoped>
div.chungus-loader-container {
  margin-top: 25vh;
  width: 100%;
}
</style>
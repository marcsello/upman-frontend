<template>
  <b-modal id="modal-model-info" size="lg" scrollable centered @show="updateInfo" @close="onClose" v-model="showModal">

  </b-modal>
</template>

<script>
export default {
  name: "CreateUpdateReporterModal",
  model: {
    prop: "show",
    event: "change"
  },
  props: {
    id: {
      type: Number
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    updateInfo() {
      this.reporter = this.$store.getters.getReporterById(this.id)
    },
    onClose() {
      this.show = false
    }
  },
  computed: {
    showModal: {
      get() {
        return this.show
      },
      set(v) {
        this.$emit("change", v)
      }
    }
  }
}
</script>

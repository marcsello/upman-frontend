<template>
  <b-modal id="modal-confirm-delete" v-model="showModal" @ok="emitConfirmed" @show="updateInfo" @close="onClose" title="Confirmation">
    <p>
      Are you sure you want to <b>delete</b> the following reporter?
    </p>
    <p>
      <b>Name:</b> {{ reporter.name }} <br/>
      <b>Created:</b> {{ reporter.created }} <br/>
      <b>Last Seen:</b> {{ reporter.last_seen || 'Never'}}
    </p>
  </b-modal>
</template>

<script>
export default {
  name: "DeleteConfirmModal",
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
  data() {
    return {
      reporter: {}
    }
  },
  methods: {
    emitConfirmed() {
      this.$emit('confirmed', this.id)
    },
    updateInfo() {
      this.reporter = this.$store.getters.getReporterById(this.id)
    },
    onClose() {
      this.showModal = false
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

<style scoped>

</style>
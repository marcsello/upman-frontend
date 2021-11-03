<template>
  <b-modal
      id="modal-reporter-info"
      size="lg"
      scrollable
      centered
      @show="updateInfo"
      @close="onClose"
      v-model="showModal"
      :title="title"
      ok-only
  >
    <b-table stacked :items="[reporter]" :fields="fields"></b-table>
  </b-modal>
</template>

<script>
import moment from "moment";

export default {
  name: "InfoModal",
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
      reporter: {},
      fields: [
        "id", "name",
        {
          key: "created",
          formatter(value) {
            return moment(value).format('YYYY. MM. DD. h:mm:ss') + " (" + moment(value).fromNow() + ")"
          }
        },
        {
          key: "last_seen",
          formatter(value) {
            return moment(value).format('YYYY. MM. DD. h:mm:ss') + " (" + moment(value).fromNow() + ")"
          }
        },
        {key: "info_digest"}
      ]
    }
  },
  methods: {
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
    },
    title() {
      return `Information of ${this.reporter.name}`
    }
  }
}
</script>

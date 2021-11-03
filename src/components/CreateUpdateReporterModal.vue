<template>
  <b-modal
      id="modal-create-update"
      size="lg"
      scrollable
      centered
      @show="updateInfo"
      @close="onClose"
      v-model="showModal"
      :title="title"
  >
    <b-overlay :show="pending">

      <b-form @submit.prevent>
        <b-form-group
            id="input-group-name"
            label="Name:"
            label-for="input-name"
            description="Simple, friendly unique identifier"
        >
          <b-form-input
              id="input-name"
              v-model="reporter.name"
              type="text"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-key"
            label="Key:"
            label-for="input-key"
            description="Key used by the reporters"
        >
          <b-form-input
              id="input-key"
              v-model="reporter.key"
              type="password"
              required
          ></b-form-input>
        </b-form-group>

      </b-form>


    </b-overlay>
    <template #modal-footer>

      <b-button
          variant="danger"
          class="float-right"
          @click="onClickDelete"
          v-if="!!id"
      >
        Delete
      </b-button>

      <b-button
          variant="success"
          class="float-right"
          @click="onClickUpdate"
          v-if="!!id"
      >
        Update
      </b-button>
      <b-button
          variant="success"
          class="float-right"
          @click="onClickCreate"
          v-else
      >
        Create
      </b-button>

      <b-button
          variant="secondary"
          class="float-right"
          @click="showModal=false"
      >
        Close
      </b-button>

    </template>
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
  data() {
    return {
      reporter: {},
      pending: false
    }
  },
  methods: {
    updateInfo() {
      this.pending = false
      if (this.id) {
        this.reporter = {
          name: this.$store.getters.getReporterById(this.id).name,
          key: ""
        }
      } else {
        this.reporter = {}
      }
    },
    onClose() {
      this.showModal = false
    },
    onClickDelete() {
      this.showModal = false
      this.$emit("delete", this.id)
    },
    onClickUpdate() {
      this.pending = true

      let toPatch = {
        name: this.reporter.name
      }

      if (this.reporter.key && this.reporter.key !== "") {
        toPatch.key = this.reporter.key
      }

      this.$api.patchReporter(this.id,toPatch).then(() => {
        this.$showToast("Reporter updated!", 'success')
        this.showModal = false
        this.$emit('refresh')
      }).catch((text) => {
        this.pending = false
        this.$showToast(text)
      })
    },
    onClickCreate() {
      this.pending = true
      this.$api.createReporter(this.reporter).then(() => {
        this.$showToast("Reporter created!", 'success')
        this.showModal = false
        this.$emit('refresh')
      }).catch((text) => {
        this.pending = false
        this.$showToast(text)
      })
    }
  },
  computed: {
    showModal: {
      get() {
        return this.show
      }
      ,
      set(v) {
        this.$emit("change", v)
      }
    }
    ,
    title() {
      if (this.id) {
        return `Update ${this.reporter.name}`
      } else {
        return "Create new reporter"
      }
    }
  }
}
</script>

<style scoped>

</style>
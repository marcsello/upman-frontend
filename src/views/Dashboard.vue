<template>
  <div id="dashboard">
    <create-update-reporter-modal
        v-model="createUpdateModal.show"
        :id="createUpdateModal.id"
        @refresh="performUpdate"
        @delete="askDelete(createUpdateModal.id)"
    />
    <delete-confirm-modal v-model="deleteConfirmModal.show" :id="deleteConfirmModal.id" @confirmed="performDelete"/>
    <info-modal v-model="infoModal.show" :id="infoModal.id"/>
    <b-row class="my-3">
      <b-col class="text-right">
        <b-button @click="showCreate" variant="success" :disabled="$store.state.reporters_loading" class="mx-1">
          <b-icon-plus/>
          New reporter
        </b-button>
        <b-button @click="performUpdate" :disabled="$store.state.reporters_loading" variant="primary" class="mx-1">
          <b-icon-arrow-clockwise/>
          Update
        </b-button>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col>
        <b-table
            striped
            hover
            :items="$store.state.reporters"
            :fields="fields"
            primary-key="id"
            :busy="$store.state.reporters_loading"
        >
          <!-- A virtual column -->
          <template #cell(actions)="data">
            <b-button class="mx-1" size="sm" variant="primary" @click="showInfo(data.item.id)">
              <b-icon icon="info"/>
            </b-button>
            <b-button class="mx-1" size="sm" variant="warning" @click="showUpdate(data.item.id)">
              <b-icon icon="pencil"/>
            </b-button>
            <b-button class="mx-1" size="sm" variant="danger" @click="askDelete(data.item.id)">
              <b-icon icon="trash"/>
            </b-button>
          </template>

          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle mx-2"/>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CreateUpdateReporterModal from "@/components/CreateUpdateReporterModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import InfoModal from "@/components/InfoModal";
import moment from 'moment';

export default {
  name: 'Dashboard',
  components: {
    CreateUpdateReporterModal,
    DeleteConfirmModal,
    InfoModal
  },
  data() {
    return {
      createUpdateModal: {
        show: false,
        id: null
      },
      deleteConfirmModal: {
        show: false,
        id: null
      },
      infoModal: {
        show: false,
        id: null
      },
      fields: [
        {
          key: "name",
          sortable: true
        },
        {
          key: "created",
          formatter(value) {
            return moment(value).format('YYYY. MM. DD. h:mm:ss')
          }
        },
        {
          key: "last_seen",
          sortable: true,
          formatter(value) {
            if (!value) {
              return 'Never'
            }
            return moment(value).format('YYYY. MM. DD. h:mm:ss')
          }
        },
        {
          key: "info_digest",
          formatter(value) {
            if (!value) {
              return ""
            }
            let text = value.substring(0, 15)
            if (value.length > 15) {
              text += "..."
            }
            return text
          }
        },
        "actions"
      ],
      intervalId: null
    }
  },
  methods: {
    performUpdate() {
      this.$store.dispatch("setReportersLoading").then(() => {

        this.$api.listReporters().then((reporters) => {
          this.$store.dispatch('updateReporters', reporters)
        }).catch(({text}) => this.$showToast(text))

      }).catch()
    },
    askDelete(id) {
      this.deleteConfirmModal = {
        id: id,
        show: true
      }
    },
    performDelete(id) {
      this.$store.dispatch("setReportersLoading").then(() => {
        this.$api.deleteReporter(id).then(() => {
          this.$showToast("Reporter Deleted", "success")
          this.performUpdate()
        }).catch(({text}) => {
          this.$showToast(text)
          this.performUpdate()
        })
      }).catch()
    },
    showCreate() {
      this.createUpdateModal = {
        id: null,
        show: true
      }
    },
    showUpdate(id) {
      this.createUpdateModal = {
        id: id,
        show: true
      }
    },
    showInfo(id) {
      this.infoModal = {
        id: id,
        show: true
      }
    },
    updateTimers() {

    }
  },
  mounted() {
    this.intervalId = setInterval(() => this.updateTimers(), 500)
  },
  destroyed() {
    clearInterval(this.intervalId)
  }
}
</script>

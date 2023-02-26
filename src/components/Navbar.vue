<template>
  <div>
    <b-navbar
      tag="div"
      fixed="top"
      type="dark"
      variant="dark"
    >
      <b-icon
        v-if="archives.length > 0"
        v-b-toggle.sidebar-variant
        variant="light"
        size="lg"
        role="button"
        font-scale="1.5"
        icon="list"
      >
        NavBar
      </b-icon>

      <span
        v-if="currentArchive"
        class="mx-4 text-light"
      >
        Viewing archive: <b>{{ currentArchive.name }}</b>
      </span>
      <b-button
        v-if="currentArchive"
        class="mr-2"
        variant="outline-primary"
        @click="handleClearCurrentArchive"
      >
        Close
      </b-button>

      <b-navbar-nav tag="div" class="ml-auto d-flex align-items-center">
        <span class="text-light">
          {{ totalHours }}h / {{ totalMoneyNoCashTips }} pln
        </span>

        <b-button
          v-if="!currentArchive"
          v-b-modal.confirm-archive-modal
          class="ml-4"
          variant="outline-danger"
        >
          Archive
        </b-button>

        <b-modal
          id="confirm-archive-modal"
          ref="modal"
          title="Confirm archiving of all records"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <p class="mb-4">
            By clicking OK you confirm that all records will be archived (you can still access them from the left menu)
          </p>
          <p class="my-4">
            To proceed please type the name of the new archive:
          </p>
          <form
            ref="form"
          >
            <b-form-group
              invalid-feedback="Archive name is required"
              :state="archiveNameState"
            >
              <b-form-input
                v-model="archiveName"
                autofocus
                :state="archiveNameState"
                required
              />
            </b-form-group>
          </form>
        </b-modal>
      </b-navbar-nav>
    </b-navbar>
    <b-sidebar
      id="sidebar-variant"
      title="Archives"
      bg-variant="dark"
      text-variant="light"
      shadow
      backdrop
    >
      <div class="px-3 py-2">
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item
              v-for="archive in archives"
              :key="archive.id"
              v-b-toggle.sidebar-variant
              @click="handleLoadArchive(archive.id)"
            >
              {{ archive.name }}
            </b-nav-item>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ADD_ARCHIVE, LOAD_ARCHIVE, CLEAR_CURRENT_ARCHIVE } from '@/store/archives'

export default {
  data() {
    return {
      archiveName: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      archiveNameState: null,
    }
  },
  computed: {
    ...mapGetters([
      'archives',
      'currentArchive',
      'totalHours',
      'totalMoneyNoCashTips',
    ]),
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.archiveNameState = valid
      return valid
    },
    resetModal() {
      this.archiveName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
      this.archiveNameState = null
    },
    handleOk(event) {
      event.preventDefault()
      this.handleArchiveRecors()
    },
    handleClearCurrentArchive() {
      this[CLEAR_CURRENT_ARCHIVE]()
    },
    handleLoadArchive(archiveId) {
      this[LOAD_ARCHIVE](archiveId)
    },
    handleArchiveRecors() {
      if (!this.checkFormValidity()) {
        return
      }

      const archive = {
        name: this.archiveName,
      }

      this[ADD_ARCHIVE](archive)

      this.$nextTick(() => {
        this.$bvModal.hide('confirm-archive-modal')
      })
    },
    ...mapActions([
      ADD_ARCHIVE,
      LOAD_ARCHIVE,
      CLEAR_CURRENT_ARCHIVE,
    ]),
  },
}
</script>

<style lang="scss" scoped>

</style>

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
            <div
              v-for="archive in archives"
              :key="archive.id"
            >
              <b-nav-item
                v-b-toggle.sidebar-variant
                :disabled="currentArchive && (archive.id === currentArchive.id)"
                @click="handleLoadArchive(archive.id)"
              >
                {{ archive.name }}
              </b-nav-item>
              <ul v-if="currentArchive && (archive.id === currentArchive.id)" class="nav flex-column">
                <li
                  v-b-modal.confirm-rename-archive-modal
                  class="nav-item not-collapsed pl-4"
                >
                  Rename
                </li>
                <li
                  v-b-modal.confirm-remove-archive-modal
                  class="nav-item not-collapsed pl-4"
                >
                  Delete
                </li>
              </ul>
            </div>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>

    <b-modal
      id="confirm-rename-archive-modal"
      ref="rename-archive-modal"
      title="Enter new name of this archive"
      @hidden="resetEditArchiveModal"
      @ok="handleRenameArchive"
    >
      <p class="mb-4">
        Please type new name of the archive:
      </p>
      <form
        ref="form"
      >
        <b-form-group
          invalid-feedback="Archive name is required"
          :state="newArchiveNameState"
        >
          <b-form-input
            v-model="newArchiveName"
            autofocus
            :state="newArchiveNameState"
            required
          />
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="confirm-remove-archive-modal"
      ref="remove-archive-modal"
      title="Remove archive?"
      @ok="handleRemoveArchive"
    >
      <p class="my-4">
        Click OK to remove the archive
      </p>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  ADD_ARCHIVE,
  LOAD_ARCHIVE,
  CLEAR_CURRENT_ARCHIVE,
  EDIT_ARCHIVE,
  REMOVE_ARCHIVE,
} from '@/store/archives'

export default {
  data() {
    return {
      archiveName: '',
      archiveNameState: null,
      newArchiveName: '',
      newArchiveNameState: null,
    }
  },
  computed: {
    ...mapGetters([
      'archives',
      'currentArchive',
      'totalHours',
      'totalMoneyNoCashTips',
    ]),

    defaultArchiveName() {
      let name
      let index = 0
      let nameFree = false
      do {
        name = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
        if (index > 0) name += ` (${index})`
        index += 1
        // eslint-disable-next-line no-loop-func
        nameFree = this.archives.every(archive => archive.name !== name)
      } while (!nameFree)

      return name
    },
  },
  watch: {
    defaultArchiveName: {
      handler(value) {
        this.archiveName = value
      },
      immediate: true,
    },
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.archiveNameState = valid
      return valid
    },
    resetModal() {
      this.archiveName = this.defaultArchiveName
      this.archiveNameState = null
    },
    resetEditArchiveModal() {
      this.newArchiveName = ''
      this.newArchiveNameState = null
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
    handleRenameArchive() {
      this[EDIT_ARCHIVE]({
        id: this.currentArchive.id,
        name: this.newArchiveName,
      })
    },
    handleRemoveArchive() {
      this[REMOVE_ARCHIVE](this.currentArchive.id)
    },
    ...mapActions([
      ADD_ARCHIVE,
      LOAD_ARCHIVE,
      CLEAR_CURRENT_ARCHIVE,
      EDIT_ARCHIVE,
      REMOVE_ARCHIVE,
    ]),
  },
}
</script>

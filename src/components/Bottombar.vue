<template>
  <div>
    <b-navbar
      fixed="bottom"
      type="dark"
      variant="dark"
      class="overflow-auto"
    >
      <b-icon
        v-if="lists.length > 0"
        v-b-toggle.lists-sidebar
        variant="light"
        size="lg"
        role="button"
        font-scale="1.5"
        icon="list"
        class="mr-3"
      >
        NavBar
      </b-icon>

      <b-navbar-nav class="d-flex align-items-center">
        <b-nav-item
          v-for="list in lists"
          :key="list.id"
          class="mr-3 text-nowrap"
          :active="selectedList.id === list.id"
          @click="handleSelectList(list.id)"
        >
          {{ list.name }}
        </b-nav-item>

        <b-nav-item
          v-b-modal.confirm-new-list-modal
          href="#"
        >
          +
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-modal
      id="confirm-new-list-modal"
      ref="new-list-modal"
      title="Enter name of new list"
      @hidden="resetNewListModal"
      @ok="handleAddList"
    >
      <p class="my-4">
        Please type the name of the new list:
      </p>
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
      >
        <b-form-group
          invalid-feedback="List name is required"
          :state="newListNameState"
        >
          <b-form-input
            v-model="newListName"
            :state="newListNameState"
            autofocus
            required
          />
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="confirm-edit-list-modal"
      ref="edit-list-modal"
      title="Enter new name of this list"
      @hidden="resetEditListModal"
      @ok="handleEditListName"
    >
      <p class="my-4">
        Please type new name of the list:
      </p>
      <form
        ref="form"
      >
        <b-form-group
          invalid-feedback="List name is required"
          :state="editListNameState"
        >
          <b-form-input
            v-model="editListName"
            :state="editListNameState"
            autofocus
            required
          />
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="confirm-remove-list-modal"
      ref="remove-list-modal"
      title="Remove list?"
      @ok="handleRemoveList"
    >
      <p class="my-4">
        Click OK to remove the list
      </p>
    </b-modal>

    <b-sidebar
      id="lists-sidebar"
      ref="sidebar"
      :title="selectedList.name"
      bg-variant="dark"
      text-variant="light"
      shadow
      backdrop
    >
      <div class="px-3 py-2">
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item v-b-modal.confirm-edit-list-modal>
              Edit list
            </b-nav-item>

            <b-nav-item v-b-modal.confirm-remove-list-modal>
              Remove list
            </b-nav-item>

            <b-dropdown-divider class="nav-link" />

            <b-nav-item @click="handleExportData">
              Export Data
            </b-nav-item>

            <b-nav-item @click="$refs.importFile.click()">
              Import Data
            </b-nav-item>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>

    <input
      ref="importFile"
      type="file"
      class="d-none"
      accept=".json"
      @change="handleImportData"
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  EDIT_LIST, ADD_LIST, REMOVE_LIST, SELECT_LIST,
} from '@/store/lists'
import {
  EXPORT_STORE,
  IMPORT_STORE,
} from '@/store'

const DEFAULT_LIST_NAME = 'My new list'
export default {
  data() {
    return {
      newListName: DEFAULT_LIST_NAME,
      newListNameState: null,
      editListName: '',
      editListNameState: null,
    }
  },
  computed: {
    ...mapGetters(['lists', 'selectedList']),
  },
  methods: {
    ...mapActions([EDIT_LIST, ADD_LIST, REMOVE_LIST, SELECT_LIST, EXPORT_STORE, IMPORT_STORE]),
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.newListNameState = valid
      return valid
    },
    resetNewListModal() {
      this.newListName = DEFAULT_LIST_NAME
      this.newListNameState = null
    },
    resetEditListModal() {
      this.editListName = ''
      this.editListNameState = null
    },
    handleAddList() {
      const newList = {
        name: this.newListName,
      }
      this[ADD_LIST](newList)
    },
    handleRemoveList() {
      this[REMOVE_LIST](this.selectedList.id)
    },
    handleEditListName() {
      const newList = {
        ...this.selectedList,
        name: this.editListName,
      }
      this[EDIT_LIST](newList)
    },
    handleSelectList(listId) {
      this[SELECT_LIST](listId)
    },
    handleExportData() {
      this[EXPORT_STORE]()
    },
    handleImportData() {
      const file = this.$refs.importFile.files[0]

      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const store = JSON.parse(reader.result)

          if (store) {
            this[IMPORT_STORE](store)
            this.$refs.sidebar.hide()
          }
        }
        reader.readAsText(file)
      }
    },
  },
}
</script>

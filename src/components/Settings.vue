<template>
  <div class="settings-container d-flex mb-2 align-self-end">
    <b-input-group
      size="lg"
      prepend="Hourly rate"
      append="PLN"
    >
      <b-form-input
        type="number"
        :value="hourlyRate"
        @change="handleEditHourlyRate"
      />
    </b-input-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { EDIT_HOURLY_RATE } from '@/store/settings'

export default {
  computed: {
    ...mapGetters(['hourlyRate']),
    records () {
      const listId = this.lists[this.focusedIndex].id
      const records = this.getListRecords(listId)

      return records
    }
  },
  methods: {
     handleEditHourlyRate(value) {
      this[EDIT_HOURLY_RATE](value)
    },
    ...mapActions([
      EDIT_HOURLY_RATE,
    ])
  }
}
</script>

<style scoped>
.settings-container {
    max-width: 300px;
}
</style>

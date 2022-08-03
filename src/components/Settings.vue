<template>
  <div class="settings-container d-flex flex-column mb-2 align-self-end">
    <div>
      <b-input-group
        size="lg"
        append="PLN"
      >
        <b-input-group-prepend>
          <b-input-group-text class="prepend-group-text">
            Hourly rate
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          class="settings-input"
          type="number"
          :value="hourlyRate"
          @change="handleEditHourlyRate"
        />
      </b-input-group>
    </div>
    <div class="mt-2">
      <b-input-group
        size="lg"
        append="%"
      >
        <b-input-group-prepend>
          <b-input-group-text class="prepend-group-text">
            Interest rate
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          class="settings-input"
          type="number"
          :value="interestRate"
          @change="handleEditInterestRate"
        />
      </b-input-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { EDIT_HOURLY_RATE, EDIT_INTEREST_RATE } from '@/store/settings'

export default {
  computed: {
    ...mapGetters(['hourlyRate', 'interestRate']),
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
    handleEditInterestRate(value) {
      this[EDIT_INTEREST_RATE](value)
    },
    ...mapActions([
      EDIT_HOURLY_RATE,
      EDIT_INTEREST_RATE,
    ])
  }
}
</script>

<style scoped>
.settings-container {
    max-width: 300px;
}

.settings-input {
  width: 70px
}

.prepend-group-text {
  min-width: 145px;
}
</style>

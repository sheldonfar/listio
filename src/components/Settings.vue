<template>
  <div class="settings-container d-flex flex-column flex-md-row mb-2 align-self-end">
    <div class="mx-2 my-2 my-md-0">
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
    <div class="mx-2 my-2 my-md-0">
      <b-input-group
        size="lg"
        append="%"
      >
        <b-input-group-prepend>
          <b-input-group-text class="prepend-group-text">
            Tax rate
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          class="settings-input"
          type="number"
          :value="taxRate"
          @change="handleEditTaxRate"
        />
      </b-input-group>
    </div>
    <div class="mx-2 my-2 my-md-0">
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

import { EDIT_HOURLY_RATE, EDIT_TAX_RATE, EDIT_INTEREST_RATE } from '@/store/settings'

export default {
  computed: {
    ...mapGetters(['hourlyRate', 'taxRate', 'interestRate']),
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
    handleEditTaxRate(value) {
      this[EDIT_TAX_RATE](value)
    },
    handleEditInterestRate(value) {
      this[EDIT_INTEREST_RATE](value)
    },
    ...mapActions([
      EDIT_HOURLY_RATE,
      EDIT_TAX_RATE,
      EDIT_INTEREST_RATE,
    ])
  }
}
</script>

<style scoped>
.settings-input {
  width: 70px
}

.prepend-group-text {
  min-width: 145px;
}
</style>

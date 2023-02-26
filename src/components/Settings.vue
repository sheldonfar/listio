<template>
  <div class="d-flex flex-column flex-md-row mb-2 align-self-end align-items-end">
    <b-button
      variant="link"
      class="text-right"
      :aria-expanded="settingsExpanded ? 'true' : 'false'"
      aria-controls="settings-collapse"
      @click="toggleSettingsExpanded"
    >
      Toggle Settings
    </b-button>
    <b-collapse id="settings-collapse" :visible="settingsExpanded" class="mt-2">
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
            aria-label="Hourly rate"
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
            aria-label="Tax rate"
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
            aria-label="Interest rate"
            class="settings-input"
            type="number"
            :value="interestRate"
            @change="handleEditInterestRate"
          />
        </b-input-group>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import {
  EDIT_HOURLY_RATE,
  EDIT_TAX_RATE,
  EDIT_INTEREST_RATE,
  TOGGLE_SETTINGS_EXPANDED,
} from '@/store/settings'

export default {
  computed: {
    ...mapGetters(['hourlyRate', 'taxRate', 'interestRate', 'settingsExpanded']),
  },
  methods: {
    toggleSettingsExpanded() {
      this[TOGGLE_SETTINGS_EXPANDED](!this.settingsExpanded)
    },
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
      TOGGLE_SETTINGS_EXPANDED,
    ]),
  },
}
</script>

<style scoped>
.settings-input {
  width: 75px;
}

.prepend-group-text {
  min-width: 145px;
}
</style>

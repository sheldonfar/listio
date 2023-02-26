<template>
  <div>
    <b-form-tags
      no-outer-focus
    >
      <template #default="{ inputAttrs, inputHandlers }">
        <b-input-group class="root flex-nowrap">
          <input
            v-bind="inputAttrs"
            placeholder="Cost"
            type="number"
            class="form-control"
            v-on="inputHandlers"
          >
          <b-input-group-append>
            <b-input-group>
              <input
                v-model="discountPercent"
                placeholder="Discount"
                type="number"
                class="form-control rounded-0"
                @click.capture.stop
              >
              <b-input-group-append>
                <b-input-group-text class="rounded-0">
                  %
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
            <b-button
              variant="primary"
              @click="addInterest(inputAttrs)"
            >
              Add
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <ul
          v-if="interests.length > 0"
          class="list-unstyled d-inline-flex flex-wrap mb-0"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions removals"
        >
          <b-card
            v-for="interest in interests"
            :id="interest.id"
            :key="interest.id"
            tag="li"
            class="mt-2 mr-2"
            body-class="py-1 px-2 text-nowrap d-flex align-items-center"
          >
            <strong>
              {{ getInterestDisplayValue(interest) }}
            </strong>
            <b-icon
              class="ml-4"
              icon="trash"
              role="button"
              aria-label="Remove procedure earning"
              @click="removeInterest(interest.id)"
            />
            <b-tooltip
              :target="interest.id"
              triggers="hover"
            >
              Date: {{ new Date(interest.date).toLocaleDateString("pl-PL") }}<br>
              Amount gross: {{ interest.value }} pln<br>
              Discount percent: {{ interest.discountPercent }}%<br>
              Discount amount: {{ interest.discountPercent * interest.value / 100 }} pln<br>
              Procedure net: {{ getProcedureNetValue(interest.id) }} pln<br>
              Amount net: {{ getInterestNetValue(interest.id) }} pln<br>
            </b-tooltip>
          </b-card>
        </ul>
      </template>
    </b-form-tags>
    <p
      v-if="total > 0"
      class="mt-2"
    >
      Total procedure (<strong>{{ interests.length }}</strong>) earnings: <b>{{ total }} pln</b>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ADD_INTEREST, REMOVE_INTEREST } from '@/store/interests'

export default {
  props: {
    listId: { type: String, required: true },
  },
  data() {
    return {
      discountPercent: '',
    }
  },
  computed: {
    ...mapGetters(['getListInterests', 'getProcedureNetValue', 'getInterestNetValue']),
    interests() {
      return this.getListInterests(this.listId)
    },
    total() {
      return this.interests.reduce((acc, interest) => acc + this.getInterestNetValue(interest.id), 0)
    },
  },
  methods: {
    getInterestDisplayValue(interest) {
      return `
            ${interest.value} pln gross
            ${interest.discountPercent
    ? `- ${interest.discountPercent}%`
    : ''
}
            = ${this.getInterestNetValue(interest.id)} pln net
          `
    },
    addInterest(inputAttrs) {
      if (inputAttrs.value.length === 0) {
        return
      }

      const newInterest = {
        value: +inputAttrs.value,
        date: new Date().toISOString(),
        listId: this.listId,
        discountPercent: +this.discountPercent,
      }

      this[ADD_INTEREST](newInterest)

      inputAttrs.value = ''
    },
    removeInterest(interestId) {
      this[REMOVE_INTEREST](interestId)
    },
    ...mapActions([
      ADD_INTEREST,
      REMOVE_INTEREST,
    ]),
  },
}
</script>

<style scoped>
.root {
  width: 500px;
  max-width: 100%;
}
.root > .form-control {
  min-width: 90px;
}

</style>

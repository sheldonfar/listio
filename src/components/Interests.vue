<template>
  <div>
    <b-form-tags
      no-outer-focus
      class="mb-2"
    >
      <template #default="{ inputAttrs, inputHandlers }">
        <b-input-group class="root">
          <input
            v-bind="inputAttrs"
            placeholder="Procedure cost"
            type="number"
            class="form-control"
            v-on="inputHandlers"
          >
          <b-input-group-append>
            <input
              v-model="discountPercent"
              placeholder="Discount percent"
              type="number"
              class="form-control rounded-0"
              @click.capture.stop
            >
            <b-button
              variant="primary"
              @click="addInterest(inputAttrs)"
            >
              Add
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <ul
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
              Amount net: {{ getInterestNetValue(interest) }} pln<br>
            </b-tooltip>
          </b-card>
        </ul>
      </template>
    </b-form-tags>
    <p v-if="total > 0">
      Total procedure earnings: <b>{{ total }} pln</b>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ADD_INTEREST, REMOVE_INTEREST } from '@/store/interests'

export default {
    props: ['listId'],
    data: function () {
      return {
        discountPercent: '',
      }
    },
    computed: {
        ...mapGetters(["getListInterests", "interestRate"]),
        interests() {
            return this.getListInterests(this.listId);
        },
        total() {
            return this.interests.reduce((acc, interest) => acc + this.getInterestNetValue(interest), 0);
        },
    },
    methods: {
        getInterestGrossValue(interest) {
          return interest.value - interest.discountPercent * interest.value / 100
        },
        getInterestNetValue(interest) {
          return Math.round(this.getInterestGrossValue(interest) / (1 + this.interestRate / 100))
        },
        getInterestDisplayValue(interest) {
          return `
            ${interest.value} pln gross
            ${interest.discountPercent 
              ? `- ${interest.discountPercent}%` 
              : ''
            }
            = ${this.getInterestNetValue(interest) } pln net
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

            this[ADD_INTEREST](newInterest);

            inputAttrs.value = ''
        },
        removeInterest(interestId) {
             this[REMOVE_INTEREST](interestId);
        },
        ...mapActions([
            ADD_INTEREST,
            REMOVE_INTEREST,
        ])
    }
}
</script>

<style scoped>
.root { 
  max-width: 450px;
}

</style>
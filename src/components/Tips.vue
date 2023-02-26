<template>
  <div>
    <b-form-tags
      no-outer-focus
    >
      <template #default="{ inputAttrs, inputHandlers }">
        <b-input-group class="root">
          <input
            v-bind="inputAttrs"
            placeholder="Tip"
            type="number"
            class="form-control"
            v-on="inputHandlers"
          >
          <b-input-group-append>
            <b-form-select
              v-model="selectedTipType"
              class="rounded-0"
              :options="tipTypes"
              @click.native.capture.stop
            />
            <b-button
              variant="primary"
              @click="addTip(inputAttrs)"
            >
              Add
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <ul
          v-if="tips.length > 0"
          class="list-unstyled d-inline-flex flex-wrap mb-0"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions removals"
        >
          <b-card
            v-for="tip in tips"
            :id="tip.id"
            :key="tip.id"
            tag="li"
            class="mt-2 mr-2"
            body-class="py-1 px-2 text-nowrap d-flex align-items-center"
          >
            <strong>{{ tip.type }} {{ tip.value }} pln</strong>
            <b-icon
              class="ml-4"
              icon="trash"
              role="button"
              aria-label="Remove tip"
              @click="removeTip(tip.id)"
            />
            <b-tooltip
              :target="tip.id"
              triggers="hover"
            >
              Date: {{ new Date(tip.date).toLocaleDateString("pl-PL") }}
            </b-tooltip>
          </b-card>
        </ul>
      </template>
    </b-form-tags>
    <p
      v-if="total > 0"
      class="mt-2"
    >
      Total tips (<strong>{{ tips.length }}</strong>) earnings: <b>{{ total }} pln</b>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ADD_TIP, REMOVE_TIP } from '@/store/tips'
import TipTypes from '@/constants/tipTypes'

export default {
  props: ['listId'],
  data() {
    return {
      selectedTipType: TipTypes[0].value,
      tipTypes: TipTypes,
    }
  },
  computed: {
    ...mapGetters(['getListTips']),
    tips() {
      return this.getListTips(this.listId)
    },
    total() {
      return this.tips.reduce((acc, tip) => acc + tip.value, 0)
    },
  },
  methods: {
    addTip(inputAttrs) {
      if (inputAttrs.value.length === 0) {
        return
      }

      const newTip = {
        value: +inputAttrs.value,
        date: new Date().toISOString(),
        listId: this.listId,
        type: this.selectedTipType,
      }

      this[ADD_TIP](newTip)

      inputAttrs.value = ''
    },
    removeTip(tipId) {
      this[REMOVE_TIP](tipId)
    },
    ...mapActions([
      ADD_TIP,
      REMOVE_TIP,
    ]),
  },
}
</script>

<style scoped>
.root {
  max-width: 300px;
}
</style>

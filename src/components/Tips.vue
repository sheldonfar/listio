<template>
  <div>
    <b-form-tags
      no-outer-focus
      class="mb-2"
    >
      <template #default="{ inputAttrs, inputHandlers }">
        <b-input-group aria-controls="my-custom-tags-list">
          <input
            v-bind="inputAttrs"
            placeholder="Tip"
            type="number"
            class="form-control"
            v-on="inputHandlers"
            @blur="addTip(inputAttrs)"
          >
          <b-input-group-append>
            <b-button
              variant="primary"
              @click="addTip(inputAttrs)"
            >
              Add
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <ul
          id="my-custom-tags-list"
          class="list-unstyled d-inline-flex flex-wrap mb-0"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions removals"
        >
          <b-card
            v-for="tip in tips"
            :key="tip.id"
            tag="li"
            class="mt-2 mr-2"
            body-class="py-1 px-2 text-nowrap d-flex align-items-center"
          >
            <strong>{{ tip.value }} pln</strong>
            <b-icon
              class="ml-4"
              icon="trash"
              role="button"
              aria-label="Remove tip"
              @click="removeTip(tip.id)"
            />
          </b-card>
        </ul>
      </template>
    </b-form-tags>
    <p v-if="total > 0">
      Total tips: <b>{{ total }} pln</b>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ADD_TIP, REMOVE_TIP } from '@/store/tips'

export default {
    props: ['listId'],
    computed: {
        ...mapGetters(["getListTips"]),
        tips() {
            return this.getListTips(this.listId);
        },
        total() {
            return this.tips.reduce((acc, tip) => acc + tip.value, 0);
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
            }

            this[ADD_TIP](newTip);

            inputAttrs.value = ''
        },
        removeTip(tipId) {
             this[REMOVE_TIP](tipId);
        },
        ...mapActions([
            ADD_TIP,
            REMOVE_TIP
        ])
    }
}
</script>

<style lang="scss" scoped>

</style>
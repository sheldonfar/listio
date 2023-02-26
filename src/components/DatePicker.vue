<template>
  <div>
    <b-input-group @click="onInputClick">
      <template #prepend>
        <b-button
          variant="transparent"
          class="border border-right-0"
        >
          <b-icon icon="calendar" />
        </b-button>
      </template>
      <label
        class="form-control border-left-0 pl-0"
        role="button"
      >
        {{ new Date(value).toLocaleDateString('pl-PL') }}
      </label>
    </b-input-group>
    <b-modal
      ref="calendar-modal"
      centered
      hide-header
      hide-footer
      no-fade
      content-class="w-auto mx-auto"
    >
      <b-calendar
        v-model="dateValue"
        value-as-date
        locale="pl-PL"
        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        @context="onContext"
      />
    </b-modal>
  </div>
</template>
  
  <script>
  export default {
      name: "DatePicker",
      props: ['value'],
      data: function () {
          return {
            dateValue: new Date(this.value),
            dateContext: {},
          }
      },
      methods: {
        onInputClick() {
          this.$refs['calendar-modal'].show()
        },
        onContext(ctx) {
            if (this.dateContext.selectedDate && ctx.selectedDate.toISOString() !== this.dateContext.selectedDate.toISOString()) {
                this.$refs['calendar-modal'].hide()
                this.$emit('dateSelected', ctx.selectedDate.toISOString())
            }
            this.dateContext = ctx
        }
      },
  }
  </script>
  
  <style scoped>
  </style>
  
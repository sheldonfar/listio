<template>
  <div>
    <b-input-group v-b-modal="'datepicker-modal'">
      <template #prepend>
        <b-button
          variant="transparent"
          class="border border-right-0"
        >
          <b-icon icon="calendar" />
        </b-button>
      </template>
      <label class="form-control border-left-0 cursor-pointer">
        {{ dateContext.selectedFormatted }}
      </label>
    </b-input-group>
    <b-modal
      id="datepicker-modal"
      centered
      hide-header
      hide-footer
      no-fade
      static
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
          };
      },
      methods: {
        onContext(ctx) {
            if (this.dateContext.selectedDate && ctx.selectedDate.toISOString() !== this.dateContext.selectedDate.toISOString()) {
                this.$bvModal.hide('datepicker-modal')
                console.info("EMIT",ctx.selectedDate.toISOString())
                this.$emit('dateSelected', ctx.selectedDate.toISOString())
            }
            this.dateContext = ctx
        }
      },
  }
  </script>
  
  <style scoped>
  </style>
  
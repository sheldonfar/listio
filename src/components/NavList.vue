<template>
  <b-card no-body>
    <div class="table-responsive">
      <b-table
        hover
        class="record-table w-100"
        bordered
        :items="records"
        :fields="fields"
        @row-clicked="handleRowClicked"
      >
        <template #cell(date)="data">
          <DatePicker
            v-if="isRecordEditMode && focusedRecordId === data.item.id"
            :value="data.item.date"
            @dateSelected="handleEditRecordDate($event, data.item.id)"
          />
          <span v-else>{{ new Date(data.item.date).toLocaleDateString("pl-PL") }}</span>
        </template>

        <template #cell(value)="data">
          <b-form-input
            v-if="isRecordEditMode && focusedRecordId === data.item.id"
            class="value-input"
            type="number"
            min="0"
            :value="data.item.value"
            @blur="handleEditRecordValue($event, data.item.id)"
          />
          <span v-else>{{ data.item.value }}</span>
        </template>

        <template #cell(money)="data">
          {{ data.item.value * hourlyRate }} pln
        </template>

        <template #custom-foot>
          <tr>
            <th>
              <DatePicker
                :value="newRecordDate"
                @dateSelected="value => newRecordDate = value"
              />
            </th>
            <th>
              <b-form-input
                v-model="newRecordValue"
                aria-label="Number of hours"
                class="value-input"
                type="number"
                min="0"
                @blur="handleAddRecord(selectedList.id)"
              />
            </th>
            <th />
          </tr>
          <tr>
            <th />
            <th>{{ totalHours }} hours</th>
            <th>{{ totalMoney }} pln</th>
          </tr>
        </template>

        <template #row-details="row">
          <b-button
            class="mr-2"
            variant="info"
            :disabled="isRecordEditMode"
            @click="handleEnableRecordEditMode(row.item.id)"
          >
            Edit
          </b-button>
          <b-button
            class="mr-2"
            variant="dark"
            @click="handleRemoveRecord(row.item.id)"
          >
            Delete
          </b-button>
        </template>
      </b-table>
    </div>

    <div class="px-2 pb-2">
      <Tips
        class="mb-3"
        :list-id="selectedList.id"
      />

      <Interests :list-id="selectedList.id" />
    </div>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ADD_RECORD, EDIT_RECORD, REMOVE_RECORD } from '@/store/records'
import Tips from './Tips.vue'
import Interests from './Interests.vue'
import DatePicker from './DatePicker.vue'

export default {
  name: 'NavList',
  components: { Tips, Interests, DatePicker },
  data() {
    return {
      focusedRecordId: undefined,
      isEditMode: false,
      isCreateMode: false,
      isRecordEditMode: false,
      newRecordDate: new Date().toISOString(),
      newRecordValue: '',
      fields: [
        {
          key: 'date',
        },
        {
          key: 'value',
          label: '# of hours',
        },
        'money',
      ],
    }
  },
  computed: {
    ...mapGetters(['lists', 'getListRecords', 'hourlyRate', 'selectedList']),
    records() {
      const listId = this.selectedList.id
      return this.getListRecords(listId)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(record => ({ ...record, _showDetails: false }))
    },
    totalMoney() {
      return this.records.reduce((acc, record) => acc + record.value * this.hourlyRate, 0)
    },
    totalHours() {
      return this.records.reduce((acc, record) => acc + record.value, 0)
    },
  },
  methods: {
    handleRowClicked(item) {
      this.$set(item, '_showDetails', !item._showDetails)
    },
    handleEnableRecordEditMode(recordId) {
      this.isRecordEditMode = true
      this.focusedRecordId = recordId
    },
    handleAddRecord(listId) {
      const newRecord = {
        value: +this.newRecordValue,
        date: this.newRecordDate,
        listId,
      }
      this[ADD_RECORD](newRecord)
      this.newRecordValue = ''
      this.newRecordDate = new Date().toISOString()
    },
    handleRemoveRecord(recordId) {
      this[REMOVE_RECORD](recordId)
    },
    handleEditRecordDate(value, recordId) {
      const oldRecord = this.records.find(record => record.id === recordId)
      const newRecord = {
        ...oldRecord,
        date: value,
      }
      this[EDIT_RECORD](newRecord)
      this.isRecordEditMode = false
      this.focusedRecordId = undefined
    },
    handleEditRecordValue(e, recordId) {
      const oldRecord = this.records.find(record => record.id === recordId)
      const newRecord = {
        ...oldRecord,
        value: +e.target.value,
      }
      this[EDIT_RECORD](newRecord)
      this.isRecordEditMode = false
      this.focusedRecordId = undefined
    },
    ...mapActions([
      ADD_RECORD,
      EDIT_RECORD,
      REMOVE_RECORD,
    ]),
  },
}
</script>

<style scoped>
.title {
  width: 300px;
}

.record-table {
  min-width: max-content;
  max-width: 800px;
}

.value-input {
  width: 75px;
  max-width: fit-content;
}
</style>

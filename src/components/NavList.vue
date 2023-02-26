<template>
  <b-card no-body>
    <div class="table-responsive">
      <b-table
        hover
        class="record-table"
        bordered
        :items="records"
        :fields="fields"
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

        <template #cell(actions)="data">
          <b-button
            class="mr-2"
            variant="info"
            :disabled="isRecordEditMode"
            @click="handleEnableRecordEditMode(data.item.id)"
          >
            Edit
          </b-button>
          <b-button
            class="mr-2"
            variant="dark"
            @click="handleRemoveRecord(data.item.id)"
          >
            Delete
          </b-button>
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
                class="value-input"
                type="number"
                min="0"
                @blur="handleAddRecord(selectedList.id)"
              />
            </th>
            <th />
            <th />
          </tr>
          <tr>
            <th />
            <th>{{ totalHours }} hours</th>
            <th>{{ totalMoney }} pln</th>
            <th /> 
          </tr>
        </template>
      </b-table>
    </div>
  
    <Tips :list-id="selectedList.id" />

    <Interests :list-id="selectedList.id" />
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ADD_RECORD, EDIT_RECORD, REMOVE_RECORD } from '@/store/records'
import Tips from './Tips.vue'
import Interests from './Interests.vue'
import DatePicker from './DatePicker.vue'

export default {
    name: "NavList",
    components: { Tips, Interests, DatePicker },
    data: function () {
        return {
            focusedRecordId: undefined,
            isEditMode: false,
            isCreateMode: false,
            isRecordEditMode: false,
            newRecordDate: new Date().toISOString(),
            newRecordValue: "",
            fields: [
                {
                    key: "date"
                },
                {
                    key: "value",
                    label: "# of hours",
                },
                "money",
                "actions"
            ]
        };
    },
    computed: {
        ...mapGetters(["lists", "getListRecords", "hourlyRate", "selectedList"]),
        records() {
            const listId = this.selectedList.id;
            return this.getListRecords(listId).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        },
        totalMoney() {
            return this.records.reduce((acc, record) => acc + record.value * this.hourlyRate, 0);
        },
        totalHours() {
            return this.records.reduce((acc, record) => acc + record.value, 0);
        }
    },
    methods: {
        handleEnableRecordEditMode(recordId) {
            this.isRecordEditMode = true;
            this.focusedRecordId = recordId;
        },
        handleAddRecord(listId) {
            const newRecord = {
                value: +this.newRecordValue,
                date: this.newRecordDate,
                listId
            };
            this[ADD_RECORD](newRecord);
            this.newRecordValue = "";
            this.newRecordDate = new Date().toISOString();
        },
        handleRemoveRecord(recordId) {
            this[REMOVE_RECORD](recordId);
        },
        handleEditRecordDate(value, recordId) {
            const oldRecord = this.records.find(record => record.id === recordId);
            const newRecord = {
                ...oldRecord,
                date: value
            };
            this[EDIT_RECORD](newRecord);
            this.isRecordEditMode = false;
            this.focusedRecordId = undefined;
        },
        handleEditRecordValue(e, recordId) {
            const oldRecord = this.records.find(record => record.id === recordId);
            const newRecord = {
                ...oldRecord,
                value: +e.target.value
            };
            this[EDIT_RECORD](newRecord);
            this.isRecordEditMode = false;
            this.focusedRecordId = undefined;
        },
        ...mapActions([
            ADD_RECORD,
            EDIT_RECORD,
            REMOVE_RECORD
        ])
    },
}
</script>

<style scoped>
.title {
  width: 300px;
}

.record-table {
  width: max-content;
}

.value-input {
  width: 80px;
  max-width: fit-content;
}
</style>

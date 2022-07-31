<template>
  <b-card no-body>
    <b-tabs
      v-model="focusedIndex"
      nav-class="nav-list"
      pills
      card
      vertical
    >
      <b-tab
        v-for="(list, index) in lists"
        :key="list.id"
        nav-class="w-100"
        :title="list.name"
      >
        <template #title>
          <div class="title d-flex justify-content-between align-items-center">
            <b-form-input
              v-if="isEditMode && focusedIndex === index"
              autofocus
              :value="list.name"
              @keyup.enter="$event.target.blur()"
              @blur="handleEditListName($event, list.id)"
            />
            <span
              v-else
              class="text-truncate"
              @click="handleEnableEditMode(index)"
            >
              {{ list.name }}
            </span>
            <b-icon
              v-if="index === focusedIndex && lists.length > 1"
              class="ml-4"
              icon="trash"
              aria-label="Remove list"
              @click="handleRemoveList(list.id)"
            />
          </div>
        </template>
        <b-table
          hover
          bordered
          :items="records"
          :fields="fields"
        >
          <template #cell(date)="data">
            <b-form-datepicker
              v-if="isRecordEditMode && focusedRecordId === data.item.id"
              autofocus
              :value="data.item.date"
              @blur="handleEditRecordDate($event, data.item.id)"
            />
            <span v-else>{{ new Date(data.item.date).toLocaleDateString("pl-PL") }}</span>
          </template>

          <template #cell(value)="data">
            <b-form-input
              v-if="isRecordEditMode && focusedRecordId === data.item.id"
              type="number"
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
                <b-form-datepicker
                  v-model="newRecordDate"
                  autofocus
                />
              </th>
              <th>
                <b-form-input
                  v-model="newRecordValue"
                  type="number"
                  @blur="handleAddRecord(list.id)"
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

        <Tips :list-id="list.id" />
      </b-tab>

      <template #tabs-end>
        <b-nav-item
          role="presentation"
          href="#"
          @click.prevent="isCreateMode = true"
        >
          <b-form-input
            v-if="isCreateMode"
            autofocus
            placeholder="Enter item name"
            @keyup.enter="$event.target.blur()"
            @blur="handleAddList"
          />
          <b v-else>+</b>
        </b-nav-item>
      </template>
    </b-tabs>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { EDIT_LIST, ADD_LIST, REMOVE_LIST } from '@/store/lists'
import { ADD_RECORD, EDIT_RECORD, REMOVE_RECORD } from '@/store/records'
import Tips from './Tips.vue'

export default {
    name: "NavList",
    components: { Tips },
    data: function () {
        return {
            focusedIndex: 0,
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
                    label: "Number of hours",
                },
                "money",
                "actions"
            ]
        };
    },
    computed: {
        ...mapGetters(["lists", "getListRecords", "hourlyRate"]),
        records() {
            const listId = this.lists[this.focusedIndex].id;
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
        handleEnableEditMode(index) {
            if (index === this.focusedIndex) {
                this.isEditMode = true;
            }
        },
        handleEnableRecordEditMode(recordId) {
            this.isRecordEditMode = true;
            this.focusedRecordId = recordId;
        },
        handleAddList(e) {
            this.isCreateMode = false;
            if (!e.target.value) {
                return;
            }
            const newList = {
                name: e.target.value
            };
            this[ADD_LIST](newList);
        },
        handleRemoveList(listId) {
            this[REMOVE_LIST](listId);
        },
        handleEditListName(e, listId) {
            this.isEditMode = false;
            if (!e.target.value) {
                return;
            }
            const oldList = this.lists.find(list => list.id === listId);
            const newList = {
                ...oldList,
                name: e.target.value
            };
            this[EDIT_LIST](newList);
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
        handleEditRecordDate(e, recordId) {
            const oldRecord = this.records.find(record => record.id === recordId);
            const newRecord = {
                ...oldRecord,
                date: e.target.value
            };
            this[EDIT_RECORD](newRecord);
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
            EDIT_LIST,
            ADD_LIST,
            REMOVE_LIST,
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
</style>

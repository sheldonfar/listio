import { v4 as uuid } from 'uuid'

import { loadStore, saveToStore } from '../api'

export const SET_RECORDS = 'records/SET_RECORDS'
export const SAVE_RECORDS = 'records/SAVE_RECORDS'
export const LOAD_RECORDS = 'records/LOAD_RECORDS'

export const CLEAR_RECORDS = 'tips/CLEAR_RECORDS'

export const ADD_RECORD = 'records/ADD_RECORD'
export const EDIT_RECORD = 'records/EDIT_RECORD'
export const REMOVE_RECORD = 'records/REMOVE_RECORD'

const state = {
  records: []
}

const getters = {
  getListRecords: store => listId => store.records.filter(record => record.listId === listId)
}

const mutations = {
  [SET_RECORDS] (state, records) {
    state.records = records
  },
  [ADD_RECORD] (state, record) {
    const newRecord = {
      ...record,
      id: uuid()
    }
    state.records.push(newRecord)
  },
  [EDIT_RECORD] (state, record) {
    const oldRecord = state.records.find(item => item.id === record.id)
    Object.assign(oldRecord, record)
  },
  [CLEAR_RECORDS] (state) {
    state.records = []
  },
  [REMOVE_RECORD] (state, recordId) {
    state.records = state.records.filter(({ id }) => id !== recordId)
  }
}

const actions = {
  async [ADD_RECORD] (context, record) {
    context.commit(ADD_RECORD, record)
    await context.dispatch(SAVE_RECORDS)
  },
  async [EDIT_RECORD] (context, record) {
    context.commit(EDIT_RECORD, record)
    await context.dispatch(SAVE_RECORDS)
  },
  async [REMOVE_RECORD] (context, recordId) {
    context.commit(REMOVE_RECORD, recordId)
    await context.dispatch(SAVE_RECORDS)
  },
  async [LOAD_RECORDS] (context) {
    const records = loadStore('records')

    if (records) {
      context.commit(SET_RECORDS, records)
    }
  },
  async [CLEAR_RECORDS] (context) {
    context.commit(CLEAR_RECORDS)
    await context.dispatch(SAVE_RECORDS)
  },
  async [SET_RECORDS] (context, records) {
    context.commit(SET_RECORDS, records)
    await context.dispatch(SAVE_RECORDS)
  },
  [SAVE_RECORDS] (context) {
    saveToStore('records', context.state.records)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

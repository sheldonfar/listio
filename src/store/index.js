import Vue from 'vue'
import Vuex from 'vuex'

import { importStore, exportStore } from '../api'

import lists, { LOAD_LISTS } from './lists'
import records, { LOAD_RECORDS } from './records'
import tips, { LOAD_TIPS } from './tips'
import interests, { LOAD_INTERESTS } from './interests'
import settings, { LOAD_SETTINGS } from './settings'
import archives, { LOAD_ARCHIVES } from './archives'

Vue.use(Vuex)

export const IMPORT_STORE = 'store/IMPORT_STORE'
export const EXPORT_STORE = 'store/EXPORT_STORE'
export const LOAD_STORE = 'store/LOAD_STORE'

const state = {}

const getters = {
  getProcedureNetValue: (store, getters, rootState, rootGetters) => interestId => {
    const interest = rootGetters.getInterestById(interestId)
    const taxRate = interest.taxRate || store.settings.taxRate

    return Math.round(getters.getInterestGrossValue(interestId) / (1 + taxRate / 100))
  },
  getInterestNetValue: (store, getters) => interestId =>
    Math.round((getters.getProcedureNetValue(interestId) * store.settings.interestRate) / 100),
  totalHours: (store, getters) => store.lists.lists.reduce((acc, list) => {
    const records = getters.getListRecords(list.id)

    return acc + records.reduce((recordsAcc, record) => recordsAcc + record.value, 0)
  }, 0),
  totalHoursCount: (store, getters) =>
    store.lists.lists.reduce((acc, list) => acc + getters.getListRecords(list.id).length, 0),
  totalSalary: (store, getters) => getters.totalHours * store.settings.hourlyRate,
  totalCardTips: (store, getters) => store.lists.lists.reduce((acc, list) => {
    const tips = getters.getListTipsByType(list.id, 'card')

    return acc + tips.reduce((tipsAcc, tip) => tipsAcc + tip.value, 0)
  }, 0),
  totalCardTipsCount: (store, getters) =>
    store.lists.lists.reduce((acc, list) => acc + getters.getListTipsByType(list.id, 'card').length, 0),
  totalCashTips: (store, getters) => store.lists.lists.reduce((acc, list) => {
    const tips = getters.getListTipsByType(list.id, 'cash')

    return acc + tips.reduce((tipsAcc, tip) => tipsAcc + tip.value, 0)
  }, 0),
  totalCashTipsCount: (store, getters) =>
    store.lists.lists.reduce((acc, list) => acc + getters.getListTipsByType(list.id, 'cash').length, 0),
  totalTips: (store, getters) => getters.totalCardTips + getters.totalCashTips,
  totalTipsCount: (store, getters) => getters.totalCardTipsCount + getters.totalCardTipsCount,
  totalInterests: (store, getters) => store.lists.lists.reduce((acc, list) => {
    const interests = getters.getListInterests(list.id)

    return acc + interests.reduce((interestsAcc, interest) => {
      const interestNetValue = getters.getInterestNetValue(interest.id)

      return interestsAcc + interestNetValue
    }, 0)
  }, 0),
  totalInterestsGrossNoTax: (store, getters) => store.lists.lists.reduce((acc, list) => {
    const interests = getters.getListInterests(list.id)

    return acc + interests.reduce((interestsAcc, interest) => {
      const procedureNetValue = getters.getProcedureNetValue(interest.id)

      return interestsAcc + procedureNetValue
    }, 0)
  }, 0),
  totalInterestsCount: (store, getters) =>
    store.lists.lists.reduce((acc, list) => acc + getters.getListInterests(list.id).length, 0),
  totalMoneyNoCashTips: (store, getters) => getters.totalSalary + getters.totalCardTips + getters.totalInterests,
  totalMoney: (store, getters) => getters.totalSalary + getters.totalTips + getters.totalInterests,
}

const mutations = {}

const actions = {
  async [IMPORT_STORE](context, store) {
    importStore(store)
    context.dispatch(LOAD_STORE)
  },
  async [EXPORT_STORE]() {
    exportStore()
  },
  async [LOAD_STORE](context) {
    context.dispatch(LOAD_SETTINGS)
    context.dispatch(LOAD_LISTS)
    context.dispatch(LOAD_RECORDS)
    context.dispatch(LOAD_TIPS)
    context.dispatch(LOAD_INTERESTS)
    context.dispatch(LOAD_ARCHIVES)
  },
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
  modules: {
    lists,
    records,
    tips,
    interests,
    settings,
    archives,
  },
})

export default store

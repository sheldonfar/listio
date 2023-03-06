import Vue from 'vue'
import Vuex from 'vuex'

import lists from './lists'
import records from './records'
import tips from './tips'
import interests from './interests'
import settings from './settings'
import archives from './archives'

Vue.use(Vuex)

const state = {}

const getters = {
  getProcedureNetValue: (store, getters) => interestId =>
    Math.round(getters.getInterestGrossValue(interestId) / (1 + store.settings.taxRate / 100)),
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

const actions = {}

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

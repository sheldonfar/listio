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
  getProcedureNetValue: (store, getters) => interestId => {
    return Math.round(getters.getInterestGrossValue(interestId) / (1 + store.settings.taxRate / 100))
  },
  getInterestNetValue: (store, getters) => interestId => {
    return Math.round(getters.getProcedureNetValue(interestId) * store.settings.interestRate / 100)
  },
  totalHours: (store, getters) => {
    return store.lists.lists.reduce((acc, list) => {
      const records = getters.getListRecords(list.id)

      return acc + records.reduce((recordsAcc, record) => {
          return recordsAcc + record.value
      }, 0)
    }, 0)
  },
  totalSalary: (store, getters) => {
    return getters.totalHours * store.settings.hourlyRate
  },
  totalCardTips: (store, getters) => { 
      return store.lists.lists.reduce((acc, list) => {
          const tips = getters.getListTipsByType(list.id, 'card')

          return acc + tips.reduce((tipsAcc, tip) => {
              return tipsAcc + tip.value
          }, 0)
      }, 0)
  },
  totalCashTips: (store, getters) => {
      return store.lists.lists.reduce((acc, list) => {
          const tips = getters.getListTipsByType(list.id, 'cash')

          return acc + tips.reduce((tipsAcc, tip) => {
              return tipsAcc + tip.value
          }, 0)
      }, 0)
  },
  totalTips: (store, getters) => {
      return getters.totalCardTips + getters.totalCashTips
  },
  totalInterests: (store, getters) => {
      return store.lists.lists.reduce((acc, list) => {
          const interests = getters.getListInterests(list.id)

          return acc + interests.reduce((interestsAcc, interest) => {
              const interestNetValue = getters.getInterestNetValue(interest.id)

              return interestsAcc + interestNetValue
          }, 0)
      }, 0)   
  },
  totalMoney: (store, getters) => {
      return getters.totalSalary + getters.totalTips + getters.totalInterests
  },
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
  }
})

export default store

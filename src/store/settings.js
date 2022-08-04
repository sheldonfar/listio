import { loadStore, saveToStore } from '../api'

export const EDIT_HOURLY_RATE = 'settings/EDIT_HOURLY_RATE'
export const EDIT_TAX_RATE = 'settings/EDIT_TAX_RATE'
export const EDIT_INTEREST_RATE = 'settings/EDIT_INTEREST_RATE'

export const SET_SETTINGS = 'settings/SET_SETTINGS'
export const SAVE_SETTINGS = 'settings/SAVE_SETTINGS'
export const LOAD_SETTINGS = 'settings/LOAD_SETTINGS'

const state = {
  hourlyRate: 15,
  interestRate: 10,
  taxRate: 23,
}

const getters = {
  hourlyRate: store => store.hourlyRate,
  interestRate: store => store.interestRate,
  taxRate: store => store.taxRate,
}

const mutations = {
  [SET_SETTINGS] (state, settings) {
    state.settings = settings
  },
  [EDIT_HOURLY_RATE] (state, rate) {
    state.hourlyRate = rate
  },
  [EDIT_INTEREST_RATE] (state, rate) {
    state.interestRate = rate
  },
  [EDIT_TAX_RATE](state, rate) {
    state.taxRate = rate
  }
}

const actions = {
  async [EDIT_HOURLY_RATE] (context, rate) {
    context.commit(EDIT_HOURLY_RATE, rate)
    await context.dispatch(SAVE_SETTINGS)
  },
  async [EDIT_TAX_RATE] (context, rate) {
    context.commit(EDIT_TAX_RATE, rate)
    await context.dispatch(SAVE_SETTINGS)
  },
  async [EDIT_INTEREST_RATE] (context, rate) {
    context.commit(EDIT_INTEREST_RATE, rate)
    await context.dispatch(SAVE_SETTINGS)
  },
  async [LOAD_SETTINGS] (context) {
    const settings = loadStore('settings')
    context.commit(SET_SETTINGS, settings)
  },
  [SAVE_SETTINGS] (context) {
    saveToStore('settings', context.state.settings)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

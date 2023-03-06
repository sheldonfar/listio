import { loadStore, saveToStore } from '../api'

export const EDIT_HOURLY_RATE = 'settings/EDIT_HOURLY_RATE'
export const EDIT_TAX_RATE = 'settings/EDIT_TAX_RATE'
export const EDIT_INTEREST_RATE = 'settings/EDIT_INTEREST_RATE'
export const EDIT_REQUIRED_EARNINGS_PER_HOUR = 'settings/EDIT_REQUIRED_EARNINGS_PER_HOUR'

export const SET_SETTINGS = 'settings/SET_SETTINGS'
export const SAVE_SETTINGS = 'settings/SAVE_SETTINGS'
export const LOAD_SETTINGS = 'settings/LOAD_SETTINGS'
export const TOGGLE_SETTINGS_EXPANDED = 'settings/TOGGLE_SETTINGS_EXPANDED'

const state = {
  expanded: true,
  hourlyRate: 15,
  interestRate: 10,
  taxRate: 23,
  requiredEarningsPerHour: 90,
}

const getters = {
  hourlyRate: store => store.hourlyRate,
  interestRate: store => store.interestRate,
  taxRate: store => store.taxRate,
  settingsExpanded: store => store.expanded,
  requiredEarningsPerHour: store => store.requiredEarningsPerHour,
}

const mutations = {
  [SET_SETTINGS](state, settings) {
    Object.keys(settings).forEach(key => {
      state[key] = settings[key]
    })
  },
  [EDIT_HOURLY_RATE](state, rate) {
    state.hourlyRate = rate
  },
  [EDIT_INTEREST_RATE](state, rate) {
    state.interestRate = rate
  },
  [EDIT_TAX_RATE](state, rate) {
    state.taxRate = rate
  },
  [EDIT_REQUIRED_EARNINGS_PER_HOUR](state, requiredEarningsPerHour) {
    state.requiredEarningsPerHour = requiredEarningsPerHour
  },
  [TOGGLE_SETTINGS_EXPANDED](state, expanded) {
    state.expanded = expanded
  },
}

const actions = {
  async [EDIT_HOURLY_RATE](context, rate) {
    context.commit(EDIT_HOURLY_RATE, rate)
    await context.dispatch(SAVE_SETTINGS)
  },
  async [EDIT_TAX_RATE](context, rate) {
    context.commit(EDIT_TAX_RATE, rate)
    await context.dispatch(SAVE_SETTINGS)
  },
  async [EDIT_INTEREST_RATE](context, rate) {
    context.commit(EDIT_INTEREST_RATE, rate)
    await context.dispatch(SAVE_SETTINGS)
  },
  async [EDIT_REQUIRED_EARNINGS_PER_HOUR](context, requiredEarningsPerHour) {
    context.commit(EDIT_REQUIRED_EARNINGS_PER_HOUR, requiredEarningsPerHour)
    await context.dispatch(SAVE_SETTINGS)
  },
  async [TOGGLE_SETTINGS_EXPANDED](context, expanded) {
    context.commit(TOGGLE_SETTINGS_EXPANDED, expanded)
    await context.dispatch(SAVE_SETTINGS)
  },
  async [LOAD_SETTINGS](context) {
    const settings = loadStore('settings')

    if (settings) {
      context.commit(SET_SETTINGS, settings)
    }
  },
  [SAVE_SETTINGS](context) {
    saveToStore('settings', context.state)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}

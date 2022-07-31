import { loadStore, saveToStore } from '../api'

export const EDIT_HOURLY_RATE = 'settings/EDIT_HOURLY_RATE'

export const SET_SETTINGS = 'settings/SET_SETTINGS'
export const SAVE_SETTINGS = 'settings/SAVE_SETTINGS'
export const LOAD_SETTINGS = 'settings/LOAD_SETTINGS'

const state = {
  hourlyRate: 15
}

const getters = {
  hourlyRate: store => store.hourlyRate
}

const mutations = {
  [SET_SETTINGS] (state, settings) {
    state.settings = settings
  },
  [EDIT_HOURLY_RATE] (state, rate) {
    state.hourlyRate = rate
  }
}

const actions = {
  async [EDIT_HOURLY_RATE] (context, rate) {
    context.commit(EDIT_HOURLY_RATE, rate)
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

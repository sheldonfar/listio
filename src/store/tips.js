import { v4 as uuid } from 'uuid'

import { loadStore, saveToStore } from '../api'

export const ADD_TIP = 'tips/ADD_TIP'
export const REMOVE_TIP = 'tips/REMOVE_TIP'

export const CLEAR_TIPS = 'tips/CLEAR_TIPS'

export const SET_TIPS = 'tips/SET_TIPS'
export const SAVE_TIPS = 'tips/SAVE_TIPS'
export const LOAD_TIPS = 'tips/LOAD_TIPS'

const state = {
  tips: [],
}

const getters = {
  getListTips: store => listId => store.tips.filter(tip => tip.listId === listId),
  getListTipsByType: store => (listId, type) => store.tips.filter(tip => tip.listId === listId && tip.type === type),
}

const mutations = {
  [SET_TIPS](state, tips) {
    state.tips = tips
  },
  [ADD_TIP](state, tip) {
    const newTip = {
      ...tip,
      id: uuid(),
    }
    state.tips.push(newTip)
  },
  [CLEAR_TIPS](state) {
    state.tips = []
  },
  [REMOVE_TIP](state, tipId) {
    state.tips = state.tips.filter(({ id }) => id !== tipId)
  },
}

const actions = {
  async [ADD_TIP](context, tip) {
    context.commit(ADD_TIP, tip)
    await context.dispatch(SAVE_TIPS)
  },
  async [REMOVE_TIP](context, tipId) {
    context.commit(REMOVE_TIP, tipId)
    await context.dispatch(SAVE_TIPS)
  },
  async [LOAD_TIPS](context) {
    const tips = loadStore('tips')

    if (tips) {
      context.commit(SET_TIPS, tips)
    }
  },
  async [CLEAR_TIPS](context) {
    context.commit(CLEAR_TIPS)
    await context.dispatch(SAVE_TIPS)
  },
  async [SET_TIPS](context, tips) {
    context.commit(SET_TIPS, tips)
    await context.dispatch(SAVE_TIPS)
  },
  [SAVE_TIPS](context) {
    saveToStore('tips', context.state.tips)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}

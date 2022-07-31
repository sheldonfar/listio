import { v4 as uuid } from 'uuid'

import { loadStore, saveToStore } from '../api'

export const ADD_TIP = 'tips/ADD_TIP'
export const REMOVE_TIP = 'tips/REMOVE_TIP'

export const SET_TIPS = 'tips/SET_TIPS'
export const SAVE_TIPS = 'tips/SAVE_TIPS'
export const LOAD_TIPS = 'tips/LOAD_TIPS'

const state = {
  tips: []
}

const getters = {
    getListTips: store => listId => store.tips.filter(tip => tip.listId === listId)
}

const mutations = {
  [SET_TIPS] (state, tips) {
    state.tips = tips
  },
  [ADD_TIP] (state, tip) {
    const newTip = {
      ...tip,
      id: uuid()
    }
    state.tips.push(newTip)
  },
  [REMOVE_TIP] (state, tipId) {
    state.tips = state.tips.filter(({ id }) => id !== tipId)
  }
}

const actions = {
    async [ADD_TIP] (context, tip) {
        context.commit(ADD_TIP, tip)
        await context.dispatch(SAVE_TIPS)
    },
    async [REMOVE_TIP] (context, tipId) {
        context.commit(REMOVE_TIP, tipId)
        await context.dispatch(SAVE_TIPS)
    },
    async [LOAD_TIPS] (context) {
        const tips = loadStore('tips')

        if (tips) {
            context.commit(SET_TIPS, tips)
        }
    },
    [SAVE_TIPS] (context) {
        saveToStore('tips', context.state.tips)
    }
}

export default {
  state,
  getters,
  mutations,
  actions
}

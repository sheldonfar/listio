import { v4 as uuid } from 'uuid'

import { loadStore, saveToStore } from '../api'

export const ADD_INTEREST = 'tips/ADD_INTEREST'
export const REMOVE_INTEREST = 'tips/REMOVE_INTEREST'

export const SET_INTERESTS = 'tips/SET_INTERESTS'
export const SAVE_INTERESTS = 'tips/SAVE_INTERESTS'
export const LOAD_INTERESTS = 'tips/LOAD_INTERESTS'

const state = {
  interests: []
}

const getters = {
    getListInterests: store => listId => store.interests.filter(interest => interest.listId === listId),
}

const mutations = {
  [SET_INTERESTS] (state, interests) {
    state.interests = interests
  },
  [ADD_INTEREST] (state, interest) {
    const newInterest = {
      ...interest,
      id: uuid()
    }
    state.interests.push(newInterest)
  },
  [REMOVE_INTEREST] (state, interestId) {
    state.interests = state.interests.filter(({ id }) => id !== interestId)
  }
}

const actions = {
    async [ADD_INTEREST] (context, interest) {
        context.commit(ADD_INTEREST, interest)
        await context.dispatch(SAVE_INTERESTS)
    },
    async [REMOVE_INTEREST] (context, interestId) {
        context.commit(REMOVE_INTEREST, interestId)
        await context.dispatch(SAVE_INTERESTS)
    },
    async [LOAD_INTERESTS] (context) {
        const interests = loadStore('interests')

        if (interests) {
            context.commit(SET_INTERESTS, interests)
        }
    },
    [SAVE_INTERESTS] (context) {
        saveToStore('interests', context.state.interests)
    }
}

export default {
  state,
  getters,
  mutations,
  actions
}

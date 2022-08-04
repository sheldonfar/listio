import { v4 as uuid } from 'uuid'

import { loadStore, saveToStore } from '../api'

export const SET_LISTS = 'lists/SET_LISTS'
export const LOAD_LISTS = 'lists/LOAD_LISTS'
export const SAVE_LISTS = 'lists/SAVE_LISTS'

export const REMOVE_LIST = 'lists/REMOVE_LIST'
export const ADD_LIST = 'lists/ADD_LIST'
export const EDIT_LIST = 'lists/EDIT_LIST'

const state = {
  lists: [
    {
      id: uuid(),
      name: 'Default list 1'
    },
    {
      id: uuid(),
      name: 'Default list 2'
    },
    {
      id: uuid(),
      name: 'Default list 3'
    }
  ],
}

const getters = {
  getListById: store => selectedList => store.lists.find(({ id }) => id === selectedList),
  lists: (store) => store.lists
}

const mutations = {
  [SET_LISTS] (state, lists) {
    state.lists = lists
  },
  [REMOVE_LIST] (state, listId) {
    state.lists = state.lists.filter(item => item.id !== listId)
  },
  [ADD_LIST] (state, list) {
    state.lists.push({ ...list, id: uuid() })
  },
  [EDIT_LIST] (state, list) {
    const oldList = state.lists.find(item => item.id === list.id)
    Object.assign(oldList, list)
  }
}

const actions = {
  async [ADD_LIST] (context, list) {
    context.commit(ADD_LIST, list)
    await context.dispatch(SAVE_LISTS)
  },
  async [REMOVE_LIST] (context, listId) {
    context.commit(REMOVE_LIST, listId)
    await context.dispatch(SAVE_LISTS)
  },
  async [EDIT_LIST] (context, list) {
    context.commit(EDIT_LIST, list)
    await context.dispatch(SAVE_LISTS)
  },
  async [LOAD_LISTS] (context) {
    const lists = loadStore('lists')
    if (lists) {
      context.commit(SET_LISTS, lists)
    } else {
      await context.dispatch(SAVE_LISTS)
    }
  },
  async [SAVE_LISTS] (context) {
    saveToStore('lists', context.state.lists)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

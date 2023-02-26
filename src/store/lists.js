import { v4 as uuid } from 'uuid'

import { loadStore, saveToStore } from '../api'

export const SET_LISTS = 'lists/SET_LISTS'
export const LOAD_LISTS = 'lists/LOAD_LISTS'
export const SAVE_LISTS = 'lists/SAVE_LISTS'

export const REMOVE_LIST = 'lists/REMOVE_LIST'
export const ADD_LIST = 'lists/ADD_LIST'
export const EDIT_LIST = 'lists/EDIT_LIST'
export const SELECT_LIST = 'lists/SELECT_LIST'

const defaultLists = [
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
]

const state = {
  selectedListId: defaultLists[0].id,
  lists: defaultLists,
}

const getters = {
  getListById: store => selectedList => store.lists.find(({ id }) => id === selectedList),
  lists: store => store.lists,
  selectedList: (store, getters) => getters.getListById(store.selectedListId),
}

const mutations = {
  [SET_LISTS] (state, lists) {
    state.lists = lists

    if (lists.length > 0) {
      state.selectedListId = lists[0].id
    }
  },
  [REMOVE_LIST] (state, listId) {
    state.lists = state.lists.filter(item => item.id !== listId)

    if (state.lists[0]) {
      state.selectedListId = state.lists[0].id
    }
  },
  [ADD_LIST] (state, list) {
    state.lists.push({ ...list, id: uuid() })
  },
  [EDIT_LIST] (state, list) {
    const oldList = state.lists.find(item => item.id === list.id)
    Object.assign(oldList, list)
  },
  [SELECT_LIST] (state, listId) {
    state.selectedListId = listId
  },
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
  async [SELECT_LIST] (context, listId) {
    context.commit(SELECT_LIST, listId)
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

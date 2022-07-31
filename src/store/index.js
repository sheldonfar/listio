import Vue from 'vue'
import Vuex from 'vuex'

import lists from './lists'
import records from './records'
import settings from './settings'

Vue.use(Vuex)

const state = {}

const getters = {}

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
    settings,
  }
})

export default store

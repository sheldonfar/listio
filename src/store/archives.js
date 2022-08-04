import { v4 as uuid } from 'uuid'

import { loadStore, saveToStore, removeFromStore } from '../api'
import { SET_INTERESTS, CLEAR_INTERESTS } from './interests'
import { SET_RECORDS, CLEAR_RECORDS } from './records'
import { SET_TIPS, CLEAR_TIPS } from './tips'

export const ADD_ARCHIVE = 'archives/ADD_ARCHIVE'
export const EDIT_ARCHIVE = 'archives/EDIT_ARCHIVE'
export const REMOVE_ARCHIVE = 'archives/REMOVE_ARCHIVE'

export const LOAD_ARCHIVE = 'archives/LOAD_ARCHIVE'
export const CLEAR_CURRENT_ARCHIVE = 'archives/CLEAR_CURRENT_ARCHIVE'

export const SAVE_ARCHIVES = 'archives/SAVE_ARCHIVES'
export const LOAD_ARCHIVES = 'archives/LOAD_ARCHIVES'
export const SET_ARCHIVES = 'archives/SET_ARCHIVES'

const state = {
    currentArchiveId: null,
    archives: []
}

const getters = {
  archives: store => store.archives,
  getArchiveById: store => archiveId => store.archives.find(archive => archive.id === archiveId),
  currentArchive: (store, getters) => getters.getArchiveById(store.currentArchiveId),
}

const mutations = {
    [SET_ARCHIVES] (state, archives) {
        state.archives = archives
    },
    [LOAD_ARCHIVE] (state, archiveId) {
        state.currentArchiveId = archiveId
    },
    [ADD_ARCHIVE] (state, archive) {
        state.archives.push(archive)
    },
    [EDIT_ARCHIVE] (state, archive) {
        const oldArchive = state.archives.find(item => item.id === archive.id)
        Object.assign(oldArchive, archive)
    },
    [CLEAR_CURRENT_ARCHIVE] (state) {
        state.currentArchiveId = null
    },
    [REMOVE_ARCHIVE] (state, archiveId) {
        state.archives = state.archives.filter(({ id }) => id !== archiveId)
    }
}

const actions = {
  async [ADD_ARCHIVE] (context, archive) {
    const newArchive = {
        ...archive,
        id: uuid(),
        records: context.rootState.records.records,
        tips: context.rootState.tips.tips,
        interests: context.rootState.interests.interests,
    }
    context.commit(ADD_ARCHIVE, newArchive)
    await context.dispatch(SAVE_ARCHIVES)

    await context.dispatch(CLEAR_INTERESTS)
    await context.dispatch(CLEAR_RECORDS)
    await context.dispatch(CLEAR_TIPS)
  },
  async [CLEAR_CURRENT_ARCHIVE] (context) {
    context.commit(CLEAR_CURRENT_ARCHIVE)

    const pendingArchive = loadStore('pendingArchive')

    await context.dispatch(SET_INTERESTS, pendingArchive.interests)
    await context.dispatch(SET_RECORDS, pendingArchive.records)
    await context.dispatch(SET_TIPS, pendingArchive.tips)

    removeFromStore('pendingArchive')
  },
  async [LOAD_ARCHIVE] (context, archiveId) {    
    if (!context.state.currentArchiveId) {
        const pendingArchive = {
            records: context.rootState.records.records,
            tips: context.rootState.tips.tips,
            interests: context.rootState.interests.interests,
        }

        saveToStore('pendingArchive', pendingArchive)
    }

    context.commit(LOAD_ARCHIVE, archiveId)
    
    const archive = context.getters.getArchiveById(archiveId)

    await context.dispatch(SET_INTERESTS, archive.interests)
    await context.dispatch(SET_RECORDS, archive.records)
    await context.dispatch(SET_TIPS, archive.tips)
  },
  async [EDIT_ARCHIVE] (context, archive) {
    context.commit(EDIT_ARCHIVE, archive)
    await context.dispatch(SAVE_ARCHIVES)
  },
  async [REMOVE_ARCHIVE] (context, archiveId) {
    context.commit(REMOVE_ARCHIVE, archiveId)
    await context.dispatch(SAVE_ARCHIVES)
  },
  async [LOAD_ARCHIVES] (context) {
    const archives = loadStore('archives')

    if (archives) {
      context.commit(SET_ARCHIVES, archives)
    }
  },
  [SAVE_ARCHIVES] (context) {
    saveToStore('archives', context.state.archives)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

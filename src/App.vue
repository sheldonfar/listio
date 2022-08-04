<template>
  <div id="app">
    <Navbar />
    <div
      id="content"
      class="d-flex flex-column px-2 px-md-4"
    >
      <Settings />
      <NavList />
      <Totals />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Navbar from '@/components/Navbar.vue'
import NavList from '@/components/NavList.vue'
import Settings from '@/components/Settings.vue'
import Totals from '@/components/Totals.vue'

import { LOAD_LISTS } from '@/store/lists'
import { LOAD_RECORDS } from '@/store/records'
import { LOAD_TIPS } from '@/store/tips'
import { LOAD_INTERESTS } from '@/store/interests'
import { LOAD_SETTINGS } from '@/store/settings'
import { LOAD_ARCHIVES } from './store/archives'

export default {
  name: 'App',
  components: {
    Navbar,
    Settings,
    NavList,
    Totals,
  },
   created () {
    this[LOAD_SETTINGS]()
    this[LOAD_LISTS]()
    this[LOAD_RECORDS]()
    this[LOAD_TIPS]()
    this[LOAD_INTERESTS]()
    this[LOAD_ARCHIVES]()
  },
  methods: {
    ...mapActions([
      LOAD_SETTINGS,
      LOAD_LISTS,
      LOAD_RECORDS,
      LOAD_TIPS,
      LOAD_INTERESTS,
      LOAD_ARCHIVES,
    ])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#content {
  padding-top: 85px;
}
</style>

<template>
  <div
    id="app"
    class="d-flex flex-column px-2 px-md-4 mt-md-5 mt-4"
  >
    <Settings />
    <NavList />
    <Totals />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import NavList from '@/components/NavList.vue'
import Settings from '@/components/Settings.vue'
import Totals from '@/components/Totals.vue'

import { LOAD_LISTS } from '@/store/lists'
import { LOAD_RECORDS } from '@/store/records'
import { LOAD_TIPS } from '@/store/tips'
import { LOAD_SETTINGS } from '@/store/settings'

export default {
  name: 'App',
  components: {
    Settings,
    NavList,
    Totals,
  },
   created () {
    this[LOAD_SETTINGS]()
    this[LOAD_LISTS]()
    this[LOAD_RECORDS]()
    this[LOAD_TIPS]()
  },
  methods: {
    ...mapActions([
      LOAD_SETTINGS,
      LOAD_LISTS,
      LOAD_RECORDS,
      LOAD_TIPS,
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
</style>

<template>
  <div
    id="app"
    class="d-flex flex-column px-4"
  >
    <Settings />
    <NavList />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import NavList from '@/components/NavList.vue'
import Settings from '@/components/Settings.vue'

import { LOAD_LISTS } from '@/store/lists'
import { LOAD_RECORDS } from '@/store/records'
import { LOAD_SETTINGS } from '@/store/settings'

export default {
  name: 'App',
  components: {
    Settings,
    NavList
  },
   created () {
    this[LOAD_SETTINGS]()
    this[LOAD_LISTS]()
    this[LOAD_RECORDS]()
  },
  methods: {
    ...mapActions([
      LOAD_SETTINGS,
      LOAD_LISTS,
      LOAD_RECORDS,
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
  margin-top: 60px;
}
</style>

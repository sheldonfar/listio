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
    <Bottombar />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Navbar from '@/components/Navbar.vue'
import NavList from '@/components/NavList.vue'
import Settings from '@/components/Settings.vue'
import Totals from '@/components/Totals.vue'
import Bottombar from '@/components/Bottombar.vue'

import { LOAD_STORE } from '@/store'

export default {
  name: 'App',
  components: {
    Navbar,
    Settings,
    NavList,
    Totals,
    Bottombar,
  },
  created() {
    this[LOAD_STORE]()
  },
  methods: {
    ...mapActions([
      LOAD_STORE,
    ]),
  },
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
  padding-top: 60px;
  padding-bottom: 65px;
}
</style>

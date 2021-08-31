<template>
  <AppTitle />

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppTitle from './components/atoms/AppTitle.vue';

export default defineComponent({
  components: {
    AppTitle,
  },

  // setup() {},
});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

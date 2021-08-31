<template>
  <div class="not-found">
    <h1>Not Found</h1>
    <p>
      Oops, we couldn't find that page. All activities is at
      <router-link to="/">home</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // setup() {},
});
</script>

<style scoped>
.not-found {
  padding: 20px;
  text-align: center;
}
</style>

<template>
  <div>{{ itemTotalCost }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    itemTotalCost: {
      type: Number as PropType<number>,
      required: true,
    },
  },
});
</script>

<style scoped>
</style>

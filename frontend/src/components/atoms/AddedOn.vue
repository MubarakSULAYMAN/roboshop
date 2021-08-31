<template>
  <p class="card-details_date">
    <!-- Added on <time>{{ dateAdded }}</time> -->
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    dateCreated: {
      type: Date as PropType<Date>,
      required: true,
    },
  },
});
</script>

<style scoped>
.card-details_date {
  font-size: var(--font-xs);
  line-height: 2;
}
</style>

<template>
  <button @click="close">CLOSE</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props, { emit }) {
    const show = ref<boolean>(true);

    const close = () => {
      show.value = false;
      emit('close', show.value);
    };

    return {
      close,
    };
  },
});
</script>

<style scoped>
button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  color: var(--white);
  border: none;
  background-color: var(--red);
}
</style>

<template>
  <transition name="fly">
    <div :class="['overlay', isWarning ? 'shake' : '']">
      <CancleButton @close="$emit('close')" />

      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CancleButton from '../atoms/CancleButton.vue';

export default defineComponent({
  components: {
    CancleButton,
  },

  props: {
    isWarning: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .overlay {
    background-color: transparent;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }
}

.fly-enter {
  transform: scaleY(0) translate(-999px);
}

.fly-enter-active,
.fly-leave-active {
  transition: transform 0.5s ease-in-out;
}

.fly-leave-to {
  transform: scaleY(0) translate(-999px);
}

@keyframes shake {
  from {
    transform: rotate(1deg) translate(5px);
    -webkit-transform: rotate(1deg);
  }

  to {
    transform-origin: center center;
    -webkit-transform-origin: center center;
    transform: rotate(-1deg) translate(-5px);
    -webkit-transform: rotate(-1deg) translate(-5px);
  }
}
</style>

<template>
  <button class="cart-toggle" @click="toggleIsCart">
    <i class="fad fa-cart-plus" v-if="isCart"></i>
    <i class="fal fa-cart-arrow-down" v-else></i>
  </button>
  <!-- cart-arrow-down l -->
  <!-- shopping-cart l-->
  <!-- cart-plus d -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['toggleIsCart'],

  setup(props, { emit }) {
    const isCart = ref<boolean>(false);

    const toggleIsCart = () => {
      isCart.value = !isCart.value;
      emit('toggleIsCart', isCart.value);
    };

    return {
      isCart,
      toggleIsCart,
    };
  },
});
</script>

<style scoped>
.cart-toggle {
  display: none;
}

@media screen and (max-width: 425px) {
  .cart-toggle {
    display: block;
    position: fixed;
    bottom: 10px;
    left: 10px;
    padding: 10px;
    color: var(--white);
    font-size: 20px;
    border: none;
    border-radius: 50%;
    background-color: var(--green-light);
  }

  .cart-toggle:hover,
  .cart-toggle:focus {
    box-shadow: -2px 2px var(--green-lighter);
  }
}
</style>

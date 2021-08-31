<template>
  <button class="add-to-cart" @click="addToCart(product, productId)">
    <strong v-if="stockCount === 0">Out of Stock</strong>
    <strong v-else>Add to Cart</strong>
    <!-- {{ productId }} -->
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AvailableGoods from '../../types/AvailableGoods';

export default defineComponent({
  props: {
    productId: {
      type: Number as PropType<number>,
      required: true,
    },

    product: {
      type: Object as PropType<AvailableGoods>,
      required: true,
    },

    stockCount: {
      type: Number as PropType<number>,
      required: true,
    },
  },

  emits: ['updateSelectedItems'],

  setup(props, { emit }) {
    const addToCart = (currentItem: AvailableGoods) => {
      emit('updateSelectedItems', { item: currentItem, id: props.productId });
    };

    return {
      addToCart,
    };
  },
});
</script>

<style scoped>
.add-to-cart {
  position: absolute;
  top: -20px;
  right: -10px;
  padding: 5px 10px;
  color: var(--white);
  font-size: var(--font-md);
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: var(--green-fade);
}

.add-to-cart:hover {
  /* .add-to-cart:focus { */
  box-shadow: -10px 20px 15px -10px rgba(17, 233, 91, 0.3);
}

.add-to-cart:disabled {
  background-color: var(--red);
}
</style>

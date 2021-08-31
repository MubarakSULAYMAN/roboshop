<template>
  <div class="filter">
    <strong>Filter by</strong>
    <button
    :class="[order === material ? 'active' : '']"
      v-for="material in materials"
      :key="material"
      @click="sortGoods(material)"
    >
      {{ material }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import AvailableGoods from '../../types/AvailableGoods';
import OrderTerm from '../../types/OrderTerm';

export default defineComponent({
  props: {
    availableGoods: {
      type: [Array, Object] as PropType<AvailableGoods[]>,
      required: true,
    },
  },

  emits: ['sortItems'],

  setup(props, { emit }) {
    const materials = ['name', 'material', 'price'];

    const order = ref<OrderTerm>();

    const sortGoods = (term: OrderTerm) => {
      order.value = term;
      emit('sortItems', term);
    };

    return {
      order,
      materials,
      sortGoods,
    };
  },
});
</script>

<style scoped>
.filter {
  padding: 10px 0 0 20px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  color: var(--white);
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  background-color: var(--orange-light);
}

button.active {
  background-color: var(--orange-dark);
}
</style>

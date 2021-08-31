<template>
  <p class="category-filter">
    <label for="cars">Show robots made of</label>
    <select v-model="materialType">
      <option disabled value="all">all</option>
      <option
        v-for="(material, index) in availableMaterials"
        :key="index"
        @click="itemCategory"
      >
        {{ material }}
      </option>
    </select>
    material<span v-if="materialType === 'all'">s</span>.
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    availableMaterials: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  emits: ['showItemsInCategory'],

  setup(props, { emit }) {
    const materialType = ref<string>('all');

    const itemCategory = () => {
      emit('showItemsInCategory', materialType.value);
    };

    return {
      materialType,
      itemCategory,
    };
  },
});
</script>

<style scoped>
.category-filter {
  padding: 20px 20px 0;
}

select {
  margin: 0 5px;
  /* border: 1px solid var(--green-fade); */
  border: 1px solid var(--orange-light);
  border-radius: 4px;
}
</style>

<template>
  <div class="input-group flex-row">
    <!-- {{ totalCost }} -->
    <button @click="decrement"><b>-</b></button>
    <input type="number" min="0" :max="stockCount" :value="desiredAmount" />
    <button @click="increment"><b>+</b></button>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref, watch,
} from 'vue';
import AvailableGoods from '../../types/AvailableGoods';

export default defineComponent({
  props: {
    stockCount: {
      type: Number as PropType<number>,
      required: true,
    },

    selectedProducts: {
      type: [Array, Object] as PropType<AvailableGoods[]>,
      required: true,
    },

    selectedProductsId: {
      type: Array as PropType<number[]>,
      required: true,
    },

    currentIndex: {
      type: Number as PropType<number>,
      required: true,
    },

    price: {
      // type: Number as PropType<number>,
      type: String as PropType<string>,
      required: true,
    },
  },

  // emits: ['updateStock', 'removeItem'],
  emits: ['updateCount', 'removeItem'],

  setup(props, { emit }) {
    const desiredAmount = ref<number>(1);
    const remaingStock = ref<number>();

    // function toTwoDecimalPlace(num: number | string) {
    //   return +(Math.round(num + 'e+2') + 'e-2');
    // }

    function roundVal(num: number) {
      const m = Number((Math.abs(num) * 100).toPrecision(15));
      return (Math.round(m) / 100) * Math.sign(num);
    }

    const totalCost = computed(() => roundVal(parseFloat(props.price) * desiredAmount.value));

    function makeUpdate() {
      remaingStock.value = props.stockCount - desiredAmount.value;
      // emit('totalExpense', totalCost.value);
      // emit('updateCount', desiredAmount.value);
      // emit('totalExpense', parseFloat(props.price));
      // emit('updateStock', {
      //   currentStock: remaingStock,
      //   itemIndex: props.currentIndex,
      // });
      // console.log('stockCount', props.stockCount);
      console.log('desiredAmount', desiredAmount.value);
      // console.log('price', parseFloat(props.price));
      // console.log('remaingStock', remaingStock.value);
      // console.log('currentIndex', props.currentIndex);
      // console.log('totalCost', totalCost.value);
    }

    makeUpdate();

    // watch(desiredAmount, (newValue, oldValue) => {
    watch(desiredAmount, () => {
      makeUpdate();
    });

    const decrement = () => {
      if (desiredAmount.value >= 1) {
        desiredAmount.value -= 1;
        if (desiredAmount.value === 0) {
          emit('removeItem', props.currentIndex);
        }
      }
    };

    // x.filter(y => {return 2 !== y})

    const increment = () => {
      if (desiredAmount.value < props.stockCount) {
        desiredAmount.value += 1;
      }
    };

    return {
      remaingStock,
      desiredAmount,
      totalCost,
      decrement,
      increment,
    };
  },
});
</script>

<style scoped>
.input-group {
  justify-content: space-between;
}

.input-group button {
  padding: 2px 8px;
  color: var(--white);
  font-size: var(--font-md);
  border: 1px solid transparent;
  border-radius: 5px;
}

.input-group button:nth-of-type(1) {
  background-color: var(--orange-dark);
}

.input-group button:nth-last-of-type(1) {
  background-color: var(--green-fade);
}

.input-group input {
  width: 50px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>

function watch(stockCount: number, arg1: number) {
  throw new Error('Function not implemented.');
}

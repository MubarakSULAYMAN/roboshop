<template>
  <div class="home grid">
    <section>
      <BaseFilter :availableGoods="availableGoods" @sortItems="sortItems" />

      <CategoryFilter
        :availableMaterials="availableMaterials"
        @showItemsInCategory="showItemsInCategory"
      />

      <CardItem
        :products="goodsInCategory"
        class="flex-row flex-wrap"
      >
        <template v-slot:add-to-cart="{ item, productId, stockCount }">
          <AddToCart
            :product="item"
            :productId="productId"
            :disabled="stockCount === 0"
            :stockCount="stockCount"
            @updateSelectedItems="getSelectedItems"
          />
        </template>

        <template v-slot:created-on="{ dateCreated }">
          Created on <time>{{ formatDate(dateCreated) }}</time>
        </template>
      </CardItem>
    </section>

    <section
      :class="[
        isCart ? 'cart-area__active' : 'cart-area__inactive',
        'cart-area',
      ]"
    >
      <div class="cart-area__wrap">
        <CartTitle />

        <CartEmpty v-if="!selectedItems.length" />

        <CardItem
          :products="selectedItems"
          class="flex-row flex-wrap"
        >
          <template v-slot:added-on="{ currentIndex }">
            Added on <time>{{ formatDate(dateAdded[currentIndex]) }}</time>
          </template>

          <template v-slot:change-count="{ stockCount, productId, price }">
            <CardInputGroup
              ref="inputGroup"
              :selectedProducts="selectedItems"
              :selectedProductsId="selectedItemsId"
              :currentIndex="productId"
              :stockCount="stockCount"
              :price="price"
              @removeItem="removeItem"
            />
          </template>

          <!-- <template v-slot:total-price="{ itemTotalCost }">
            <ItemTotalPrice :itemTotalCost="itemTotalCost" />
          </template> -->
        </CardItem>
      </div>
    </section>
  </div>

  <ToggleButton @toggleIsCart="toggleIsCart" />

  <BaseOverlay v-if="isWarning" :isWarning="isWarning" @close="close">
    <LimitModal />
  </BaseOverlay>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import dayjs from 'dayjs';
import AvailableGoods from '../types/AvailableGoods';
import SelectedItem from '../types/SelectedItem';
import OrderTerm from '../types/OrderTerm';
import AddToCart from '../components/atoms/AddToCart.vue';
import CartEmpty from '../components/atoms/CartEmpty.vue';
import CartTitle from '../components/atoms/CartTitle.vue';
// import ItemTotalPrice from '../components/atoms/ItemTotalPrice.vue';
import ToggleButton from '../components/atoms/ToggleButton.vue';
import BaseFilter from '../components/molecules/BaseFilter.vue';
import CategoryFilter from '../components/molecules/CategoryFilter.vue';
import BaseOverlay from '../components/molecules/BaseOverlay.vue';
import CardInputGroup from '../components/molecules/CardInputGroup.vue';
import LimitModal from '../components/molecules/LimitModal.vue';
import CardItem from '../components/organisms/CardItem.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AddToCart,
    CartEmpty,
    CartTitle,
    // ItemTotalPrice,
    BaseFilter,
    CategoryFilter,
    ToggleButton,
    BaseOverlay,
    CardInputGroup,
    LimitModal,
    CardItem,
  },

  // emits: ['expenses'],

  setup() {
    /* eslint-disable */
    onBeforeRouteLeave((to, from) => {
      // onBeforeRouteLeave(() => {
      const answer = window.confirm(
        'Are you sure you want to leave? We enjoy seeing you shop with us.'
      );

      if (!answer) return false;

      // return
    });
    /* eslint-enable */

    const availableGoods = ref<AvailableGoods[]>([]);
    const availableMaterials = ref<string[]>([]);

    function getAvailableMaterials() {
      const materials: string[] = [];
      availableGoods.value.forEach((x) => materials.push(x.material));
      availableMaterials.value = [...new Set(materials)].sort();
    }

    async function getAvailableGoods() {
      await fetch('http://localhost:8000/api/robots')
        .then((res) => res.json())
        .then((response) => {
          availableGoods.value = response.data;
          getAvailableMaterials();
        })
        .catch((e) => console.log(e));
    }
    getAvailableGoods();

    const selectedItems = ref<AvailableGoods[]>([]);
    const selectedItemsId = ref<number[]>([]);
    const dateAdded = ref<Date[]>([]);

    const formatDate = (date: Date) => {
      if (!date) {
        return null;
      }

      return dayjs(date).format('DD-MM-YYYY');
    };

    const inputGroup = ref();

    const currentOrder = ref<string>('');

    const sortItems = (order: OrderTerm) => {
      currentOrder.value = order;
    };

    // type I2 = AvailableGoods;
    // type I2 = AvailableGoods[keyof AvailableGoods];
    // type I2 = AvailableGoods[
    //   | 'name'
    //   | 'price'
    //   | 'material'
    //   | 'image'
    //   | 'stock'
    //   | 'createdAt'];

    /* eslint-disable */
    const sortedGoods = computed(() =>
      // [...availableGoods.value].sort((a: I2, b: I2) => {
      [...availableGoods.value].sort((a, b) => {
        if (currentOrder.value === 'price') {
          return a.price - b.price;
          // @ts-ignore
        } else return a[currentOrder.value] > b[currentOrder.value] ? 1 : -1;
        // else if (currentOrder.value === 'category') {
        //   return a.material;
        //   // @ts-ignore
        // }
      })
    );
    /* eslint-enable */

    const materialType = ref<string>('');

    const showItemsInCategory = (category: string) => {
      materialType.value = category;
    };

    const goodsInCategory = computed(() => {
    /* eslint-disable */
      if (materialType.value) {
        return [
          ...sortedGoods.value.filter(
            (item) => item.material === materialType.value,
          ),
        ];
      } else return [...sortedGoods.value];
    /* eslint-enable */
    });

    function removeItem(itemIndex: number) {
      const itemToRemoveValue = selectedItems.value[itemIndex].name;
      const itemToRemove = selectedItems.value.filter(
        (item) => item.name === itemToRemoveValue,
      )[0];
      const itemToRemoveIndex = selectedItems.value.indexOf(itemToRemove);
      selectedItems.value.splice(itemToRemoveIndex, 1);
      selectedItemsId.value.splice(itemToRemoveIndex, 1);
    }

    const isWarning = ref<boolean>(false);

    function getSelectedItems(args: SelectedItem) {
      if (!selectedItemsId.value.includes(args.id)) {
        if (selectedItems.value.length < 5) {
          selectedItems.value.push(args.item);
          selectedItemsId.value.push(args.id);
          dateAdded.value.push(new Date());
        } else {
          isWarning.value = true;

          setTimeout(() => {
            isWarning.value = false;
          }, 15000);
        }
      } else {
        inputGroup.value.increment();
      }
    }

    const close = (x: boolean) => {
      isWarning.value = x;
    };

    const isCart = ref<boolean>(false);

    const toggleIsCart = (status: boolean) => {
      isCart.value = status;
    };

    return {
      availableGoods,
      getAvailableGoods,
      selectedItems,
      selectedItemsId,
      getSelectedItems,
      dateAdded,
      inputGroup,
      // remainingStock,
      formatDate,
      isWarning,
      availableMaterials,
      getAvailableMaterials,
      goodsInCategory,
      sortItems,
      sortedGoods,
      showItemsInCategory,
      close,
      removeItem,
      isCart,
      toggleIsCart,
    };
  },
});
</script>

<style scoped>
.home {
  grid-template-columns: 80% 20%;
  margin-bottom: 20px;
}

.cart-area {
  border-left: 1px solid var(--green-fade);
  border-radius: 15px;
}

@media screen and (max-width: 425px) {
  .home {
    grid-template-columns: 100%;
  }

  .cart-area {
    /* display: none; */
    position: fixed;
    /* width: calc(100vw - (2 * 20px)); */
    width: 100vw;
    height: 100vh;
    padding: 20px;
    border: none;
    background-color: var(--white);
    overflow: hidden;
  }

  .cart-area__wrap {
    width: 100%;
    height: 100%;
    /* background-color: red; */
    border: 1px solid var(--green-fade);
    border-radius: 15px;
    overflow-y: scroll;
  }

  .cart-area__active {
    top: 0;
    left: 0;
    transition: all 0.5s ease-in-out;
  }

  .cart-area__inactive {
    top: -1111px;
    left: -1111px;
    transition: all 0.5s ease-in-out;
  }
}
</style>

<template>
  <transition-group name="flip-list" tag="section">
    <div v-for="(product, index) in products" :key="index" class="card-group">
      <div class="card-item">
        <img :src="product.image" :alt="product.name" class="card-item_image" />
        <h6 class="card-item_stock">{{ product.stock }} left</h6>

        <div class="card-details">
          <h6 class="card-details_price">
            ฿ <b>{{ product.price }}</b>
          </h6>

          <h5 class="card-details_title">
            <strong>{{ product.name }}</strong>
          </h5>
          <p class="card-details_description">{{ product.material }}</p>

          <p class="card-details_date">
            <slot name="created-on" :dateCreated="product.createdAt"></slot>

            <slot name="added-on" :currentIndex="index"></slot>
          </p>

          <slot
            name="change-count"
            :item="product"
            :stockCount="product.stock"
            :productId="index"
            :price="product.price"
          ></slot>

          <slot
            name="add-to-cart"
            :stockCount="product.stock"
            :item="product"
            :productId="index"
          ></slot>

          <!-- <slot
            name="total-price"
            :itemTotalCost="totalCost"
          ></slot> -->
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AvailableGoods from '../../types/AvailableGoods';

export default defineComponent({
  props: {
    products: {
      type: [Array, Object] as PropType<AvailableGoods>,
      required: true,
    },
  },

  emits: ['availableMaterials'],
});
</script>

<style scoped>
.card-item {
  position: relative;
  width: 220px;
  height: fit-content;
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.card-item:hover {
  outline-color: transparent;
  box-shadow: -5px 5px 1px rgba(0, 0, 0, 0.3);
}

.card-item_image {
  display: inline-block;
  width: 100%;
  height: 170px;
  color: var(--white);
  text-align: center;
  line-height: 12;
  background-color: var(--orange-light);
  background: -moz-linear-gradient(-45deg, #fa782e 8%, #c82930 83%);
  background: -webkit-linear-gradient(-45deg, #fa782e 8%, #c82930 83%);
  background: linear-gradient(135deg, #fa782e 8%, #c82930 83%);
  border: 1px solid transparent;
  border-radius: 15px 15px 0 0;
}

.card-item_stock {
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 2px;
  color: var(--white);
  font-size: var(--font-sm);
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: #ffd414;
}

.card-details {
  position: relative;
  width: 100%;
  margin-top: -5px;
  padding: 5px;
  background-color: var(--white);
  border-radius: 0 0 15px 15px;
  line-height: 1.5;
}

.card-details_price,
.card-details_title {
  font-size: var(--font-normal);
}

.card-details_title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-details_date {
  font-size: var(--font-xs);
  line-height: 2;
}

.flip-list-move {
  transition: transform 0.8s ease;
  -webkit-transition: transform 0.8s ease;
}

@media screen and (max-width: 425px) {
  .card-group {
    width: 100%;
  }

  .card-item {
    margin: 10px auto;
  }
}
</style>

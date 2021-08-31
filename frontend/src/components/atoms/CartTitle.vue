<template>
  <h1>Cart</h1>
</template>

<style scoped>
h1 {
  color: var(--green-fade);
  text-align: center;
  /* background-color: var(--red); */
}

@media screen and (max-width: 425px) {
  h1 {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    left: 0;
    padding: 10px;
    background-color: var(--white);
    border-radius: 15px;
    box-shadow: 0 0 2px 0 var(--green-lighter);
    z-index: 777;
  }
}
</style>

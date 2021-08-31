<template>
  <div>
    <h2 class="warning">You can only have 5 different toys at a time.</h2>
  </div>
</template>

<style scoped>
.warning {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  margin: auto;
  padding: 50px;
  text-align: center;
  border: 5px solid var(--red);
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.5s ease-in-out;
  transform: translate(-50%, -50%);
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .warning {
    background-color: transparent;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }
}

.warning:hover {
  border: none;
  box-shadow: 5px 5px var(--red);
}

@media screen and (max-width: 425px) {
  .warning {
    width: 300px;
    padding: 20px;
    border: 2px solid var(--red);
    border-radius: 5px;
  }

  .warning:hover {
    border: none;
    box-shadow: 2px 2px var(--red);
  }
}
</style>

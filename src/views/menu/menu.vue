<template>
  <div class="menu_page">
    <div></div>
  </div>
</template>

<script>
  export default {
    name: "menu",
    data() {
      return {
        visible: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .menu_page {
    position: fixed;
    top: 30px;
    width: 240px;
    left: 0;
    min-height: 100%;
    background-color: rgb(61, 61, 61);
    z-index: 50;
  }
</style>

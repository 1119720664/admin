<template>
  <div class="home">
    <m-header></m-header>
    <m-menu></m-menu>
    <div class="rightContent">
      <router-view></router-view>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
  import MHeader from "../../views/header/header"
  import MMenu from "../../views/menu/menu"
  import MFooter from "../../views/footer/footer"

  export default {
    name: "home",
    components: {
      MHeader,
      MMenu,
      MFooter
    }
  }
</script>

<style scoped lang="scss">
  .home {
    width: 100%;
    height: 100%
  }
  .rightContent{
    position: relative;
    top: 0;
    left: 180px;
    width: calc(100% - 240px);
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>

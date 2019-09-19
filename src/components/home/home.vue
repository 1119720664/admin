<template>
  <div class="home">
    <m-header></m-header>
    <div class="rightContent">
      <router-view></router-view>
    </div>
    <m-footer class="footer"></m-footer>
    <m-menu></m-menu>
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
    height: 100%;
    overflow: auto;
  }

  .rightContent {
    position: relative;
    top: 60px;
    left: 240px;
    width: calc(100% - 240px);
    min-height: calc(100% - 140px);
    margin-bottom: 40px
  }

  .footer {
    position: relative;
    z-index: 100;
    top: 60px
  }
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: "App",
    created() {
      this.setEleToken()
    },
    methods: {
      setEleToken() {
        if (localStorage.eleToken) {
          this.$store.dispatch("setAuth", true);
          this.$store.dispatch("setUser", JSON.parse(localStorage.user));
        }
      }
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val === oldVal) {
            return
          }
          this.setEleToken()
        },
        deep: true
      }
    }
  }
</script>
<style lang="scss">
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }
</style>

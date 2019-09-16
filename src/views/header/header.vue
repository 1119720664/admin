<template>
  <div class="header">
    <el-header>
      <el-row>
        <el-col :span="18">
          <h3 class="logo">芯海视界</h3>
        </el-col>
        <el-col :span="6">
          <div class="userInfo">
            <el-avatar :size="'large'" :src="circleIcon" class="icon-avatar"></el-avatar>
            <span class="username">欢迎:&nbsp;&nbsp;{{user.username}}</span>
            <span class="logout" @click="logout">退出登录</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex"

  export default {
    name: "MHeader",
    data() {
      return {
        circleIcon: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      }
    },
    computed: {
      ...mapGetters(["user"])
    },
    mounted(){
      console.log(this.user)
    },
    methods: {
      logout() {
        this.setAuth(false)
        localStorage.removeItem("eleToken")
        this.$router.push("/login")
      },
      ...mapActions(["setAuth"])
    }
  }
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
    height: 60px;
    background: #1f1f1f;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    .logo {
      color: #fff;
      font-weight: 300;
      font-size: 20px;
      height: 100%;
      line-height: 60px;
    }

    .el-header {
      padding: 0 60px
    }

    .userInfo {
      height: 60px;
      line-height: 60px;
      float: right;

      .icon-avatar {
        margin-top: 10px
      }

      .username, .logout {
        color: #fff;
        font-size: 14px;
        vertical-align: top;
        padding-left: 20px;
      }

      .logout {
        cursor: pointer;
      }
    }
  }
</style>

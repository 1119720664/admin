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
  import axios from "../../common/js/http"

  export default {
    name: "MHeader",
    data() {
      return {
        circleIcon: require("../../common/images/person.png")
      }
    },
    computed: {
      ...mapGetters(["user"])
    },
    methods: {
      logout() {
        console.log(this.user.eleToken)
        axios.get(`${process.env.VUE_APP_BASE_URL}/api/loginOut/v1`, this.user.eleToken).then(res => {
          if (res.data.code === 0) {
            this.setAuth(false)
            localStorage.removeItem("eleToken")
            this.$router.push("/login")
          }
        })
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

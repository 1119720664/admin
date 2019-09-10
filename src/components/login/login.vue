<template>
  <div class="login">
    <el-card class="login-wrapper">
      <h1>欢迎来到芯海视界</h1>
      <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input @focus="hideError" v-model="loginUser.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="password" :class="{'input-margin':userError}">
          <el-input @focus="hideError" v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <span class="errorMsg" v-if="userError">账户名和密码不匹配,请从新输入用户名和密码</span>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import axios from "../../common/js/http"
  import qs from 'qs'
  import {mapGetters, mapActions} from "vuex"

  export default {
    name: "login",
    data() {
      return {
        userError: false,
        loginUser: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {
              required: true,
              message: "用户名不能为空",
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: "密码不能为空",
              trigger: "blur"
            },
          ]
        }
      };
    },
    computed: {
      ...mapGetters(["isAuth"])
    },
    methods: {
      hideError() {
        this.userError = false
      },
      submitForm() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            axios.post("/api/system/login/loginInfo", qs.stringify(this.loginUser)).then(res => {
              // 登录成功
              const {msg, code, data} = res.data;
              if (code !== 0 && !msg) {     /*登录失败，用户名密码输入错误*/
                this.userError = true
                this.setAuth(false)
                return
              }
              localStorage.setItem("eleToken", msg);
              localStorage.setItem("user", data);
              this.setAuth(true)
              this.setUser({user: data})
              this.$message({
                message: "登录成功",
                type: "success",
                duration: 2000
              })

              // 页面跳转
              setTimeout(() => {
                this.$router.push("/");
              }, 3000)
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },
      ...mapActions(["setAuth", "setUser"])
    }
  }
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background: #444;
    position: relative;

    .login-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 20px 30px;
      background: #fff;
      transform: translate(-50%, -50%);

      h1 {
        text-align: center;
        width: 360px;
        font-weight: 300;
        margin-bottom: 30px;
      }

      .submit_btn {
        margin-top: 15px;
        margin-left: 75px;
      }

      .errorMsg {
        color: red;
        font-size: 10px;
        padding-left: 80px
      }

      .input-margin {
        margin-bottom: 5px;
      }
    }
  }
</style>

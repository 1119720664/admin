<template>
  <div class="login">
    <el-card class="login-wrapper">
      <h1>欢迎来到芯海视界</h1>
      <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="80px">
        <el-form-item label="用户名:" prop="username">
          <el-input @focus="hideError" v-model="loginUser.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密  码:" prop="password" :class="{'input-margin':userError}">
          <el-input @focus="hideError" v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="验证码:" prop="inputCode" :class="{'input-margin':userError}">
           <el-input @focus="hideError" v-model="loginUser.inputCode" placeholder="验证码" type="text"
                     class="inputGroup"></el-input>
           <identifyCode @click.native="getCode" :identifyCode="httpCode" class="inputCode"></identifyCode>
         </el-form-item>-->
        <span class="errorMsg" v-if="userError">账户名和密码不匹配,请从新输入用户名和密码</span>
        <el-form-item>
          <el-checkbox v-model="loginUser.NotForget">记住我</el-checkbox>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import axios from "../../common/js/http"
  import identifyCode from "../../views/identifyCode/identifyCode"
  import qs from 'qs'
  import { mapGetters, mapActions } from "vuex"

  export default {
    name: "login",
    created() {
      this.getUser()
      //this.getCode()
    },
    data() {
      /* var validateCode = (rule, value, callback) => {
         if (value === '') {
           callback(new Error('请输入验证码'));
         } else if (value !== this.httpCode) {
           callback(new Error('输入的验证码不正确'));
         } else {
           callback();
         }
       };*/
      return {
        userError: false,
        loginUser: {
          username: "",
          password: "",
          inputCode: "",      /*验证码*/
          NotForget: false   /*记住我*/
        },
        httpCode: "",
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
          ],
          /* inputCode: [
             {
               validator: validateCode,
               message: "验证码输入的不正确",
               trigger: "blur"
             },
           ]*/
        }
      };
    },
    computed: {
      ...mapGetters(["isAuth"])
    },
    methods: {
      getCode() {
        axios.get("/api/system/login/getVCode").then(res => {
          if (res.data.code === 0) {
            this.httpCode = res.data.msg
          }
        })
      },
      hideError() {
        this.userError = false
      },
      submitForm() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            axios.post("/api/api/hr/Account/UserVerify/v1", qs.stringify({
              username: this.loginUser.username,
              password: this.loginUser.password
            })).then(res => {
              // 登录成功 页面跳转
              const {msg, code, data} = res.data;
              if (code === 0 && msg) {
                localStorage.setItem("eleToken", msg);
                localStorage.setItem("user", JSON.stringify({...this.loginUser, userId: data.userId}));
                this.setAuth(true)
                this.setUser({...this.loginUser, userId: data.userId})
                this.$message({
                  message: "登录成功",
                  type: "success",
                  duration: 2000
                })
                setTimeout(() => {
                  this.$router.push("/");
                }, 1000)
              } else {
                this.userError = true    /*登录失败，用户名密码输入错误*/
                this.setAuth(false)
                //this.getCode() /*刷新验证码*/
              }
            }).catch(error => {
              this.loginUser.username = ""
              this.loginUser.password = ""
              this.loginUser.NotForget = false
            })
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },
      getUser() {    /*记住我*/
        if (localStorage.user) {
          let {username, password, NotForget} = JSON.parse(localStorage.user)
          console.log(username, password, NotForget)
          if (NotForget) {
            this.loginUser.username = username
            this.loginUser.password = password
            this.loginUser.NotForget = NotForget
          }
        }
      },
      ...mapActions(["setAuth", "setUser"])
    },
    components: {
      identifyCode
    }
  }
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background: #444;
    position: relative;
    zoom: 1.001;

    .login-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 20px 30px;
      background: #fff;
      transform: translate(-50%, -50%);

      h1 {
        text-align: center;
        font-weight: 300;
        width: 360px;
        margin-bottom: 30px;
      }

      .submit_btn {
        margin-top: 15px;
        margin-left: 30px;
      }

      .errorMsg {
        color: red;
        font-size: 10px;
        padding-left: 80px
      }

      .input-margin {
        margin-bottom: 5px;
      }

      .inputGroup {
        width: 65%;
        float: left;
      }

      .inputCode {
        float: right;
        height: 40px;
      }
    }
  }
</style>

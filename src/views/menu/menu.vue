<template>
  <div>
    <el-row class="menu_page">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="rgb(61,61,61)"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <router-link to="/" tag="a">
            <el-menu-item index="0">
              <i class="fa fa-home icon"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <template v-for="(item,index) in asyncRouter">
              <el-divider></el-divider>
              <el-submenu v-if="item.children" :index="item.path" :key="index">
                <template slot="title">
                  <i :class="`fa fa-w icon ${item.icon}`"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                  <el-menu-item :index="citem.path">
                    <span slot="title">{{citem.name}}</span>
                  </el-menu-item>
                </router-link>
              </el-submenu>
            </template>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex"
  import axios from "../../common/js/http"

  export default {
    name: 'Menu',
    created() {
      this.getRouter()
    },
    data() {
      return {
        asyncRouter: []
      }
    },
    computed: {
      ...mapGetters(["user"])
    },
    methods: {
      getRouter() {
        let {userId} = this.user
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/hr/Account/Menu/ListByUserId/v1`, {userId}).then(res => {
          let NavMenu = res.data
          this.asyncRouter = this.routerMatch(NavMenu)
        })
      },
      routerMatch(Array) {   /*获取当前菜单的列表*/
        let children = []
        Array && Array.forEach(item => {
          let obj = {}
          obj.icon = item.icon || ""
          obj.name = item.menuName
          obj.path = item.url
          if (item.children) {
            obj.children = this.routerMatch(item.children)
          }
          children.push(obj)
        })
        return children
      }
    }
  }
</script>

<style lang="scss">
  .el-menu-item:hover, .el-submenu__title:hover {
    background: rgb(71, 71, 71) !important;
    border: none;
  }

  .el-submenu.is-active.is-opened .el-submenu__title {
    background-color: rgb(214, 70, 53) !important;
  }

  .el-menu-item.is-active {
    background-color: rgb(71, 71, 71) !important;
    color: #fff !important;
  }

  .el-menu--inline .el-menu-item {
    padding-left: 70px !important;
  }

  .el-menu-demo .el-menu-item {
    border-bottom: none !important;
  }
</style>

<style scoped lang="scss">
  .menu_page {
    position: fixed;
    top: 60px;
    width: 240px;
    left: 0;
    min-height: 100%;
    background-color: rgb(61, 61, 61);
    z-index: 50;
  }

  .router-link-active {
    background: rgb(61, 61, 61);
  }

  .el-menu {
    border-right: none;
  }

  .el-divider--horizontal {
    background: #484848;
    margin: 0
  }

  .icon {
    color: #fff;
    font-size: 16px;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }

  .setting {
    color: #fff;
    font-size: 20px;
    float: right;
    margin-top: 18px
  }
</style>

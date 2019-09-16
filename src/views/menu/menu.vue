<template>
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
          <template v-for="item in items">
            <el-divider></el-divider>
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
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
</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        items: [
          {
            icon: "fa-user",
            name: "人员管理",
            path: "member",
            children: [
              {
                path: "/person/member", name: "职工人员"
              },
              {
                path: "/person/123", name: "职工人员2"
              }
            ]
          }
        ]
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
    padding-left: 60px !important;
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
</style>

<template>
  <div
    id="index"
    :style="`padding-left: ${appPaddingLef};`"
    v-loading.fullscreen.lock="userinfoLoading"
    element-loading-text="初始化中..."
  >
    <!--     <el-popover
      ref="popover"
      placement="bottom"
      title="系统消息"
      width="400"
      trigger="click"
      v-model="sysPopVisible"
    >
    <div>
      <template v-if="sysmesg.length != 0">
      <ul style="list-style-type: decimal;" >
        <li class="sysmesg-item"  v-for="item in sysmesg" @click="$router.push(`/news/systemMessage/detail?id=${item.id}`)">{{ item.subject }}</li>
      </ul>
      <a href="javascript::void(0)" @click="$router.push('/news/systemMessage');sysPopVisible = false">查看更多...</a>
      </template>
      <div v-else style="color: #ccc; margin-top: 10px; margin-left: 20px;">暂无系统消息...</div>      
    </div>
    </el-popover>-->
    <nav>
      <div style="display: inline-block;vertical-align: top;">
        <img src="/static/static_img/logo.png" style=" height: 27px;vertical-align: middle;">
      </div>
      <!-- <span class="logo_name">知识产权管理系统</span> -->
      <div style="display: inline-block;">
        <app-nav></app-nav>
      </div>
      <div style="position: absolute;top: 0;right: 0;overflow: hidden;">
        <el-dropdown
          trigger="click"
          style="float: right; margin-right: 40px;"
          @command="handleCommond"
        >
          <span class="el-dropdown-link" style="color: #20a0ff; cursor: pointer;">
            {{ username }}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login_out">登出</el-dropdown-item>
            <el-dropdown-item command="login_as" v-if="isAdmin">登陆为</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dialog title="登陆为" :visible.sync="dialogVisible" width="30%">
          <span>
            <jump-select type="user" v-model="form.user"></jump-select>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="loginas" size="small">确 定</el-button>
          </span>
        </el-dialog>

        <!--         <img 
          v-popover:popover  
          style="cursor: pointer; float: right; margin-right: 20px; margin-top: 12px; font-size: 24px;" 
          title="系统消息"
          :src="sysmesg.length != 0 ? '/static/static_img/news_in.png' : '/static/static_img/news.png'"
        />   
          <el-badge :value="pendingTaskCount" class="task-pending-top">
            <el-button size="mini" icon="el-icon-warning" type="primary" @click="$router.push('/task/pending')" title="待办任务"></el-button>
          </el-badge>
        <a target="_blank" href="http://help.hongjianguo.com" style="margin-right:20px;
        font-size: 14px;">帮助</a>-->
      </div>
    </nav>

    <div class="nav-left" :style="`height: ${innerHeight}px; left: ${navLeft}`" v-if="!noMenu">
      <span class="nav-left-btn" :style="`left: ${navLeftBtn};`" @click="navToggle" v-if="!noMenu">
        <span :class="navLeftBtnClass"></span>
      </span>
      <el-menu
        v-if="menusMap != null"
        router
        unique-opened
        :default-active="leftMenuActive"
        mode="vertical"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
      >
        <app-menu-item v-for="item in menuData" :dd="item" :key="item.path"></app-menu-item>
      </el-menu>
    </div>
    <div v-loading="loading" :element-loading-text="loadingText">
      <div :style="`height: ${innerHeight-10}px; padding: 10px 15px 0; background-color: #F9FAFC;`">
        <div class="container">
          <!-- <h1 class="container-menu"><i :class="select.icon"></i><span>{{ select.text }}</span></h1> -->
          <div class="container-nav" v-if="!noMenu">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item v-for="item in select_arr" :to="item.path" :key="item.path">
                <i :class="item.icon"></i>
                {{ item.text }}
              </el-breadcrumb-item>
              <el-breadcrumb-item v-if="navLabel.length != 0" class="container-nav-screen">
                <el-tag
                  v-for="(item, index) in navLabel"
                  :closable="true"
                  :key="index"
                  type="primary"
                  :close-transition="false"
                  @close="handleClose(item)"
                >{{ item.label }}</el-tag>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <router-view :key="$route.path.split('__')[0]" v-if="isRouterAlive"></router-view>
        </div>
      </div>
    </div>

    <agency-load :visible="agencyLoadVisible"></agency-load>
  </div>
</template>

<script>
import AgencyLoad from "@/components/form/AgencyLoad";

import menu from "@/const/menuConst";
import AppNav from "@/components/common/AppNav";
import AppMenuItem from "@/components/common/AppMenuItem";
import JumpSelect from "@/components/form/JumpSelect";

import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "index",
  provide() {
    return {
      reload: this.reload
    };
  },
  computed: {
    ...mapGetters([
      "navLabel",
      "innerHeight",
      "loading",
      "loadingText",
      "viewLoading",
      "viewLoadingText",
      "username",
      "leftVisible",
      "agencyLoadVisible",
      "menusMap",
      "pendingTaskCount",
      "menuData",
      "menuDataMap",
      "menuType",
      "noMenu",
      "isAdmin"
    ]),
    path() {
      let path = this.$route.path;
      path = path.split("__")[0];
      return path;
    },
    select_arr() {
      const d = this;
      const arr = [];
      const path = this.path;
      const params = d.$route.params;

      const arr2 = path.split("/");

      for (let i = 0; i < arr2.length; i++) {
        const str = i == 0 ? "/" : arr2.slice(0, i + 1).join("/");
        const item = this.menuDataMap[str];
        if (item) {
          arr.push(item);
        }
      }
      return arr;
    },
    sysmesg() {
      let s = this.$store.getters.sysmesg;
      if (s === undefined) {
        s = [];
        this.$store.dispatch("refreshMesg");
      }
      if (s.length > 3) s = s.slice(0, 3);
      return s;
    },
    appPaddingLef() {
      if (this.noMenu) return "0px";
      return this.leftVisible ? "200px" : "0px";
    },
    navLeft() {
      return this.leftVisible ? "0px" : "-200px";
    },
    navLeftBtn() {
      return this.leftVisible ? "200px" : "0px";
    },
    navLeftBtnClass() {
      const arr = ["nav-left-btn-arrow", "el-icon-arrow-left"];
      this.leftVisible
        ? arr.push("el-icon-arrow-left")
        : arr.push("el-icon-arrow-right");
      return arr.join(" ");
    }
  },
  data() {
    return {
      menu_data: menu.data,
      resize_lock: false,
      sysPopVisible: false,
      windowLock: false,
      userinfoLoading: true,
      isCollapse: false,
      leftMenuActive: "",
      isRouterAlive: true,
      dialogVisible: false,
      form: {
        user: ""
      }
    };
  },
  methods: {
    ...mapActions([
      // 'refreshExtends', //extend-field
      "refreshProduct", //product
      "refreshClassification", //classification
      "refreshBranch", //branch
      "refreshArea", //area
      "refreshCity", //city
      "refreshUser",
      "closeTag", //filter-cache
      "initializeHashMapsCache" //index
    ]),
    ...mapMutations([
      "toggleLeftVisible", //index
      "setInnerHeight", //index
      "setInnerWidth", //index
      "setUser" //current-user
    ]),
    refreshPage () {
      this.$router.replace({
          path: '/refresh',
      })
    },
    loginas() {
      const url = "/loginas/" + this.form.user;
      const success = _ => {
        this.dialogVisible = false;
        this.$message({ message: "切换登陆成功", type: "success" });
        this.$store.commit("LOGIN", _.data.token);
        this.$axios.defaults.headers.common["Authorization"] = _.data.token;
        this.refreshUser();
        this.refreshPage();
      };
      this.$axiosPost({ url, success });
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    handleClose(item) {
      this.closeTag(item);
    },
    handleCommond(command) {
      if (command == "login_out") {
        const url = "/logout";
        const success = _ => {
          this.$message({ message: "登出成功", type: "success" });
          this.$store.commit("LOGOUT");
          window.location.href = "/login";
          // this.$router.push( {name: 'Login'})
        };

        this.$axiosGet({ url, success });
      }
      if (command == "login_as") {
        this.dialogVisible = true;
      }
    },
    navToggle() {
      this.toggleLeftVisible();

      // let i = 32;
      // let n = this.leftVisible ? 160 : 0;
      // i = this.leftVisible ? -i : i;
      // animation();

      //滑动效果
      // function animation () {
      //   n += i;
      //   left.css('width', n);
      //   app.css('padding-left', n);
      //   btn.css('left', n);

      //   if(n == 0) {
      //     btn.find('.nav-left-btn-arrow').removeClass('el-icon-arrow-left').addClass('el-icon-arrow-right');
      //   }else if( n== 160) {
      //     btn.find('.nav-left-btn-arrow').removeClass('el-icon-arrow-right').addClass('el-icon-arrow-left');
      //   }else {
      //     window.requestAnimationFrame(animation);
      //   }
      // }
    }
  },
  created() {
    // this.leftMenuActive = this.path;

    const refreshWindow = _ => {
      this.setInnerHeight(window.innerHeight);
      this.setInnerWidth(window.innerWidth);
    };

    refreshWindow();
    window.onresize = _ => {
      if (!this.windowLock) {
        this.windowLock = true;

        window.setTimeout(_ => {
          refreshWindow();
          this.windowLock = false;
        }, 100);
      }
    };

    const success = _ => {
      this.userinfoLoading = false;

      //设置个人信息
      if (window.appCache.userinfo) {
        this.setUser(window.appCache.userinfo);
      }
    };
    success();
  },
  components: {
    AppMenuItem,
    AgencyLoad,
    AppNav,
    JumpSelect
  },
  watch: {
    //路径更改 左侧菜单自东变更active项
    path(val) {
      this.leftMenuActive = val;
    },
    //解决菜单切换时 左侧菜单的active项为空
    menuType() {
      this.leftMenuActive = "";
      this.$nextTick(() => {
        this.leftMenuActive = this.path;
      });
    }
  }
};
</script>
<style lang="scss">
/*@media only screen and (max-width: 1338px){
  @import './style/common';
}*/
$nav_bgColor: #383838;
$nav_height: 50px;

$navL_bgColor: #324157;
$navL_width: 200px;

$container_padding: 20px;

$table_margin: 10px;

body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
a {
  color: #20a0ff;
}
#index {
  position: relative;
  padding: {
    top: $nav_height;
    left: $navL_width;
  }
}
nav {
  position: fixed;
  background-color: $nav_bgColor;
  top: 0;
  left: 0;
  height: $nav_height;
  line-height: $nav_height;
  width: 100%;
  color: #fff;
  padding-left: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.nav-left {
  overflow-x: hidden;
  overflow-y: auto;
  width: $navL_width;
  position: fixed;
  top: $nav_height;
  left: 0;
  background-color: $navL_bgColor;
}
.nav-left-btn {
  position: fixed;
  left: $navL_width;
  top: 50%;
  margin-top: -50px;
  background-color: #68758a;
  width: 10px;
  height: 150px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  cursor: pointer;
  opacity: 0.5;
}
.nav-left-btn-arrow {
  position: absolute;
  top: 50%;
  left: -4px;
  color: #324157;
  transform: translate(0, -50%);
}
.nav-left .iconfont {
  position: relative;
  padding-right: 10px;
  top: 1px;
}
.container-menu {
  font-size: 24px;
  color: #acb1b8;
  height: 46px;
  line-height: 46px;
}
.container-menu .iconfont {
  opacity: 0.3;
  font-size: 42px;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: -8px;
}
.container-nav {
  border-radius: 4px;
  background: #f3f5f6;
  /*padding: 8px;*/
  margin-bottom: 10px;
  height: 32px;
}
.container-nav .el-breadcrumb {
  font-size: 14px;
  height: 32px;
  line-height: 32px;
}
.container-nav .iconfont {
  font-size: 14px;
  padding-right: 5px;
}
.container-nav-screen .el-tag + .el-tag {
  margin-left: 10px;
}
.el-table {
  /*margin-bottom: 10px;*/
}
.tabel-content__visible {
  word-wrap: break-word;
  overflow: auto;
}
.table-search {
  width: 130px;
  float: right;
  transition: all 1s;
}
.table-search-focus {
  width: 200px;
}
.el-pagination {
  /*  text-align: right;
  padding-right: 40px;*/
}
.row {
  overflow: hidden;
}
.left {
  float: left;
  width: 200px;
}
.right {
  margin-left: 220px;
}
.left .tree-search > input {
  border-radius: 0;
}

.el-select {
  width: 100%;
}
.table-header-btn .el-icon-menu::before {
  font-size: 12px;
}
.el-table .table-error {
  color: #ff4949;
}
.el-table .table-warning {
  color: #f7ba2a;
}
.ql-toolbar.ql-snow {
  line-height: initial;
}
.ql-container.ql-snow {
  height: 300px;
}
.table-flag {
  display: inline-block;

  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.table-flag-read {
  background-color: #ccc;
}
.table-flag-unread {
  background-color: #58b7ff;
}
.sysmesg-item {
  cursor: pointer;
  margin-bottom: 5px;
}
.sysmesg-item:hover {
  color: #58b7ff;
}
.hjg-table .el-pagination {
  margin-top: 10px;
}
.logo_name {
  padding-left: 10px;
  font-size: 18px;
  height: 28px;
  line-height: 28px;
  /*font-weight: bold;*/
  display: inline-block;
}
.float-block:before {
  display: table;
  content: "";
}
.float-block:after {
  display: table;
  content: "";
  clear: both;
}
.el-date-editor.el-input {
  width: 100%;
}
.input-min-width {
  width: 150px !important;
}
.upload-width {
  width: 180px !important;
}
</style>
<template>
  <div id="app">
    <!--<transition name="fade">-->
      <keep-alive>
        <router-view></router-view>
       </keep-alive>
    <!--</transition>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      "getToken"
    ]),
    path () {
      return this.$route.path;
    },
  },
  methods: {
    ...mapActions([
      // 'refreshExtends', //extend-field
      'refreshProduct', //product
      'refreshClassification', //classification
      'refreshBranch', //branch
      'refreshGroup',//user-group
      'refreshArea', //area
      'refreshCity', //city
      'refreshUser',
      'closeTag', //filter-cache
      'initializeHashMapsCache', //index
    ]),
  },
  created () {
       const success = _=>{
      
      //设置个人信息
      // this.setUser(window.appCache.userinfo);
      
      //获取系统配置数据
      // this.refreshExtends(false);
      // this.$store.dispatch('refreshTags');
      
      //避免每次F5都发送请求的方法：
      //  1.每次使用相关数据的位置添加一个尝试初始化的函数
      //  2.localStorage动态关联
           if(this.getToken !== null){
               this.refreshProduct();
               this.refreshBranch();
               this.refreshGroup();
               this.refreshClassification();
               // this.$store.dispatch('refreshIpr');

               //使用localStorage进行本地缓存

               // this.refreshUser();
               this.initializeHashMapsCache();
           }
      this.refreshArea();
      this.refreshCity();
      // this.$store.dispatch('refreshFeeCode');
      // this.$store.dispatch('refreshEntity');
      // this.$store.dispatch('refreshGroup');
      // this.$store.dispatch('refreshFileType');
      // this.$store.dispatch('refreshMail');
    };
    // 页面加载后300ms后请求数据，为了能在登录面不提前发请求
      setTimeout(_=>{
        if(!/login/.test(this.path)) {
           success();
        }
      },1000)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/*这里放入重写element-ui样式的内容*/
html,body {
  width: 100%;
  height: 100%;
}
body, div, span, header, footer, nav, section, aside, article, ul, dl, dt, dd, li, a, p, h1, h2, h3, h4,h5, h6, i, b, textarea, button, input, select, figure, figcaption {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    font-family: "Microsoft Yahei",sans-serif;
    -webkit-tap-highlight-color:transparent;
    -webkit-font-smoothing: antialiased;
    &:focus {
        outline: none;
    }
}
#app {
    height: 100%;
    width: 100%;
    font-size: 14px;//规范默认字体大小
  .el-menu--horizontal {
    border: none;
  } 
  .el-checkbox__label {
    line-height: 32px;
  }  
  .el-menu {
    border-right: none;
  }   
  .el-table__header-wrapper thead div {
    background-color: transparent;
  }  
  .el-card__header {
    padding: 10px 20px;
    font-size: 14px;
  }
  .dialog-control>.el-dialog {
    width: 600px;
    position: static;
    transform: initial;
    margin: 0 auto;
    margin-top: 80px;
  }
  .el-table .caret-wrapper {
    cursor: pointer;
    width: 16px;
    height: 30px;
    overflow: visible;
    overflow: initial;
    position: absolute;
    right: 15px;
    top: 2px;
}
.el-table td, .el-table th {
  padding: 8px 0;
}
  // .el-tree-node__expand-icon.expanded {
  //   -ms-transform: rotate(90deg);
  //   transform: rotate(90deg);
  // }
  // .el-tree-node__expand-icon {
  //   cursor: pointer;
  //   height: 0;
  //   margin-left: 12px;
  //   border: 8px solid transparent;
  //   border-right-width: 0;
  //   border-left-color: #97a8be;
  //   border-left-width: 12px;
  //   transition: transform .3s ease-in-out;
  // }
  .el-tree-node__content>.el-checkbox, .el-tree-node__content>.el-tree-node__expand-icon {
    margin-right: 5px;

  }
  .app-tree-filter .el-tree-node__content>.el-tree-node__expand-icon, 
  .view-tree .el-tree-node__content>.el-tree-node__expand-icon  {
    padding: 0px;
  }
  .el-tree-node__content {
    line-height: 36px;
    height: 36px;
  }
  .tree_btn {
    display: none;
  }
  .el-tree-node__content:hover .tree_btn,.is-current>.el-tree-node__content .tree_btn {
    display: inline-block;
  }
  .el-tree-node__expand-icon.is-leaf {
    border-color: transparent;
    cursor: default;
  }
  .dialog-mini>.el-dialog {
    width: 300px;
  }
  .dialog-small>.el-dialog {
    width: 600px;
  }
  .dialog-size>.el-dialog {
    width: 800px;
  }
  .dialog-medium>.el-dialog {
    width: 900px;
  }
  .el-dropdown-menu__item {
    line-height: 25px;
    font-size: 14px;
    font-family: "microsoft yahei", Helvetica, Tahoma, Arial, sans-serif;
    padding: 0 20px;
  }
  .el-form-item {
    margin-bottom: 22px;
  }
  .el-dialog {
    border-radius: 6px;
    -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
  }
  .el-dialog__header {
    border-bottom: 1px solid #e5e5e5;
    padding: 15px 10px 15px 20px;
  }
  .dialog-mini .el-dialog--tiny {
    width: 300px;
  }
  .el-dropdown-menu__item--divided:before {
    margin: 0 -20px;
  }
  .el-upload-dragger {
    width: auto;
    min-width: 180px;
    height: auto;
  }
  textarea {
    height: 80px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  .custom-textarea textarea{
    height: auto;
  }
  .el-step.is-vertical .el-step__main {
    padding-left: 40px;
  }
  .form-information .el-form-item {
    margin-bottom: 0px;
    border-bottom: 1px solid #f2f2f2; 
  }
  .form-information .el-form-item__label {
    color: #92a3b7;
    font-size: 12px;  
  }
  .form-information .el-form-item__content {
    font-size: 12px;
    min-height: 36px;
  }
  // select组件多选样式超出，待完善修改，这是测试
  // .el-select__tags {
  //   max-height: 36px;
  //   overflow-x: hidden;
  //   overflow-y: auto;
  // } 
  .no_wrap .el-select__tags {
    white-space: nowrap;
  }
  .task-pending-top{
    float: right;
    margin-right: 30px;
  }
  .task-pending-top .el-badge__content.is-fixed {
    border-color: #ff4949;
    top: 14px;
    transform: translateY(-50%) translateX(100%) scale(0.8);
  }
  .el-submenu .el-menu-item {
    /*margin-left: -15px;*/
  }
  .empty-top-left .el-table__empty-text {
    top: 40px;
    left: 80px;
  }
  .input-no-radius input {
    border-radius: 0px;
  }
  .el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 14px;
  }
  .el-breadcrumb:after, .el-breadcrumb:before, .el-button-group:after, .el-button-group:before, .el-form-item:after, .el-form-item:before, .el-form-item__content:after, .el-form-item__content:before {
    display: table;
    content: "";
  }
  .app-upload {
    .el-upload-list {
      max-height: 170px;
      overflow: auto;
      padding: 0;
      list-style: none;
      display: block;
      margin-bottom: 40px;
    }
    .el-upload {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      position: absolute;
      bottom: 4px;
      left: 0px;
    }
  }
 .el-dialog--small  .el-upload--text {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    /*position: static;*/
  }
  .el-tooltip__popper {
    max-width: 500px;
  }
  .el-message-box__message p{
    margin: 0;
    line-height: 1.4;
    word-wrap:break-word;
  }
  /*icon库扩展*/
  [class^="el-icon-my"], [class*=" el-icon-my"] {
    font-family:"iconfont" !important;
    font-size:16px;
    text-align: center;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
.el-submenu__title *{
  vertical-align: baseline;
}
.left-tree-header {
  font-size: 14px;
  height: auto;
  line-height: 40px;
  background-color: #eef1f6;
  border: 1px solid #dfe6ec;
  border-bottom: none;
}

.form-description {
  margin-bottom: 10px;
  color: rgb(132, 146, 166);
  font-size: 14px;
}

.tag-color-1 {
  color: #fff;
  background-color: rgb(199,0,57);
}

.tag-color-2 {
  color: #fff;
  background-color: rgb(255,87,51);
}

.tag-color-3 {
  color: #fff;
  background-color: rgb(87,199,133);
}

.tag-color-4 {
  color: #fff;
  background-color: rgb(0,186,173);
}

.tag-color-5 {
  color: #fff;
  background-color: rgb(81,24,73);
}

.tag-color-6 {
  color: #fff;
  background-color: rgb(42,123,125);
}

.tag-color-7 {
  color: #fff;
  background-color: rgb(255,141,26);
}
/* tinyMce */
#app .mce-tinymce {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

  
</style>
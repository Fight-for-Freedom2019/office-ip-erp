// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import formCreate from "form-create";
// import VueQuillEditor from "vue-quill-editor";
import MyAxios from "@/const/MyAxios";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import "./fonts/iconfont.css";
import axios from "@/const/axios";
import tool from "./const/tool";
import "./components/common/components"
import "./components/form/components"

// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
Vue.prototype.$axios = axios;
Vue.prototype.$tool = tool;

Vue.use(ElementUI);
// Vue.use(VueQuillEditor);
Vue.use(MyAxios);
Vue.use(formCreate);

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    //判断是否存在token，如果存在将每个页面header都添加token
    if (window.localStorage.getItem("token")) {
      config.headers.common["Authorization"] = window.localStorage.getItem(
        "token"
      );
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.data.status) {
        case -1:
          window.localStorage.removeItem("token");
          router.replace({
            path: "/",
            query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
          });
      }
    }
    return Promise.reject(error.response.data);
  }
);
// Vue.component("app-button-loading",AppButtonLoading);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});

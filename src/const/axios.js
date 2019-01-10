import axios from 'axios'
//请求参数配置 参照npm axios API
axios.defaults.headers.common["Authorization"] = window.localStorage.getItem(
  "token"
);
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
export default axios.create({
  baseURL: process.env.API_BASEURL,//only work at development mode,doesn't infect production mode  
});
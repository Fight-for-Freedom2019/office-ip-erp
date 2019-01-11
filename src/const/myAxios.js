export default {
  install(Vue, options) {
    Vue.prototype.$axiosGet = axiosGet;
    Vue.prototype.$axiosDelete = axiosDelete;
    Vue.prototype.$axiosPost = axiosPost;
    Vue.prototype.$axiosPut = axiosPut;
  }
};

//------------------默认配置项start-------------------------

const URLDEFAULT = "";

const dd = {};

const responseText = function (status) {
  let text = "";
  switch (status) {
    case 401:
      text = "接口没有权限，请联系管理员！";
      break;
    case 404:
      text = "您请求的页面不存在，请联系管理员！";
      break;
    case 504:
      text = "接口请求超时啦，请联系管理员！";
      break;
    default:
      text = "接口出错啦，请联系管理员！";
      break;
  }
  return text
}


const successFunc = function(d, t) {};

const errorFunc = function(d, t) {
  if (d.info) {
    t.$message({ message: d.info, type: "warning" });
  } else if(d.response){
    t.$message({ message: responseText(d.response.status), type: "warning" });
  } else {
    t.$message({ message: "接口出错啦，请联系管理员！", type: "warning" });
  }
};

const catchFunct = function(d, t) {
  console.log(d);
  if (d.info) {
    t.$message({ message: d.info, type: "warning" });
  }else if(d.response){
    t.$message({ message: responseText(d.response.status), type: "warning" });
  } else {
    t.$message({ message: "接口出错啦，请联系管理员！", type: "warning" });
  }
};

const completeFunc = function(d, t) {};
const completeFuncCloseLoading = function(d, t) {
  handleLoading(t, false);
};
const beforeRequestOpenLoading = function(t) {
  handleLoading(t, true);
};
const handleLoading = function(t, b) {
  /*
   * TODO 这里有问题
   * 需要加loading的按钮应当在当前组件发送post请求
   * 下面的else分支是解决之前把shrink组件中的按钮写在了父组件，请求却在子组件中的问题
   * 如果组件中自己有写completeFunc，需在自己组件中close loading
   * */
  if (t.$refs.loadingBtn) {
    t.$refs.loadingBtn.loading = b;
  } else if (t.$parent.$parent.$refs.loadingBtn) {
    t.$parent.$parent.$refs.loadingBtn.loading = b;
  }
};

//------------------默认配置项end-------------------------

function axiosGet({
  url = URLDEFAULT,
  data = dd,
  success = _ => {
    successFunc(_, this);
  },
  error = _ => {
    errorFunc(_, this);
  },
  catchFunc = _ => {
    catchFunct(_, this);
  },
  complete = _ => {
    completeFunc(_, this);
  }
}) {
  const res = this.$axios.get(url, { params: data });
  res
    .then(response => {
      const d = response.data;
      if (d.status == -1) {
        window.location.href = "/";
        return false;
        // console.log(url);
      }
      d.status > 0 ? success(d) : error(d);

      complete(d);
    })
    .catch(err => {
      catchFunc(err);
      complete(err);
    });

  return res;
}
function axiosDelete({
  url = URLDEFAULT,
  data = dd,
  success = _ => {
    successFunc(_, this);
  },
  error = _ => {
    errorFunc(_, this);
  },
  catchFunc = _ => {
    catchFunct(_, this);
  },
  complete = _ => {
    completeFunc(_, this);
  }
}) {
  const res = this.$axios.delete(url, { params: data });
  res
    .then(response => {
      const d = response.data;
      d.status > 0 ? success(d) : error(d);

      complete(d);
    })
    .catch(err => {
      catchFunc(err);
      complete(err);
    });

  return res;
}

function axiosPost({
  url = URLDEFAULT,
  data = dd,
  success = _ => {
    successFunc(_, this);
  },
  error = _ => {
    errorFunc(_, this);
  },
  catchFunc = _ => {
    catchFunct(_, this);
  },
  complete = _ => {
    completeFuncCloseLoading(_, this);
  }
}) {
  let _this = this;
  beforeRequestOpenLoading(_this);
  const res = this.$axios.post(url, data);
  res
    .then(response => {
      const d = response.data;
      d.status > 0 ? success(d) : error(d);

      complete(d, _this);
    })
    .catch(error => {
      catchFunc(error);
      complete(error, _this);
    });

  return res;
}

function axiosPut({
  url = URLDEFAULT,
  data = dd,
  success = _ => {
    successFunc(_, this);
  },
  error = _ => {
    errorFunc(_, this);
  },
  catchFunc = _ => {
    catchFunct(_, this);
  },
  complete = _ => {
    completeFuncCloseLoading(_, this);
  }
}) {
  let _this = this;
  beforeRequestOpenLoading(_this);
  const res = this.$axios.put(url, data);
  res
    .then(response => {
      const d = response.data;
      d.status > 0 ? success(d) : error(d);

      complete(d);
    })
    .catch(d => {
      catchFunc(d);
      complete(d);
    });

  return res;
}

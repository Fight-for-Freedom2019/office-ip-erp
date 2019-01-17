const complete_default = function() {};
const status = 0; //这里进行地址代理控制, 为1时去掉/api, 为0时保留
export default {
  methods: {
    axiosGet({
      url = "",
      data = {},
      success = () => {},
      error = d => {
        this.$alert(d.info);
      },
      catchFunc = err => {
        console.log(err);
        this.$message({ message: "接口出错啦，请联系管理员", type: "error" });
      },
      complete = _ => {}
    }) {
      url = status ? url.replace(/\/, "") : url;

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
        .catch(error => {
          catchFunc(error);
          complete(error);
        });

      return res;
    },
    axiosPost({
      url = "",
      data = {},
      success = () => {},
      error = d => {
        this.$alert(d.info);
      },
      catchFunc = err => {
        console.log(err);
        this.$message({ message: "接口出错啦，请联系管理员", type: "error" });
      },
      complete = () => {}
    }) {
      url = status ? url.replace(/\/, "") : url;

      const res = this.$axios.post(url, data);
      res
        .then(response => {
          const d = response.data;
          d.status ? success(d) : error(d);

          complete(d);
        })
        .catch(error => {
          catchFunc(error);
          complete(error);
        });

      return res;
    },
    axiosPut({
      url = "",
      data = {},
      success = () => {},
      error = d => {
        this.$alert(d.info);
      },
      catchFunc = err => {
        console.log(err);
        this.$message({ message: "接口出错啦，请联系管理员", type: "error" });
      },
      complete = () => {}
    }) {
      url = status ? url.replace(/\/, "") : url;

      const res = this.$axios.put(url, data);
      res
        .then(response => {
          const d = response.data;
          d.status ? success(d) : error(d);

          complete(d);
        })
        .catch(d => {
          catchFunc(d);
          complete(d);
        });

      return res;
    },
    axiosDelete({
      url = "",
      data = {},
      success = () => {},
      error = d => {
        this.$alert(d.info);
      },
      catchFunc = err => {
        console.log(err);
        this.$alert("接口出错啦，请联系管理员");
      }
    }) {
      url = status ? url.replace(/\/, "") : url;
      this.$axios
        .delete(url, { params: data })
        .then(response => {
          const d = response.data;
          d.status ? success(d) : error(d);
        })
        .catch(catchFunc);
    }
  }
};

<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-if="showLogin">
        <div class="manage_img">
          <img src="../../../static/static_img/logo.png">
        </div>
        <el-form :model="form" :rules="rules" ref="form" status-icon>
          <el-form-item prop="username">
            <el-input v-model="form.username" prefix-icon="el-icon-my-people" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-my-password"
              v-model="form.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @keyup.enter.native="login" type="primary" @click="login" class="submit_btn">登 录</el-button>
          </el-form-item>
        </el-form>
       <div class="powered_by">
              <span>©powered by <a style="margin-left: 5px;" target="_blank" href="https://www.hongjianguo.com"><img style="width: 64px;" src="/static/static_img/hongjianguo.png"></a></span>
        </div>
      </section>
    </transition>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      showLogin: false,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    ...mapMutations(["setUser"]),
    async login() {
      // const flag = await checkLogin();
      // console.log(flag)
      // if(this.username && this.password) {
      this.$refs.form.validate(_ => {
        if (_) {
          const url = "/login";
          const data = {
            username: this.form.username,
            password: this.form.password
          };
          const success = async d => {
            if (d && d.data && d.data.token) {
              this.$message({
                message: "登录成功,正在跳转...",
                type: "success"
              });
              //登录成功移除keydown
              window.removeEventListener('keydown', 
                this.handleKeyDown
              ,true)
              // window.appCache = this;
              this.$store.commit("LOGIN", d.data.token);
              await new Promise((resolve, reject) => {
                // if(!this.$store.getters.getToken) {
                this.getUserInfos();
                // }
                resolve();
              });
              setTimeout(() => {
                this.$router.push({ path: "/index" });
              }, 1000);
            }
          };
          this.$axiosPost({ url, data, success });
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名密码",
            offset: 100
          });
          return false;
        }
      });

      // }
    },
    handleKeyDown (e) {
      let key = null;
      if(window.event === undefined){
        key = e.keyCode;
      }else{
        key = window.event.keyCode;
      }
      if(key === 13){
        this.login();
      }
    },
    getUserInfos() {
      this.$axiosGet({
        url: "/userinfo",
        success: _ => {
          if (_.status == 1) {
            // if(!window.appCache) {
            //     window.appCache = {};
            // }
            //  	window.appCache.userinfo = _.member;
            //  	console.log(window.appCache.userinfo)
            this.setUser(_.member);
            // window.localStorage.setItem("userinfo",JSON.stringify(_.member));
          } else {
            window.localStorage.removeItem("token");
            // this.$router.push({ path: "/login" });
          }
        }
      });
    }
  },
  created(){
    let _self = this;
    window.addEventListener('keydown',
      _self.handleKeyDown
    ,true)  
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" >
.login_page {
  width: 100%;
  height: 100%;
  background: #75b9e6;
}
.manage_img {
  position: absolute;
  width: 100%;
  top: -50px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  width: 320px;
  height: 166px;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-top: -90px;
  margin-left: -200px;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
    position: relative;
  }
}
.powered_by {
  position: absolute;
  bottom: -30px;
  right: 0;
  color: #77869f;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
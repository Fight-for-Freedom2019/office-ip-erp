//验证是否登陆并获得一些基础资源信息,若获取失败则直接跳转至登陆页面
const token = window.localStorage.getItem("token");
$.ajax({
  url: '/api/userinfo',
  type: 'GET',
  async: false,
  beforeSend: function(res){
    res.setRequestHeader('Authorization', token)
  },
  success: function (_) {
    if (_.status) {
      if(!window.appCache) {
        window.appCache = {};
      }
      window.appCache.userinfo = _.member;
    }else {
     // window.location.href = '/login';
    }
  },
  error: function (_) {
    // window.location.href = '/login';
  }
})
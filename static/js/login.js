//验证是否登陆并获得一些基础资源信息,若获取失败则直接跳转至登陆页面
(function(){
  const token = window.localStorage.getItem("token");
  if (!token) return;
    $.ajax({
      url: '/userinfo',
      type: 'GET',
      async: false,
      beforeSend: function(res){
        res.setRequestHeader('Authorization', token)
      },
      success: function (_) {
        if (_.status) {
          /*if(!window.appCache) {
            window.appCache = {};
          }*/
          window.localStorage.setItem("userinfo",JSON.stringify(_.member));
          //window.appCache.userinfo = _.member;
        }else {
          window.localStorage.removeItem("token");
          window.location.href = '/';
        }
      },
      error: function (xhr,status,error) {
        window.localStorage.removeItem("token");
        window.location.href = '/';
      }
    })
    
  
}())
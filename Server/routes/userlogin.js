'use strict';

var UserLogin = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/login',
      method:'POST',
      handler:function(request,reply){
        service.handleLogin(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = UserLogin;

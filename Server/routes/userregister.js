'use strict';

var Register = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/register',
      method:'POST',
      handler:function(request,reply){
        service.handleRegister(request,function(result){
          reply(result);
        });
      }
    };
    return route;
  }

}

module.exports = Register;

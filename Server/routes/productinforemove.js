'use strict';

var ProductInfoRemove = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/productinforemove',
      method:'POST',
      handler:function(request,reply){
        service.handleRemove(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = ProductInfoRemove;

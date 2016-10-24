'use strict';

var ProductInfoUpdate = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/productinfoupdate',
      method:'POST',
      handler:function(request,reply){
        service.handleUpdate(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = ProductInfoUpdate;

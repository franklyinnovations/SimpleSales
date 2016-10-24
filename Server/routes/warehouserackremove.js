'use strict';

var WarehouseRackRemove = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/warehouserackremove',
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

module.exports = WarehouseRackRemove;

'use strict';

var WarehouseRemove = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/warehouseremove',
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

module.exports = WarehouseRemove;

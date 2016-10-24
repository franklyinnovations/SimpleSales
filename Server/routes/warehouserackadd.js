'use strict';

var WarehouseRackAdd = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/warehouserackadd',
      method:'POST',
      handler:function(request,reply){
        service.handleAdd(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = WarehouseRackAdd;

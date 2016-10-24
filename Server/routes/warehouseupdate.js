'use strict';

var WarehouseUpdate = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/warehouseupdate',
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

module.exports = WarehouseUpdate;

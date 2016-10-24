'use strict';

var WarehouseFindOne = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/warehousefindone',
      method:'GET',
      handler:function(request,reply){
        service.handleFindOne(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = WarehouseFindOne;

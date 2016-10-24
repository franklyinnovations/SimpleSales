'use strict';

var WarehouseFindAll = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/warehousefindall',
      method:'GET',
      handler:function(request,reply){
        service.handleFindAll(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = WarehouseFindAll;

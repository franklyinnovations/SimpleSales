'use strict';

var WarehouseRackFindAll = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/warehouserackfindall',
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

module.exports = WarehouseRackFindAll;

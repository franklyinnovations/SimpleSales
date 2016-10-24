'use strict';

var WarehouseRackFindOne = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/warehouserackfindone',
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

module.exports = WarehouseRackFindOne;

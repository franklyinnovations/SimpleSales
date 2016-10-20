'use strict';

var ProductTypes = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/producttypes',
      method:'GET',
      handler:function(request,reply){
        service.handleQueryAllTypes(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = ProductTypes;

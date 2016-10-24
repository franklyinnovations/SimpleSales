'use strict';

var ProductInfoQueryOne = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/productinfoqueryone',
      method:'GET',
      handler:function(request,reply){
        service.handleQueryOne(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = ProductInfoQueryOne;

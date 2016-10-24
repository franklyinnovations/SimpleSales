'use strict';

var ProductInfoPagingQuery = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/productinfopagingquery',
      method:'GET',
      handler:function(request,reply){
        service.handlePagingQuery(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = ProductInfoPagingQuery;

'use strict';

var ProductTypeUpdate = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/producttypesupdate',
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

module.exports = ProductTypeUpdate;

'use strict';

var SupplierRemove = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/supplierremove',
      method:'POST',
      handler:function(request,reply){
        service.handleRemove(request,function(result){
          reply(result);
        });
      }
    }
    return route;
  }
};

module.exports = SupplierRemove;

'use strict';

var SupplierUpdate = function(service){
  var _service = service;

  this.getRoute = function(){
    var route = {
      path:'/supplierupdate',
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

module.exports = SupplierUpdate;

'use strict';
var ProductInfoService = function(_dao){
  var dao = _dao;

  this.handleAdd = function(request,callback){
    var info = {};
    info.name = request.payload.name;
    info.userId = Number(request.payload.userId);
    info.supplyPrice = Number(request.payload.supplyPrice);
    info.sellPrice = Number(request.payload.sellPrice);
    info.supplierId = Number(request.payload.supplierId);
    info.typeId = Number(request.payload.typeId);
    info.unitName = request.payload.unitName;
    info.barcode = request.payload.barcode;
    info.itemcode = request.payload.itemcode;
    console.log('ProductInfoService::handleSave:args = ');
    console.log(info);
    this.save(info,callback);
  };
  this.handleUpdate=function(request,callback){
    var info = {};
    if(request.payload.id != null){
      info.id = Number(request.payload.id);
    }
    if(request.payload.userId != null){
      info.userId = Number(request.payload.userId);
    }
    if(request.payload.name){
      info.name = request.payload.name;
    }
    if(request.payload.supplierId != null){
      info.supplierId = Number(request.payload.supplierId);
    }
    if(request.payload.typeId != null){
      info.typeId = Number(request.payload.typeId);
    }
    if(request.payload.barcode){
      info.barcode = request.payload.barcode;
    }
    if(request.payload.itemcode){
      info.itemcode = request.payload.itemcode;
    }
    if(request.payload.supplyPrice != null){
      info.supplyPrice = Number(request.payload.supplyPrice);
    }
    if(request.payload.sellPrice != null){
      info.sellPrice = Number(request.payload.sellPrice);
    }
    console.log('ProductInfoService::handleUpdate:args = ');
    console.log(info);
    this.update(info,callback);
  };
  this.handleRemove=function(request,callback){
    var info = {};
    if(request.payload.id != null){
      info.id = Number(request.payload.id);
    }
    if(request.payload.userId != null){
      info.userId = Number(request.payload.userId);
    }
    if(request.payload.name){
      info.name = request.payload.name;
    }
    if(request.payload.supplierId != null){
      info.supplierId = Number(request.payload.supplierId);
    }
    if(request.payload.typeId != null){
      info.typeId = Number(request.payload.typeId);
    }
    if(request.payload.barcode){
      info.barcode = request.payload.barcode;
    }
    if(request.payload.itemcode){
      info.itemcode = request.payload.itemcode;
    }
    if(request.payload.supplyPrice != null){
      info.supplyPrice = Number(request.payload.supplyPrice);
    }
    if(request.payload.sellPrice != null){
      info.sellPrice = Number(request.payload.sellPrice);
    }
    console.log('ProductInfoService::handleRemove:args = ');
    console.log(info);
    this.remove(info,callback);
  };
  this.handleQueryOne=function(request,callback){
    var args = request.url.query;
    this.get(args,callback);
  };

  this.handlePagingQuery=function(request,callback){
    var args = request.url.query;
    console.log('ProductInfoService::handleUpdate:args = ');
    console.log(args);
    this.pagingQuery(args,callback);
  };

  this.save=function(args,callback){
    dao.save(args,callback);
  };
  this.update=function(args,callback){
    dao.update(args,callback);
  };
  this.queryOne=function(args,callback){
    dao.get(args,callback);
  };
  this.pagingQuery=function(args,callback){
    dao.findAllWithPage(args,callback);
  };
  this.remove = function(args,callback){
    dao.remove(args,callback);
  }
}


module.exports = ProductInfoService

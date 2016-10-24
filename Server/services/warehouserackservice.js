'use strict';

var WarehouseRackService = function(_dao){
  var dao = _dao;

  this.handleAdd = function(request,callback){
    var _name = request.payload.name;
    var _userId = request.payload.userId;
    var _warehouseId = request.payload.warehouseId;
    var _position = request.payload.position;
    var args = {
      name:_name,
      userId:_userId,
      warehouseId:_warehouseId,
      position:_position
    };
    this.save(args,callback);
  };

  this.handleUpdate = function(request,callback){
    var _name = request.payload.name;
    var _userId = request.payload.userId;
    var _warehouseId = request.payload.warehouseId;
    var _position = request.payload.position;
    var _id = request.payload.id;
    var args = {
      id:_id,
      name:_name,
      userId:_userId,
      warehouseId:_warehouseId,
      position:_position
    };
    this.update(args,callback);
  };

  this.handleRemove = function(request,callback){
    var _name = request.payload.name;
    var _userId = request.payload.userId;
    var _warehouseId = request.payload.warehouseId;
    var _position = request.payload.position;
    var _id = request.payload.id;
    var args = {
      id:_id,
      name:_name,
      userId:_userId,
      warehouseId:_warehouseId,
      position:_position
    };
    this.remove(args,callback);
  };

  this.handleFindOne = function(request,callback){
    var args = request.url.query;
    this.findOne(args,callback);
  };

  this.handleFindAll = function(request,callback){
    var args = request.url.query;
    this.findAll(args,callback);
  }

  this.save = function(args,callback){
    dao.save(args,callback);
  };

  this.update = function(args,callback){
    dao.update(args,callback);
  }

  this.remove = function(args,callback){
    dao.remove(args,callback);
  }

  this.findOne = function(args,callback){
    dao.findOne(args,callback);
  }

  this.findAll = function(args,callback){
    dao.findAll(args,callback);
  }

};

module.exports = WarehouseRackService;

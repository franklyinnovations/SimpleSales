'use strict';

var WarehouseService = function(_dao){
  var dao = _dao;
  this.handleAdd = function(request,callback){
    var _userId = request.payload.userId;
    var _name = request.payload.name;
    var _position = request.payload.position;
    var _warehouseId = request.payload.warehouseId;
    var args = {
      name:_name,
      position:_position,
      userId:_userId,
      warehouseId:_warehouseId
    };
    this.save(args,callback);
  };
  this.handleUpdate = function(request,callback){
    var _id = request.payload.id;
    var _userId = request.payload.userId;
    var _name = request.payload.name;
    var _position = request.payload.position;
    var _warehouseId = request.payload.warehouseId;
    var args = {
      id:_id,
      name:_name,
      position:_position,
      userId:_userId,
      warehouseId:_warehouseId
    };
    this.update(args,callback);
  };
  this.handleRemove = function(request,callback){
    var _id = request.payload.id;
    var _userId = request.payload.userId;
    var _name = request.payload.name;
    var _position = request.payload.position;
    var _warehouseId = request.payload.warehouseId;
    var args = {
      id:_id,
      name:_name,
      position:_position,
      userId:_userId,
      warehouseId:_warehouseId
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
  };
  this.save = function(args,callback){
    dao.save(args,callback);
  };
  this.update = function(args,callback){
    dao.update(args,callback);
  };
  this.remove = function(args,callback){
    dao.remove(args,callback);
  };
  this.findOne = function(args,callback){
    dao.findOne(args,callback);
  };
  this.findAll = function(args,callback){
    dao.findAll(args,callback);
  };
};

module.exports = WarehouseService;

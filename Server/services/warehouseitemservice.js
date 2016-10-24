'use strict';

var WarehouseItemService = function(_dao){
  var dao = _dao;

  this.handleAdd = function(request,callback){

  };

  this.handleUpdate = function(request,callback){

  };

  this.handleRemove = function(request,callback){

  };

  this.handleFindOne = function(request,callback){

  };

  this.handleFindAll = function(request,callback){

  };

  this.handlFindAllWidthPage = function(request,callback){

  };

  this.save = function(args,callback){
    dao.save(args,callbac);
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
  
  this.findAllWithPage = function(args,callback){
    dao.findAllWithPage(args,callback);
  }
}

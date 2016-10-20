'use strict';
var ProductTypeService = function(_dao){
  var url =require('url');
  var querystring = require('querystring');
  var dao = _dao;
  this.handleQueryAllTypes = function(request,callback){
    console.log(request.url.path);
    var args = request.url.query;
    console.log(args);
    //var args = querystring.parse(query);

    console.log(args);
    if(args && args.node == 'root'){
      dao.findSubTypes({
        userId:Number(args.userId),
        parentId:-1
      },function(results){
        if(callback){
          callback(results);
        }
      });
    }else{
      dao.findSubTypes({
        userId:Number(args.userId),
        parentId:Number(args.node)
      },function(results){
        if(callback){
          callback(results);
        }
      });
    }

  }

  this.handleUpdate = function(request,callback){
    var _userId = request.payload.userId;
    var _name = request.payload.name;
    var _id = request.payload.id;
    console.log(request.payload);
    var type = {
      name:_name,
      userId:_userId,
      id:_id
    }
    dao.update(type,function(result){
      if(callback){
        callback(result);
      }
    });
  };

  this.handleRemove = function(request,callback){
    console.log(request.payload);
    var _userId = request.payload.userId;
    var _id = request.payload.id;
    var _leaf = request.payload.leaf == 'true' ? true:false;
    var _root = request.payload.root == 'true' ? true:false;
    var args = {
      userId:_userId,
      id:_id,
      leaf:_leaf,
      root:_root
    }
    dao.remove(args,function(results){
      if(callback){
        callback(results);
      }
    });
  };

  this.handleAdd = function(request,callback){
    var _userId = request.payload.userId;
    var _leaf = request.payload.leaf;
    var _name = request.payload.name;
    var _parentid = request.payload.parentId;
    var type = {
      name:_name,
      userId:_userId,
      parentId:_parentid,
      isLeaf:_leaf
    }
    dao.save(type,function(result){
      if(callback){
        callback(result);
      }
    });
  }

}

module.exports = ProductTypeService;

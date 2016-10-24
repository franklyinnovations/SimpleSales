'use strict';

var WarehouseItemDao = function(db){
  const RES_INVALID_OBJECT = -4;
  const RES_SUCCESS = 0;
  const RES_NAME_EXISTED = -1;
  const RES_CODE_EXISTED = -2;
  const RES_INTERNAL_ERR = -500;

  var WarehouseItem = db['WarehouseItem'];
  var async = require('async');
  var sequelize = db.sequelize;

  this.save = function(args,callback){
    if(!args || args.userId == null || args.warehouseId == null ||
        args.productId == null || args.productCounts == null ||
        args.warehouseRackId == null){
          if(callback){
            callback({
              result:'failed',
              code:RES_INVALID_OBJECT,
              message:'invalid arguments'
            });
          }
          return;
        }

      sequelize.transaction(function(tx){
        return WarehouseItem.create(args,{transaction:tx});
      }).then(function(result){
        var msg = {
          result:'success';
          code:RES_SUCCESS,
          rows:[]
        }
        if(result){
          args.id = result.get('id');
          msg.rows.push(result.get('id'));
        }
        if(callback){
          callback(msg);
        }
      }).catch(function(ex){
        console.log(ex);
        if(callback){
          callback({
            result:'failed',
            code:RES_INTERNAL_ERR,
            message:'internal errror'
          })
        }
      });
  };

  this.update = function(args,callback){
    if(!args || args.userId == null || args.id == null || args.productId == null ||
    args.productCounts == null ||
    (args.productCounts != null && args.productCounts <=0)){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid arguments';
        })
      }
      return;
    }

    var selection= {};
    if(args.productCounts != null){
      selection.productCounts = args.productCounts;
    }
    if(args.productId != null){
      selection.productId = args.productId;
    }
    if(args.warehouseId != null){
      selection.warehouseId = args.warehouseId;
    }

    if(args.warehouseRackId != null){
      selection.warehouseRackId = args.warehouseRackId;
    }

    sequelize.transaction(function(tx){
      return WarehouseItem.update(selection,{where:{userId:args.userId,id:args.id}},{transaction:tx});
    }).then(function(result){
      var msg ={
        result:'success',
        code:RES_SUCCESS,
        rows:[]
      };
      if(result){
        msg.rows.push(result);
      }
      if(callback){
        callback(msg);
      }
    }).catch(function(ex){
      console.log(ex);
      if(callback){
        callback({
          result:'failed',
          code:RES_INTERNAL_ERR,
          message:'internal error'
        });
      }
    });

  };

  this.remove = function(args,callback){
    if(!args || args.userId = null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'inalid arguments'
        })
      }
      return;
    }
    var selection = {userId:args.userId};
    if(args.id != null){
      selection.id = args.id;
    }

    if(args.productId != null){
      selection.productId = args.productId;
    }

    if(args.warehouseId != null){
      selection.warehouseId = args.warehouseId;
    }

    if(args.warehouseRackId != null){
      selection.warehouseRackId = args.warehouseRackId;
    }

    if(args.productCounts != null){
      selection.productCounts = args.productCounts;
    }

    sequelize.transaction(function(tx){
      return WarehouseItem.destroy({where:selection},{transaction:tx});
    }).then(function(result){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        rows:[]
      };
      if(result){
        msg.rows.push(result);
      }
      if(callback){
        callback(msg);
      }
    }).catch(function(ex){
      console.log(ex);
      if(callback){
        callback({
          result:'failed',
          code:RES_INTERNAL_ERR,
          message:'internal error'
        });
      }
    });

  };

  this.findOne = function(args,callback){

  };

  this.findAll = function(args,callback){

  };

  this.findAllWidthPage = function(args,callback){

  };

}

module.exports = WarehouseItemDao;

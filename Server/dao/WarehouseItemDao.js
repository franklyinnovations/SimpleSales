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
          result:'success',
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
          message:'invalid arguments'
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
    if(!args || args.userId == null){
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
    if(!args || args.userId == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid arguments'
        });
      }
      return;
    }

    var sql = 'select pi.name as Name,pi.barcode as Barcode,pi.itemCode as ItemCode, pt.name as TypeName,sp.name as Supplier,wh.name as Warehouse,whi.productCounts as ProductCounts,pi.supplyPrice as SupplyPrice,whr.name as RackName,whr.position as RackPosition, pi.supplyPrice * whi.productCounts as SupplyAmounts from ProductInfos as pi,Warehouses as wh,WarehouseItems as whi ,WarehouseRacks as whr,ProductTypes as pt,Suppliers as sp where pi.userId = wh.userId and pi.userId = whi.userId and whr.warehouseId=wh.id and whi.warehouseRackId=whr.id and pi.id = whi.productId and pi.typeId=pt.id and pi.supplierId = sp.id '
    var totalsql = 'select  count(whi.id) as ids from WarehouseItems as whi,ProductInfos as pi,Suppliers as sp,ProductTypes as pt where whi.productId = pi.id and whi.userId = pi.userId and pi.userId = 1 and pt.id = pi.typeId and sp.id = pi.supplierId ';

    if(args.productId != null){
      var where = ' and pid = ' + args.productId;
      sql = sql + where;
      totalsql = totalsql + ' and pid = ' + args.productId;
    }
    if(args.typeId != null){
      var where = ' and pi.typeId = ' + args.typeId;
      totalsql = totalsql + where;
    }
    if(args.supplierId != null){
      var where = ' and pi.supplierId = ' + args.supplierId;
      sql = sql + where;
      totalsql = totalsql + where;
    }
    if(args.barCode){
      var where = ' and pi.barcode ="' + args.barcode + '"';
      sql = sql + where;
      totalsql = totalsql +  where;
    }
    if(args.itemCode){
      var where = ' and pi.itemcode = "' + args.itemCode + '"';
      sql = sql +  where;
      totalsql = totalsql + where;
    }
    if(args.supplierName){
      var where = ' and sp.name = "' + args.supplierName + '"';
      sql = sql + where;
      totalsql = totalsql + where;
    }
    if(args.recordId){
      var where = ' and whi.recordId = "' + args.recordId + '"';
      sql = sql + where;
      totalsql = totalsql + where;
    }

    if(args.startRecordDate && !args.endRecordDate){
      var where = ' and whi.recordDate = "' + args.recordDate + '"';
      sql = sql + where;
      totalsql = totalsql + where;
    }
    if(args.startRecordDate && args.endRecordDate){
      var where = ' and whi.recordDate between "' + args.startRecordDate + '" and "' + args.endRecordDate + '"';
      sql = sql + where;
      totalsql = totalsql +  where;
    }
    if(args.typeName){
      var where = ' and pt.name = "' + args.typeName + '"';
      sql = sql + where;
      totalsql = totalsql + where;
    }
    if(args.offset != null && args.limit != null){
      var limits = ' limit ' + args.offset + ',' + args.limit;
      sql = sql + limits;
    }
    var _total = 0;
    function getTotals(done){
      sequelize.query(totalsql,{type: sequelize.QueryTypes.RAW}).spread(function(results,metas){
        console.log(results);
        _total = results[0].ids;
        done(null,'doQuery');
      });
    }
    function doQuery(done){
      sequelize.query(sql,{type: sequelize.QueryTypes.RAW}).spread(function(results,metas){
        var msg = {
          result:'success',
          total:_total,
          rows:[]
        };
        if(results && results.length > 0){
        //  msg.total = results.length;
          results.forEach(function(result){
            msg.rows.push(result);
          });
        }
        if(callback){
          callback(msg);
        }
        done(null,null);
      });
    }
    async.series([getTotals,doQuery]);
  };

  this.findAll = function(args,callback){

  };

  this.findAllWidthPage = function(args,callback){

  };

}

module.exports = WarehouseItemDao;

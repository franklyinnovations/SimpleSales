'use strict';

var ProductInfoDao = function(db){
  const RES_INVALID_OBJECT = -4;
  const RES_SUCCESS = 0;
  const RES_NAME_EXISTED = -1;
  const RES_CODE_EXISTED = -2;
  const RES_BARCODE_EXISTED = -3;
  const RES_ITEMCODE_EXISTED = -4;
  const RES_INTERNAL_ERR = -500;

  var ProductInfo = db['ProductInfo'];
  var async = require('async');
  var sequelize = db.sequelize;

  function isBarcodeExisted(_userId,_barcode,callback){
    ProductInfo.findOne({where:{userId:_userId,barcode:_barcode}}).then(function(result){
      var existed = false;
      if(result){
        existed = true;
      }
      if(callback){
        callback(existed);
      }
    });
  }

  function isItemCodeExisted(_userId,_itemCode,callback){
    ProductInfo.findOne({where:{userId:_userId,itemcode:_itemCode}})
    .then(function(result){
      var existed = false;
      if(result){
        existed = true;
      }
      if(callback){
        callback(existed);
      }
    });
  }

  function getTotal(args,callback){
    var sql = "select count(id) as ids from ProductInfos where userId = " + args.userId;
    if(args.typeId != null){
      sql = sql + ' and typeId = ' + args.typeId;
    }
    if(args.supplierId != null){
      sql = sql + 'and supplierId = ' + args.supplierId;
    }
    if(args.barcode){
      sql = sql + ' and barcode = "' + args.barcode + '"';
    }
    if(args.itemcode){
      sql = sql + ' and itemcode = "' + args.itemcode + '"';
    }
    if(args.name){
      sql = sql + ' and name = "' + args.name + '"';
    }
    sequelize.query(sql).spread(function(results,metas){
      var total = 0;
      console.log(results);
      if(results && results.length > 0){
        total = results[0].ids;
      }
      if(callback){
        callback(total);
      }
    });
  }

  this.save = function(info,callback){
    if(!info || info.userId == null || info.barcode == null ||
      info.itemcode == null || info.name == null){
        if(callback){
          callback({
            result:'failed',
            code:RES_INVALID_OBJECT,
            message:'invalid args'
          });
        }
        return;
    }

    var barcodeExisted = false;
    var itemcodeExisted = false;

    function hasBarcode(done){
      isBarcodeExisted(info.userId,info.barcode,function(result){
        barcodeExisted = result;
        done(null,'hasItemcode');
      });
    }

    function hasItemcode(done){
      isItemCodeExisted(info.userId,info.itemcode,function(result){
        itemcodeExisted = result;
        done(null,'doSave');
      });
    }

    function doSave(done){
      if(barcodeExisted){
        if(callback){
          callback({
            result:'failed',
            code:RES_BARCODE_EXISTED,
            message:'barcode has existed'
          })
        }
        done(null,null);
        return;
      }

      if(itemcodeExisted){
        if(callback){
          callback({
            result:'failed',
            code:RES_ITEMCODE_EXISTED,
            message:'itemcode has existed'
          });
        }
        done(null,null);
        return;
      }

      sequelize.transaction(function(tx){
        return ProductInfo.create(info,{transaction:tx});
      }).then(function(infoobj){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          datas:{
            rows:[]
          }
        }
        if(infoobj){
          info.id = infoobj.get('id');
          msg.datas.rows.push(infoobj);
        }else{
          msg.result = 'failed';
          msg.code = RES_INTERNAL_ERR;
          msg.message = 'save,internal error';
        }
        if(callback){
          callback(msg);
        }
        done(null,null);
      }).catch(function(ex){
        console.log(ex);
        var msg = {
          result:'failed',
          code:RES_INTERNAL_ERR,
          message:'internal error'
        };
        if(callback){
          callback(msg);
        }
        done(null,null);
      });

    }

    async.series([hasBarcode,hasItemcode,doSave]);

  };

  this.update = function(info,callback){
    if(!info || info.userId == null || info.id == null){
        if(callback){
          callback({
            result:'failed',
            code:RES_INVALID_OBJECT,
            message:'invalid args'
          });
        }
        return;
    }

    var barcodeExisted = false;
    var itemcodeExisted = false;

    function hasBarcode(done){
      isBarcodeExisted(info.userId,info.barcode,function(result){
        barcodeExisted = result;
        done(null,'hasItemcode');
      });
    }

    function hasItemcode(done){
      isItemCodeExisted(info.userId,info.itemcode,function(result){
        itemcodeExisted = result;
        done(null,'doSave');
      });
    }

    function doUpdate(done){
      if(barcodeExisted){
        if(callback){
          callback({
            result:'failed',
            code:RES_BARCODE_EXISTED,
            message:'barcode has existed'
          })
        }
        done(null,null);
        return;
      }

      if(itemcodeExisted){
        if(callback){
          callback({
            result:'failed',
            code:RES_ITEMCODE_EXISTED,
            message:'itemcode has existed'
          });
        }
        done(null,null);
        return;
      }

      sequelize.transaction(function(tx){
        return ProductInfo.update(info,{where:{id:info.id,userId:info.userId}},
          {transaction:tx});
        })
        .then(function(result){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          datas:{
            rows:[]
          }
        }
        if(result){

          msg.datas.rows.push(result);
        }else{
          msg.result = 'failed';
          msg.code = RES_INTERNAL_ERR;
          msg.message = 'save,internal error';
        }
        if(callback){
          callback(msg);
        }
        done(null,null);
      }).catch(function(ex){
        console.log(ex);
        var msg = {
          result:'failed',
          code:RES_INTERNAL_ERR,
          message:'internal error'
        };
        if(callback){
          callback(msg);
        }
        done(null,null);
      });

    }
    if(info.itemcode && info.barcode){
      async.series([hasBarcode,hasItemcode,doUpdate]);
    }else if(info.itemcode && !info.barcode){
      async.series([hasItemcode,doUpdate]);
    }else if(!info.itemcode && info.barcode){
      async.series([hasBarcode,doUpdate]);
    }else{
      async.series([doUpdate]);
    }
  };

  this.get = function(args,callback){
    if(!args || args.userId == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid arguments'
        })
      }
      return;
    }
    var sql = 'select t1.*,t2.name as supplierName,t3.name as typeName from ProductInfos as t1,Suppliers as t2,ProductTypes as t3 where t1.supplierId = t2.id and t1.typeId = t3.id and t1.userId = ' + args.userId;
    if(args.id != null){
      sql = sql + ' and t1.id = ' + args.id;
    }
    if(args.name){
      sql = sql + ' and t1.name = "' + args.name + '"';
    }
    if(args.barcode){
      sql = sql + ' and t1.barcode = "' + args.barcode + '"';;
    }
    if(args.itemcode){
      sql = sql + ' and t1.itemcode = "' + args.itemcode + '"';;
    }
    sequelize.query(sql,{type: sequelize.QueryTypes.RAW}).spread(function(result,metas){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        total:0,
        rows:[]
      };
      //console.log(result)
      if(result && result.length > 0){
        msg.total = result.length;
        result.forEach(function(row){
          msg.rows.push(row);
        });

      }
      if(callback){
        callback(msg);
      }
    });
  };

  this.remove = function(args,callback){
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
    var selection = {};
    if(args.id){
      selection.id = args.id;
    }
    if(args.name){
      selection.name = args.name;
    }
    if(args.barcode){
      selection.barcode = args.barcode;
    }
    if(args.itemcode){
      selection.itemcode = args.itemcode;
    }
    if(args.userId != null){
      selection.userId = args.userId;
    }

    sequelize.transaction(function(tx){
      return ProductInfo.destroy({where:selection},{transaction:tx});
    }).then(function(res){
      if(callback){
        callback({
          result:'success',
          code:RES_SUCCESS,
          rows:[res]
        });
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

  this.findAll = function(args,callback){
    if(!args || args.userId == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid arguments'
        })
      }
      return;
    }
    var queryArgs = {userId:args.userId};
    var sql = 'select t1.*,t2.name as supplierName,t3.name as typeName from ProductInfos as t1,Suppliers as t2,ProductTypes as t3 where t1.supplierId = t2.id and t1.typeId = t3.id and t1.userId = ' + args.userId;
    if(args.id != null){
      sql = sql + ' and t1.id = ' + args.id;
      queryArgs.id = args.id;
    }
    if(args.name){
      sql = sql + ' and t1.name = "' + args.name + '"';
      queryArgs.name = args.name;
    }
    if(args.barcode){
      sql = sql + ' and t1.barcode = "' + args.barcode + '"';
      queryArgs.barcode = args.barcode;
    }
    if(args.itemcode){
      sql = sql + ' and t1.itemcode = "' + args.itemcode + '"';
      queryArgs.itemcode = args.itemcode;
    }

    if(args.supplierId != null){
      sql = sql + ' and t1.supplierId = ' + args.supplierId;
      queryArgs.supplierId = args.supplierId;
    }
    if(args.typeId){
      sql = sql + ' and t1.typeId = ' + args.typeId;
      queryArgs.typeId = args.typeId;
    }
    if(args.page != null && args.limit != null){
      var _page = args.page <= 0 ? 0 : args.page - 1;
      var _pageSize = args.limit <= 0 ? 25 : args.limit;
      var _offset = _page * _pageSize;
      sql = sql + ' limit ' + _offset + ',' + _pageSize;
    }
    var _total = 0;
    function getCounts(done){
      getTotal(queryArgs,function(result){
        _total = result;
        console.log('total = ' + _total);
        done(null,'doQuery');
      });
    }

    function doQuery(done){
      sequelize.query(sql,{type: sequelize.QueryTypes.RAW}).spread(function(result,metas){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          total:_total,
          rows:[]
        };
        //console.log(result)
        if(result && result.length > 0){
          result.forEach(function(row){
            msg.rows.push(row);
          });

        }
        if(callback){
          callback(msg);
        }
        done(null,null);
      });
    }
    async.series([getCounts,doQuery])
  };

  this.findAllWithPage = function(args,callback){
    if(args.page == null){
      args.page = 1;
    }
    if(args.limit == null){
      args.limit = 25;
    }
    this.findAll(args,callback);
  };

};

module.exports = ProductInfoDao;

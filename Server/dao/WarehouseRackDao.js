'use strict';

var WarehouseRackDao = function(db){
  const RES_SUCCESS = 0;
  const RES_INVALID_OBJECT = -1;
  const RES_NAME_EXISTED = -2;
  const RES_INTERNAL_ERR = -500;

  var WarehouseRack = db['WarehouseRack'];
  var async = require('async');
  var sequelize = db.sequelize;

  function isNameExisted(_userId,_warehouseId,_rackName,callback){
    WarehouseRack.findOne({where:{userId:_userId,warehouseId:_warehouseId,
      name:_rackName}}).then(function(result){
      var existed = false;
      if(result){
        existed = true;
      }
      if(callback){
        callback(existed);
      }
    });
  }

  this.save = function(args,callback){
    if(!args || args.userId == null || args.warehouseId == null ||
      args.name == null || args.position == null){
        if(callback){
          callback({
            result:'failed',
            code:RES_INVALID_OBJECT,
            message:'invalid arguments'
          });
        }
        return;
    }

    var existed = false;
    function hasName(done){
      isNameExisted(args.userId,args.warehouseId,args.name,function(result){
          existed = result;
          done(null,'doSave');
      });
    }

    function doSave(done){
      if(existed){
        if(callback){
          callback({
            result:'failed',
            code:RES_INVALID_OBJECT,
            message:'name existed'
          })
        }
        return;
      }
      sequelize.transaction(function(tx){
        return WarehouseRack.create(args,{transaction:tx});
      }).then(function(result){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          rows:[]
        };
        if(result){
          args.id = result.get('id');
          msg.rows.push(args)
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
    async.series([hasName,doSave]);
  };

  this.update = function(args,callback){
    if(!args || args.userId == null || args.id == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid arguments'
        });
      }
      return;
    }

    var nameExisted = false;
    function hasName(done){
      isNameExisted(args.userId,args.warehouseId,args.name,function(result){
        nameExisted = result;
        done(null,'doUpdate');
      });
    }

    function doUpdate(done){
      if(nameExisted){
        if(callback){
          callback({
            result:'failed',
            code:RES_NAME_EXISTED,
            message:'name existed'
          })
        }
        return;
      }

      sequelize.transaction(function(tx){
        return WarehouseRack.update(args,{where:{id:args.id,userId:args.userId}},{transaction:tx})})
        .then(function(result){
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
            done(null,null);
      }).catch(function(ex){
        console.log(ex);
        if(callback){
          callback({
            result:'failed',
            code:RES_INTERNAL_ERR,
            message:'internal error'
          })
        }
        done(null,null);
      });

    }

    if(args.name){
      async.series([hasName,doUpdate])
    }else{
      async.series([doUpdate]);
    }
  }

  this.remove = function(args,callback){
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

    sequelize.transaction(function(tx){
      return WarehouseRack.destroy({where:args},{transaction:tx});
    }).then(function(result){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        rows:[]
      }
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
        })
      }
    });
  }

  this.findOne = function(args,callback){
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
    var selection = {userId:args.userId};
    if(args.id != null){
      selection.id = args.id;
    }
    if(args.name){
      selection.name = args.name;
    }
    if(args.position){
      selection.position = args.position;
    }
    if(args.warehouseId != null){
      selection.warehouseId = args.warehouseId;
    }
    WarehouseRack.findOne({where:selection}).then(function(result){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        rows:[]
      };
      if(result){
        var whr = {
          name:result.get('name'),
          warehouseId:result.get('warehouseId'),
          userId:result.get('userId'),
          position:result.get('position'),
          id:result.get('id')
        };
        msg.rows.push(whr);
      }
      if(callback){
        callback(msg);
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
        });
      }
      return;
    }

    var selection = {userId:args.userId};
    if(args.name){
      selection.name = args.name;
    }
    if(args.id != null){
      selection.id = args.id;
    }
    if(args.warehouseId != null){
      selection.warehouseId = args.warehouseId;
    }
    if(args.position){
      selection.position = args.position;
    }

    WarehouseRack.findAll({where:selection}).then(function(results){
      var msg = {
        result:'success',
        total:0,
        rows:[]
      };
      if(results && results.length > 0){
          msg.total = results.length;
          results.forEach(function(result){
            var whr = {
              name:result.get('name'),
              warehouseId:result.get('warehouseId'),
              userId:result.get('userId'),
              position:result.get('position'),
              id:result.get('id')
            };
            msg.rows.push(whr);
          });
      }
      if(callback){
        callback(msg);
      }
    });

  }

};

module.exports = WarehouseRackDao;

'use strict';

var WarehouseDao = function(db){
  const RES_SUCCESS = 0;
  const RES_INVALID_OBJECT = -1;
  const RES_NAME_EXISTED = -2;
  const RES_INTERNAL_ERR = -500;

  var Warehouse = db['Warehouse'];
  var async = require('async');
  var sequelize = db.sequelize;

  function isNameExisted(_name,_uid,callback){
    Warehouse.findOne({where:{name:_name,userId:_uid}}).then(function(result){
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
    if(!args || args.name == null || args.userId == null){
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
      isNameExisted(args.name,args.userId,function(result){
        existed = result;
        done(null,'doSave');
      });
    }

    function doSave(done){
      if(existed){
        if(callback){
          callback({
            result:'failed',
            code:RES_NAME_EXISTED,
            message:'name existed'
          });
        }

        return;
      }
      sequelize.transaction(function(tx){
        return Warehouse.create(args,{transaction:tx});
      }).then(function(result){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          rows:[]
        }
        if(result){
          args.id = result.get('id');
          msg.rows.push(args);
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
            message:'unknow error.'
          })
        }
        done(null,null);
      });
    }
    async.series([hasName,doSave]);
  };
  this.update = function(args,callback){
    if(!args || args.name == null || args.userId == null || args.id == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid arguments'
        })
      }
      return;
    }
    var existed = false;
    function hasName(done){
      isNameExisted(args.name,args.userId,function(result){
        existed = result;
        done(null,'doUpdate');
      });
    }

    function doUpdate(done){
      if(existed){
        if(callback){
          callback({
            result:'failed',
            code:RES_NAME_EXISTED,
            message:'name existed'
          })
        }
        done(null,null);
        return;
      }
      sequelize.transaction(function(tx){
        return Warehouse.update(args,{where:{id:args.id,userId:args.userId}},
          {transaction:tx});
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
        done(null,null);
      }).catch(function(ex){
        console.log(ex);
        if(callback){
          callback({
            result:'failed',
            code:RES_INTERNAL_ERR,
            message:'unknow error.'
          })
        }
        done(null,null);
      });
    }
    async.series([hasName,doUpdate]);
  };

  this.remove = function(args,callback){
    if(!args || args.id == null || args.userId == null){
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
      return Warehouse.destroy({where:args},{transaction:tx});
    }).then(function(result){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        rows:[result]
      };
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
    var selection = {userId:args.userId};
    if(args.name){
      selection.name = args.name;
    }
    if(args.id){
      selection.id = args.id;
    }
    Warehouse.findOne({where:selection}).then(function(result){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        rows:[]
      }
      if(result){
        var wh = {
          id:result.get('id'),
          name:result.get('name'),
          userId:args.userId
        };
        msg.rows.push(wh);
      }
      if(callback){
        callback(msg);
      }
    });
  }

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

    Warehouse.findAll({where:{userId:args.userId}}).then(function(results){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        total:0,
        rows:[]
      }
      if(results && results.length > 0){
        msg.total = results.length;
        results.forEach(function(result){
          var wh = {
            id:result.get('id'),
            name:result.get('name'),
            userId:args.userId
          };
          msg.rows.push(wh);
        });
      }
      if(callback){
        callback(msg);
      }
    });
  }
}

module.exports = WarehouseDao;

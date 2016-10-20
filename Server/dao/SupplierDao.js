'use strict';

var SupplierDao = function(db){
  const RES_INVALID_OBJECT = -4;
  const RES_SUCCESS = 0;
  const RES_NAME_EXISTED = -1;
  const RES_CODE_EXISTED = -2;
  const RES_INTERNAL_ERR = -500;

  var Supplier = db['Supplier'];
  var async = require('async');
  var sequelize = db.sequelize;

  function isExisted(_name,_userId,callback){
    Supplier.findOne({where:{name:_name,userId:_userId}}).then(function(supplier){
      var existed = false;
      if(supplier){
          existed = true;
      }
      if(callback){
        callback(existed);
      }
    });
  }

  this.save = function(supplier,callback){
    if(!supplier || supplier.name == null || supplier.userId == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid supplier object'
        })
      }
      return;
    }

    var existed = false;

    function hasExisted(done){
      isExisted(supplier.name,supplier.userId,function(result){
        existed = result;
        done(null,"handleSave");
      });
    }

    function handleSave(done){
      if(existed){
        if(callback){
          callback({
            result:'failed',
            code:RES_NAME_EXISTED,
            message:'[' + supplier.name + ']has existed'
          });
        }
        done(null,null);
        return;
      }

      sequelize.transaction(function(tx){
        return Supplier.create(supplier,{transaction:tx});
      }).then(function(result){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          datas:null
        }
        if(!result){
          msg.result = 'failed';
          msg.code = RES_INTERNAL_ERR,
          msg.datas = null;
          msg.message = 'internal error';
        }else{
          supplier.id = result.get('id')
          msg.datas = supplier;
        }
        if(callback){
          callback(msg)
        }
        done(null,null);
      }).catch(function(ex){
        console.log(ex);
        if(callback){
          callback({
            result:'failed',
            code:RES_INTERNAL_ERR,
            message:'unknow error'
          });
        }
        done(null,null);
      });

    }

    async.series([hasExisted,handleSave]);
  };

  this.update = function(supplier,callback){
    if(!supplier || supplier.id == null || supplier.userId == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid supplier object'
        })
      }
      return;
    }

    var existed = false;

    function hasExisted(done){
      isExisted(supplier.name,supplier.userId,function(result){
        existed = result;
        done(null,"handleUpdate");
      });
    }

    function handleUpdate(done){
      if(existed){
        if(callback){
          callback({
            result:'failed',
            code:RES_NAME_EXISTED,
            message:'[' + supplier.name + ']has existed'
          });
        }
        done(null,null);
        return;
      }

      sequelize.transaction(function(tx){
        return Supplier.update(supplier,{where:{id:supplier.id,userId:supplier.userId}},
          {transaction:tx});
      }).then(function(result){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          datas:result
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
          message:'unknow internal error'
        }
        if(callback){
          callback(msg);
        }
        done(null,null);
      });
    }
    if(supplier.name != null){
      async.series([hasExisted,handleUpdate]);
    }else{
      async.series([handleUpdate]);
    }
  }

  this.remove = function(supplier,callback){
    if(!supplier || supplier.id == null || supplier.userId == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid supplier object'
        })
      }
      return;
    }

    sequelize.transaction(function(tx){
      return Supplier.destroy({where:{id:supplier.id,userId:supplier.userId}},{transaction:tx});
    }).then(function(result){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        datas:result
      }
      if(callback){
        callback(msg);
      }
    }).catch(function(ex){
      console.log(ex);
      var msg = {
        result:'failed',
        code:RES_INTERNAL_ERR,
        message:'unknow internal error'
      }
      if(callback){
        callback(msg);
      }
    });

  }

  this.get = function(args,callback){
    if(!args){
      var msg = {
        result:'failed',
        code:RES_INVALID_OBJECT,
        message:'invalid arguments'
      }
      if(callback){
        callback(msg);
      }
      return;
    }

    Supplier.findOne({where:args}).then(function(results){
      var msg = {
        result:'success',
        code:RES_SUCCESS,
        datas:{}
      }

      if(results){
        var supplier = {
          id:results.get('id'),
          name:results.get('name'),
          userId:results.get('userId'),
          address:results.get('address'),
          telephone:results.get('telephone'),
          mobile:results.get('mobile'),
          qq:results.get('qq'),
          email:results.get('email'),
          bank:results.get('bank'),
          webchat:results.get('webchat')
        };
        msg.datas.total = 1;
        msg.datas.rows = [];
        msg.datas.rows.push(supplier);
      }else{
        msg.datas.total = 1;
        msg.datas.rows = [];
      }
      if(callback){
        callback(msg);
      }
    });

  };

  this.findAll = function(args,callback){
    var hasArgs = true;
    if(!args){
      hasArgs = false;
    }
    var msg = {
      result:'success',
      code:RES_SUCCESS,
      //datas:{}
    }
    if(hasArgs){
      Supplier.findAll({where:args}).then(function(results){
        if(results){
          msg.total = results.length;
          msg.rows = [];
          results.forEach(function(result){
            var supplier = {
              id:result.get('id'),
              name:result.get('name'),
              userId:result.get('userId'),
              address:result.get('address'),
              telephone:result.get('telephone'),
              mobile:result.get('mobile'),
              qq:result.get('qq'),
              email:result.get('email'),
              bank:result.get('bank'),
              webchat:result.get('webchat')
            };
            msg.rows.push(supplier);
          });
        }else{
          msg.total = 0;
          msg.rows = [];
        }
        if(callback){
          callback(msg);
        }
      });
    }else{
      Supplier.findAll().then(function(results){
        if(results){
          msg.total = results.length;
          msg.rows = [];
          results.forEach(function(result){
            var supplier = {
              id:result.get('id'),
              name:result.get('name'),
              userId:result.get('userId'),
              address:result.get('address'),
              telephone:result.get('telephone'),
              mobile:result.get('mobile'),
              qq:result.get('qq'),
              email:result.get('email'),
              bank:result.get('bank'),
              webchat:result.get('webchat')
            };
            msg.rows.push(supplier);
          });
        }else{
          msg.total = 0;
          msg.rows = [];
        }
        if(callback){
          callback(msg);
        }
      });
    }
  }

  function getTotal(args,callback){
    Supplier.findAll({
      attributes:[[sequelize.fn('COUNT',sequelize.col('id')),'counts']],
      where:args
    }).then(function(results){
      if(results && results.length > 0){
        var counts = results[0].get('counts');
        if(callback){
          callback(counts);
        }
      }else{
        if(callback){
          callback(0);
        }
      }
    });
  }

  this.findWithPage = function(args,page,pageSize,callback){
    var selection = args;
    console.log('page = ' + page + ',limit = ' + pageSize);
    if(!args){
      selection = {};
    }
    var _offset = 0;
    var _limit = 0;
    if(pageSize <= 0){
      _limit = 20;
    }else{
      _limit = pageSize;
    }

    if(page > 0){
      _offset = (page - 1) * _limit;
    }

    var _total = 0;

    function getCounts(done){
      getTotal(selection,function(result){
        _total = result;
        done(null,'doQuery');
      });
    }

    function doQuery(done){
      Supplier.findAll({offset:_offset,limit:_limit,where:selection})
      .then(function(results){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          total:_total,
          rows:[]
        };
        if(results){
          results.forEach(function(result){
            var supplier = {
              id:result.get('id'),
              name:result.get('name'),
              userId:result.get('userId'),
              address:result.get('address'),
              telephone:result.get('telephone'),
              mobile:result.get('mobile'),
              qq:result.get('qq'),
              email:result.get('email'),
              bank:result.get('bank'),
              webchat:result.get('webchat')
            };
            msg.rows.push(supplier);
          });
        }
        if(callback){
          callback(msg);
        }else{
          console.log('callback is null');
        }
        done(null,null);
        console.log('query finished');
      });
    }

    async.series([getCounts,doQuery]);

  }

};

module.exports = SupplierDao;

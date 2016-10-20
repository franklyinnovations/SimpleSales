'use strict';
var UserDao = function(db){
  const RES_INVALID_OBJECT = -4;
  const RES_SUCCESS = 0;
  const RES_NAME_EXISTED = -1;
  const RES_CODE_EXISTED = -2;
  const RES_INTERNAL_ERR = -500;

  var User = db['User'];
  var async = require('async');
  var sequelize = db.sequelize;


  function isUserNameExisted(_name,callback){
    User.findOne({where:{name:_name}}).then(function(user){
      var isExisted = false;
      if(user){
        isExisted = true;
      }
      if(callback){
        callback(isExisted);
      }
    });
  }

  function isUserCodeExisted(_code,callback){
    User.findOne({where:{code:_code}}).then(function(user){
      var isExisted = false;
      if(user){
        isExisted = true;
      }
      if(callback){
        callback(isExisted);
      }
    });
  }

  function getTotal(callback){
    User.findAll({
      attributes:[[sequelize.fn('COUNT',sequelize.col('id')),'counts']]
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
/**
*  add new user
*/
  this.save = function(user,callback){
    // sequelize.transaction(function(tx){
    //
    // });
    if(!user || !user.name || !user.code || !user.password){
      if(callback){
        callback({
          'result':'failed',
          "code":RES_INVALID_OBJECT,
          "message":'invalid user object'
        });
      }
      return;
    }
    var userNameExisted = false;
    var userCodeExisted = false;

    function hasUserName(done){
      isUserNameExisted(user.name,function(result){
        userNameExisted = result;
        done(null,null);
      });
    }

    function hasUserCode(done){
      isUserCodeExisted(user.code,function(result){
        userCodeExisted = result;
        done(null,null);
      });
    }

    function addNewUser(done){
      if(userNameExisted){
        if(callback){
          callback({
            'result':'failed',
            'code':RES_NAME_EXISTED,
            'message':'user name [' + user.name +'] existed'
          });

        }
        done(null,null);
        return;
      }

      if(userCodeExisted){
        if(callback){
          callback({
            'result':'failed',
            'code':RES_CODE_EXISTED,
            'message':'user code [' + user.code +'] existed'
          });
        }
        done(null,null);
        return;
      }

      sequelize.transaction(function(tx){
        return  User.create(user,{transaction:tx});
      }).then(function(result){
        if(result){
          if(callback){
            var msg = {
              'result':'success',
              'code':RES_SUCCESS,
              datas:{
                'id':result.get('id')
              }
            }
            callback(msg);
          }
        }
        done(null,null);
      }).catch(function(err){
        if(callback){
          var msg = {
            'result':'failed',
            'code':RES_INTERNAL_ERR,
            'message':'server internal error'
          }
        }
        done(null,null);
      });
    }

    async.series([hasUserName,hasUserCode,addNewUser]);

  }

  this.update = function(user,callback){
    if(!user || (user.id ==null)){
      var result = {
        "result":"failed",
        "code":RES_INVALID_OBJECT,
        "message":"invalid user object"
      };
      if(callback){
        callback(result);
      }
      return;
    }
    var userNameExisted = false;
    var userCodeExisted = false;

    function hasUserName(done){
      isUserNameExisted(user.name,function(result){
        userNameExisted = result;
        done(null,null);
      });
    }

    function hasUserCode(done){
      isUserCodeExisted(user.code,function(result){
        userCodeExisted = result;
        done(null,null);
      });
    }

    function handleUpdate(done){
      if(userNameExisted){
        var result = {
          "result":"failed",
          "code":RES_NAME_EXISTED,
          "message":"user name [" + user.name + "]"
        }
        if(callback){
          callback(result);
        }
        done(null,null);
        return;
      }

      if(userCodeExisted){
        var result = {
          "result" : "failed",
          "code" : RES_CODE_EXISTED,
          "message":"user code [" + user.code + "]"
        }
        if(callback){
          callback(result);
        }
        done(null,null);
        return;
      }


      sequelize.transaction(function(tx){
        return User.update(user,{where:{id:user.id},transaction:tx});
      })
      .then(function(result){
        if(result){
          if(callback){
            var msg = {
              'result':'success',
              'code':RES_SUCCESS,
              'datas':{
                effectedRows:result[0]
              }
            }
            callback(msg);
          }
        }
        done(null,null);
      })
      .catch(function(err){
        if(callaback){
          var msg = {
            'result':'failed',
            'code':RES_INTERNAL_ERR,
            'message':'server internal error'
          };
         callback(msg);
        }
        done(null,null)
      });

    }

    if(user.name && user.code){
      async.series([hasUserName,hasUserCode,handleUpdate]);
    }else if(user.name && !user.code){
      async.series([hasUserName,handleUpdate]);
    }else if(!user.name && user.code){
      async.series([hasUserCode,handleUpdate]);
    }else{
      //update password only
      if(user.password){
        async.series([handleUpdate]);
      }
    }
  }//save

  this.remove = function(user,callback){
    if(!user){
      if(callback){
        var msg = {
          'result':'failed',
          'code':RES_INVALID_OBJECT,
          'message':'invalid user object'
        }
        callback(msg);
      }
      return;
    }
    var ids = [];
    var batchDestroy = false;
    if((user instanceof Array) && user.length > 0){
      batchDestroy = true;
      user.forEach(function(usr){
        ids.push(usr.id);
      })
    }else if((user instanceof Array) && user.length == 0){
      var msg = {
        result:'failed',
        code:RES_INVALID_OBJECT,
        message:'empty objects'
      }
      if(callback){
        callback(msg);
      }
      return;
    }else{
      batchDestroy = false;
      if(user.id == null){
        var msg = {
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'empty objects'
        }
        if(callback){
          callback(msg);
        }
        return;
      }
    }

    sequelize.transaction(function(tx){

      if(!batchDestroy){
        return User.destroy({where:{id:user.id},transaction:tx});
      }else{
        return User.destroy({where:{id:ids},transaction:tx});
      }

    }).then(function(result){
      if(result){
        if(callback){
          var msg = {
            'result':'success',
            'code':RES_SUCCESS,
            'datas':{
              'affectedRows':result
            }
          }
          callback(msg);
        }
      }else{
        var msg = {
          'result':'success',
          'code':RES_SUCCESS,
          'datas':{
            'affectedRows':0
          }
        }
        callback(msg);
      }
    }).catch(function(err){
      if(callback){
        var msg = {
          'result':'failed',
          'code':RES_INTERNAL_ERR,
          'msg':'server internal error'
        }
        callback(msg);
      }
    });
  }//update

  this.findByNameAndPassword = function(_name,pwd,callback){
    if(!_name || !pwd){
      if(callback){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          datas:{
            total:0,
            rows:[]
          }
        }
        callback(msg);
      }
      return;
    }

    User.findOne({where:{name:_name,password:pwd}}).then(function(user){
      if(user ){
        var usr = {
          id:user.get('id'),
          name:_name,
          code:user.get('code')
        }
        if(callback){
          var msg = {
            result:'success',
            code:RES_SUCCESS,
            datas:{
              total:1,
              rows:[usr]
            }
          }
          callback(msg);
        }
      }else{
        if(callback){
          var msg = {
            result:'success',
            code:RES_SUCCESS,
            datas:{
              total:0,
              rows:[]
            }
          }
          callback(msg);
        }
      }
    });
  }//findByNameAndPassword

  this.findByCodeAndPassword = function(_code,pwd,callback){
    if(!_code || !pwd){
      if(callback){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          datas:{
            total:0,
            rows:[]
          }
        }
        callback(msg);
      }
      return;
    }

    User.findOne({where:{code:_code,password:pwd}}).then(function(user){
      if(user ){
        var usr = {
          id:user.get('id'),
          name:user.get('name'),
          code:_code
        }
        if(callback){
          var msg = {
            result:'success',
            code:RES_SUCCESS,
            datas:{
              total:1,
              rows:[usr]
            }
          }
          callback(msg);
        }
      }else{
        if(callback){
          var msg = {
            result:'success',
            code:RES_SUCCESS,
            datas:{
              total:0,
              rows:[]
            }
          }
          callback(msg);
        }
      }
    });
  }//findByCodeAndPassword

  this.findWithPage = function(page,pageSize,callback){
    var _offset = 0;
    var _limit = 0;
    if(pageSize <= 0){
      _limit = 10;
    }else{
      _limit = pageSize;
    }

    if(page > 0){
      _offset = (page - 1) * _limit;
    }

    var total = 0;

    function queryTotal(done){
        getTotal(function(result){
          total = result;
          done(null,null);
        });
    }

    function doQuery(done){
      User.findAll({offset:_offset,limit:_limit}).then(function(results){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          datas:{
            total:total,
            rows:[]
          }
        }
        if(results){
          results.forEach(function(result){
            var user = {
              id:result.get('id'),
              name:result.get('name'),
              code:result.get('code')
            }
            msg.datas.rows.push(user);
          });
        }else{
          msg.datas.total = 0;
        }
        if(callback){
          callback(msg);
        }
        done(null,null);
      });
    }

    async.series([queryTotal,doQuery]);

  }

}



module.exports = UserDao;

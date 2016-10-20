'use strict';

var UserService = function(dao){
  const RES_INVALID_OBJECT = -4;
  const RES_SUCCESS = 0;
  const RES_NAME_EXISTED = -1;
  const RES_CODE_EXISTED = -2;
  const RES_INVALID_USERNAME_OR_PWD = -3;
  const RES_INTERNAL_ERR = -500;

  var _dao = dao;
  var async = require('async');

  this.handleRegister = function(request,callback){
    var user = {
      name:request.payload.name,
      code:request.payload.code,
      password:request.payload.password
    };

    this.register(user,callback);
  }

  this.handleUpdate = function(request,callback){
    var user = {
      name:request.payload.name,
      code:request.payload.code,
      password:request.payload.password,
      id:request.payload.id
    };

    this.update(user,callback);
  }

  this.handleLogin = function(request,callback){
    var nameOrCode = request.payload.name;
    var password = request.payload.password;
    if(!nameOrCode || !password){
      if(callback){
        var msg = {
          result:'failed',
          code:RES_INVALID_USERNAME_OR_PWD,
          message:'invalide user name or password'
        };
        callback(msg);
      }
      return;
    }
    this.login(nameOrCode,password,callback);
  }

  this.login = function(nameOrCode,password,callback){
    var hasUserWithName = false;
    var hasUserWithCode = false;
    var user = {};
    function queryUserByName(done){
      _dao.findByNameAndPassword(nameOrCode,password,function(result){
        if(result.datas.total > 0){
          hasUserWithName = true;
          user.name = result.datas.rows[0].name;
          user.id = result.datas.rows[0].id;
          user.code = result.datas.rows[0].code;
        }else{
          hasUserWithName = false;
        }
        done(null,null);
      });
    }

    function queryUserByCode(done){
      if(hasUserWithName){
        done(null,null);
        return;
      }
      _dao.findByCodeAndPassword(nameOrCode,password,function(result){
        if(result.datas.total > 0){
          hasUserWithCode = true;
          user.name = result.datas.rows[0].name;
          user.id = result.datas.rows[0].id;
          user.code = result.datas.rows[0].code;
        }else{
          hasUserWithCode = false;
        }
        done(null,null);
      });
    }

    function doLogin(done){
      if(hasUserWithCode || hasUserWithName){
        if(callback){
          var msg = {
            result:'success',
            code:RES_SUCCESS,
            datas:{
              total:1,
              rows:[user]
            }
          };
          callback(msg);
        }
      }else{
        if(callback){
          var msg = {
            result:'failed',
            code:RES_INVALID_USERNAME_OR_PWD,
            message:'invalid user name or password'
          };
          callback(msg);
        }
      }

      done(null,null);
    }

    async.series([queryUserByName,queryUserByCode,doLogin]);

  }

  this.update = function(user,callback){
    _dao.update(user,callback);
  }

  this.register = function(user,callback){
    _dao.save(user,callback);
  }
};

module.exports = UserService;

'use strict';

var ProductTypeDao = function(db){
  const RES_INVALID_OBJECT = -4;
  const RES_SUCCESS = 0;
  const RES_NAME_EXISTED = -1;
  const RES_CODE_EXISTED = -2;
  const RES_INTERNAL_ERR = -500;

  var ProductType = db['ProductType'];
  var ProductTypeTree = db['ProductTypeTree'];
  var async = require('async');
  var sequelize = db.sequelize;

  function isNodeNameExisted(_name,_user_id,callback){
    ProductType.findOne({where:{name:_name,userId:_user_id}}).then(function(productType){
      var isExisted = false;
      if(productType){
        isExisted = true;
      }
      if(callback){
        callback(isExisted);
      }
    });
  }

  this.save = function(productType,callback){

    if(!productType || !productType.name || productType.userId == null ||
      productType.parentId == null || productType.isLeaf == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid product object'
        });
      }
      return;
    }

    var isNameExisted = false;

    function hasName(done){
      isNodeNameExisted(productType.name,productType.userId,function(result){
        isNameExisted = result;
        done(null,"handleSave");
      });

    }
    var needUpdateParent = false;
    function handleSave(done){

      if(isNameExisted){
        if(callback){
          callback({
            result:'failed',
            code:RES_NAME_EXISTED,
            message:'product type name existed'
          });
        }
        done(null,null);
        return;
      }

      sequelize.transaction(function(tx){
        return ProductType.create(productType,{transaction:tx});
      }).then(function(result){
        var msg = {
          result:'success',
          code:RES_SUCCESS,
          datas:{
            id:-1
          }
        }
        if(result){
          productType.id = result.get('id');
          msg.datas.id = productType.id;
          needUpdateParent = true;
        }else{
          msg.result = 'failed';
          msg.code = RES_INTERNAL_ERR;
          msg.message = 'internal error';
        }
        if(callback){
          callback(msg);
        }
        done(null,null);
      }).catch(function(err){
        if(callback){
          var msg = {
            'result':'failed',
            'code':RES_INTERNAL_ERR,
            'msg':'server internal error'
          }
          callback(msg);
          done(null,null);
        }
      });

    }

    function updateParent(done){
      if(productType.parentId != -1 && needUpdateParent){
        sequelize.transaction(function(tx){
          return ProductType.update({isLeaf:false},{where:{id:productType.parentId,userId:productType.userId}},
                {transaction:tx});
        }).then(function(result){
          console.log('update parent node');
          done(null,null);
        });
      }else{
        done(null,null);
      }
    }

    async.series([hasName,handleSave,updateParent]);

  };

  this.findSubTypes = function(userType,callback){
    if(!userType || userType.userId == null || userType.parentId == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid parameters'
        })
      }
      return;
    }
    var types = {};
    types.productTypes = [];
    ProductType.findAll({where:{userId:userType.userId,parentId:userType.parentId}}).
    then(function(results){
    //  console.log(results);
      if(results){
        results.forEach(function(result){
          var type = {
            text:result.get('name'),
            leaf:result.get('isLeaf') == 1 ? true : false,
            userId:result.get('userId'),
            parentId:result.get('parentId'),
            id:result.get('id')
          }
          types.productTypes.push(type);
        });
      }
      if(callback){
        callback(types);
      }
    });
  };

  this.update = function(productType,callback){
    if(!productType){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid product type object'
        });
      }
      return;
    }

    var isNameExisted = false;

    function hasName(done){
      isNodeNameExisted(productType.name,productType.userId,function(result){
        isNameExisted = result;
        done(null,"handleUpdate");
      });
    }

    function handleUpdate(done){
      if(isNameExisted){
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
        return ProductType.update(productType,
          {where:{id:productType.id,userId:productType.userId}},
          {transaction:tx});
      }).then(function(result){
        if(result){
          if(callback){
            callback({
              result:'success',
              code:RES_SUCCESS,
              datas:[productType]
            })
          }
          done(null,null);
        }else{
          if(callback){
            callback({
              result:'success',
              code:RES_SUCCESS,
              datas:[]
            });
          }
          done(null,null);
        }
      });

    }

    async.series([hasName,handleUpdate]);
  }

  this.remove = function(args,callback){
    if(!args || args.userId == null || args.id == null ||
      args.leaf == null || args.root == null){
      if(callback){
        callback({
          result:'failed',
          code:RES_INVALID_OBJECT,
          message:'invalid args'
        })
      }
      return;
    }
    if(args.root){
      sequelize.transaction(function(tx){
        return ProductType.destroy({where:{userId:args.userId}});
      }).then(function(result){
        if(callback){
          callback({
            result:'success',
            code:RES_SUCCESS,
            datas:{
              children:result,
              parents:0
            }
          })
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
    }else{

        if(args.leaf){
          sequelize.transaction(function(tx){
            return ProductType.destroy({where:{userId:args.userId,id:args.id}},{transaction:tx});
          }).then(function(result){
            if(callback){
                callback({
                  result:'success',
                  code:RES_SUCCESS,
                  data:[result]
                })
            }
          });
        }else{
          sequelize.transaction(function(tx){
            return ProductType.destroy({where:{userId:args.userId,parentId:args.id}},{transaction:tx});
          }).then(function(result){
            if(result >= 0){
              sequelize.transaction(function(tx){
                return ProductType.destroy({where:{userId:args.userId,id:args.id}},{transaction:tx});
              }).then(function(res){
                if(res){
                  if(callback){
                    callback({
                      result:'success',
                      code:RES_SUCCESS,
                      datas:{
                        children:result,
                        parent:res
                      }
                    });
                  }
                }else{
                  if(callback){
                    callback({
                      result:'success',
                      code:RES_SUCCESS,
                      datas:{
                        children:result,
                        parent:0
                      }
                    })
                  }
                }

              });
            }else{
              if(callback){
                callback({
                  result:'success',
                  code:RES_SUCCESS,
                  datas:{
                    children:0,
                    parent:0
                  }
                })
              }
            }
          });
        }
    }

  }

};

module.exports = ProductTypeDao;

'use strict';

var SupplierService = function(_dao){
  var dao = _dao;

  this.handleAdd = function(request,callback){
      var _name = request.payload.name;
      var _userId = request.payload.userId;
      var _address = request.payload.address;
      var _telephone = request.payload.telephone;
      var _mobile = request.payload.mobile;
      var _qq = request.payload.qq;
      var _email = request.payload.email;
      var _bank = request.payload.bank;
      var _wechat = request.payload.webchat;

      var supplier = {
        name:_name,
        userId:_userId,
        address:_address,
        telephone:_telephone,
        mobile:_mobile,
        qq:_qq,
        email:_email,
        bank:_bank,
        webchat:_wechat
      };

      this.add(supplier,callback);
  }

  this.handleUpdate = function(request,callback){
    var _name = request.payload.name;
    var _userId = request.payload.userId;
    var _address = request.payload.address;
    var _telephone = request.payload.telephone;
    var _mobile = request.payload.mobile;
    var _qq = request.payload.qq;
    var _email = request.payload.email;
    var _bank = request.payload.bank;
    var _wechat = request.payload.webchat;
    var _id = request.payload.id;

    var supplier = {};
    if(_name){
      supplier.name = _name;
    }
    if(_userId){
      supplier.userId = _userId;
    }
    if(_address){
      supplier.address = _address;
    }
    if(_telephone){
      supplier.telephone = _telephone;
    }

    if(_mobile){
      supplier.mobile = _mobile;
    }

    if(_qq){
      supplier.qq = _qq;
    }

    if(_wechat){
      supplier.webchat = _wechat;
    }

    if(_email){
      supplier.email = _email;
    }

    if(_bank){
      supplier.bank = _bank;
    }

    if(_id){
      supplier.id = _id;
    }

    this.update(supplier,callback);
  };

  this.handleRemove = function(request,callback){
    var _id = request.payload.id;
    var _userId = request.payload.userId;
    var args = {
      id:_id,
      userId:_userId
    };
    this.remove(args,callback);
  };

  this.handleQueryAllWithUserId = function(request,callback){
    var args = request.url.query;
    console.log('handleQueryAllWithUserId:');
    console.log(args);
    dao.findAll(args,callback);
  };

  this.handleQueryWithPage = function(request,callback){
    console.log(request.url);
    console.log(request.url.path);
    var args = request.url.query;
    console.log(args)
    var selection = {
      userId:(args.userId == null)? 0 : Number(args.userId)
    };
    if(args.name){
      selection.name = args.name;
    }

    var page = (args.page == null)? 1 : Number(args.page);
    var limit =  (args.limit == null)? 20 : Number(args.limit);;
    dao.findWithPage(selection,page,limit,function(result){
      if(callback){
        callback(result);
      }
    });
  };

  this.add = function(supplier,callback){
    dao.save(supplier,function(result){
      if(callback){
        callback(result)
      }
    });
  };

  this.update = function(supplier,callback){
    dao.update(supplier,function(result){
      if(callback){
        callback(result);
      }
    });
  };

  this.remove = function(supplier,callback){
    dao.remove(supplier,function(result){
      if(callback){
        callback(result);
      }
    });
  }
};

module.exports = SupplierService;

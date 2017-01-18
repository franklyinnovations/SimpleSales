Ext.define('SC.component.LevelDB',{
//  statics:{
    _db:null,
    initdb:function(){
      var levelup = require('levelup');
      _db = levelup('.datas');
      console.log('db inited');
    },
    get:function(key){
      if(_db == null || !_db.isOpen()){
        console.log('db is closed')
        return;
      }
      var async = require('async');
      var value = null;
      function doget(done){
        _db.get(key,function(err,result){
          if(err){
            console.log(err);
          }
          value = null;
          done(null)
        });

      }

      async.series([doget])
      return value;
    },
    set:function(key,value){
      if(_db == null || !db.isOpen()){
        console.log('db is closed')
        return;
      }
      var async = require('async');
      function doput(done){
          _db.put(key,value,function(err){
            console.log(err)
            done(null)
          })
        }

      async.series([doput])
    },
    remove:function(key){
      if(_db == null || !db.isOpen()){
        console.log('db is closed')
        return;
      }
      function dodel(done){
        _db.del(key,function(err){
          if(err){
            console.log(err)
          }
          done(null)
        });
      }
    }
//  }
});

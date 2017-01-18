Ext.define('SC.component.SQLiteHandler',{
  _db:null,
  open:function(){
    var sqlite3 = require('sqlite3');
    this._db = new sqlite3.Database('sc.db');

  },
  init:function(){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }
    var me = this;
    this._db.serialize(function(){
      var create_pro_url_table_sql = 'create table if not exists t_pro_url(id integer not null primary key autoincrement,gid varchar(128),type_name varchar(128),url varchar(4096),create_date datetime,need_modify integer)';
      me._db.run(create_pro_url_table_sql);
    });
  },
  close:function(){
    if(this._db){
      this._db.close();
    }
  },
  put:function(key,gid,url,need_modify){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }
    var me = this;
    me._db.serialize(function(){
      var sql = 'select * from t_pro_url where gid=? and need_modify=?';
      var insertsql = 'insert into t_pro_url(type_name,gid,url,need_modify)values(?,?,?,?)';
      me._db.get(sql,[gid,need_modify],function(err,rows){
        if(rows == null || rows.length == 0 ){
            me._db.run(insertsql,[key,gid,url,need_modify]);
        }else{
          console.log('gid = ' +gid+'existed');
        }
      });
    })
  },
  remove:function(key,gid,need_modify){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }
    var me = this;
    if(!gid && key){
      var sql = 'delete from t_pro_url where type_name = ? and need_modify=?';
      me._db.serialize(function(){
        me._db.run(sql,[key,need_modify]);
      });
    }else if(gid && !key){
      me._db.serialize(function(){
        var sql = 'delete from t_pro_url where gid=? and need_modify=?';
        me._db.run(sql,[gid,need_modify]);
      })
    }else if(gid && key){
      me._db.serialize(function(){
        var sql = 'delete from t_pro_url where type_name = ? and gid = ? and need_modify=?';
        me._db.run(sql,[key,gid,need_modify]);
      });
    }
  },
  get:function(key,gid,need_modify,callback){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }
    if(!gid && key){
      var sql = 'select type_name,url gid,from t_pro_url where gid=? and need_modify=?';
      var me = this;
      me._db.serialize(function(){
        me._db.get(sql,[key,need_modify],callback)
      });
    }else if(gid && !key){
      var sql = 'select type_name,url gid,from t_pro_url where type_name=? and need_modify=?';
      var me = this;
      me._db.serialize(function(){
        me._db.get(sql,[gid,need_modify],callback)
      });
    }else if(gid && key){
      var sql = 'select type_name,url gid,from t_pro_url where type_name=? and gid=? and need_modify=?';
      var me = this;
      me._db.serialize(function(){
        me._db.get(sql,[key,gid,need_modify],callback)
      });
    }
  },
  all:function(key,need_modify,callback){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }

    var sql = 'select url from t_pro_url where type_name=? and need_modify=?';
    var me = this;
    console.log('all:key = '+ key);
    var datas = [];
    me._db.serialize(function(){
      me._db.all(sql,[key,need_modify],function(err,rows){

        if(err){
          console.log(err)
          throw err;
        }
        if(callback){
          callback(rows);
        }
      });
    });
  },
  removeAll:function(){
    var me = this;
    me._db.serialize(function(){
      me._db.run('delete from t_pro_url');
    })
  }
});

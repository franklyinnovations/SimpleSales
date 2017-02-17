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
      var create_pro_url_table_sql = 'create table if not exists t_pro_url(id integer not null primary key autoincrement,gid varchar(128),type_name varchar(128),url varchar(4096),create_date datetime,need_modify integer,price_start integer,price_end integer,is_removed integer)';
      me._db.run(create_pro_url_table_sql);
    });
  },
  close:function(){
    if(this._db){
      this._db.close();
    }
  },
  put:function(key,gid,url,need_modify,pstart,pend){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }
    var me = this;
    me._db.serialize(function(){
      var sql = 'select * from t_pro_url where gid=?';
      var insertsql = 'insert into t_pro_url(type_name,gid,url,need_modify,price_start,price_end,is_removed)values(?,?,?,?,?,?,?)';
      me._db.get(sql,[gid],function(err,rows){
        if(rows == null || rows.length == 0 ){
            me._db.run(insertsql,[key,gid,url,need_modify,pstart,pend,0]);
        }else{
          console.log('gid = ' +gid+'existed');
        }
      });
    })
  },
  markRemoved:function(gid){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }
    var me = this;
    if(!gid){
      return;
    }
    var sql = 'update t_pro_url set is_removed=1 where gid=?';
    me._db.serialize(function(){
      me._db.run(sql,[gid]);
    });
  },
  remove:function(key,gid,need_modify,pstart,pend){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }
    var me = this;
    if(!gid && key){
      if(pstart != null && pend != null){
        var sql = 'delete from t_pro_url where type_name = ? and need_modify=? and price_start >=? and price_end <=?';
        me._db.serialize(function(){
          me._db.run(sql,[key,need_modify,pstart,pend]);
        });
      }else{
        var sql = 'delete from t_pro_url where type_name = ? and need_modify=?';
        me._db.serialize(function(){
          me._db.run(sql,[key,need_modify]);
        });
      }
    }else if(gid && !key){
      if(pstart != null && pend != null){
        me._db.serialize(function(){
          var sql = 'delete from t_pro_url where gid=? and need_modify=? and price_start >=? and price_end <=?';
          me._db.run(sql,[gid,need_modify,pstart,pend]);
        })
      }else{
        me._db.serialize(function(){
          var sql = 'delete from t_pro_url where gid=? and need_modify=?';
          me._db.run(sql,[gid,need_modify]);
        })
      }
    }else if(gid && key){
      if(pstart != null && pend != null){
        me._db.serialize(function(){
          var sql = 'delete from t_pro_url where type_name = ? and gid = ? and need_modify=? and price_start >=? and price_end <=?';
          me._db.run(sql,[key,gid,need_modify,pstart,pend]);
        });
      }else{
        me._db.serialize(function(){
          var sql = 'delete from t_pro_url where type_name = ? and gid = ? and need_modify=?';
          me._db.run(sql,[key,gid,need_modify]);
        });
      }

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
  all:function(key,need_modify,pstart,pend,callback){
    if(!this._db){
      console.log('sqlite3 db is closed')
      return;
    }
    var sql = 'select url from t_pro_url where type_name=? and need_modify=? and is_removed=0';
    var args = [key,need_modify]
    if(pstart != null && pend != null){
      sql = 'select url from t_pro_url where type_name=? and need_modify=? and price_start >= ? and price_end <= ? and is_removed=0';
      args = [key,need_modify,pstart,pend]
    }

    var me = this;
    console.log('all:key = '+ key);
    var datas = [];
    me._db.serialize(function(){
      me._db.all(sql,args,function(err,rows){

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

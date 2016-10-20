Ext.define('SC.component.ProductTypeHandler',{
  add:function(args,callback){
    Ext.Ajax.request({
      url:'http://localhost:3000/producttypeadd',
      method:'POST',
      params:args,
      success:function(response,options){
        const RES_INVALID_OBJECT = -4;
        const RES_SUCCESS = 0;
        const RES_NAME_EXISTED = -1;
        const RES_CODE_EXISTED = -2;
        const RES_INTERNAL_ERR = -500;
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          //callback(result);
          if(result.code == RES_SUCCESS){
            callback({success:true});
          }else if(result.code == RES_INVALID_OBJECT){
            callback({success:false,msg:'无效参数'});
          }else if(result.code == RES_NAME_EXISTED){
            callback({success:false,msg:'分类名称已经存在'});
          }else{
            callback({success:false,msg:'未知错误'});
          }
        }
      },
      failure:function(){
        if(callback){
          callback({success:false,msg:'未知错误'});
        }
      }
    });
  },
  update:function(args,callback){
    const RES_INVALID_OBJECT = -4;
    const RES_SUCCESS = 0;
    const RES_NAME_EXISTED = -1;
    const RES_CODE_EXISTED = -2;
    const RES_INTERNAL_ERR = -500;
    Ext.Ajax.request({
      url:'http://localhost:3000/producttypesupdate',
      method:'POST',
      params:args,
      success:function(response,options){
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          if(result.code == RES_SUCCESS){
            callback({success:true});
          }else if(result.code == RES_INVALID_OBJECT){
            callback({success:false,msg:'无效参数'});
          }else if(result.code == RES_NAME_EXISTED){
            callback({success:false,msg:'分类名称已经存在'});
          }else{
            callback({success:false,msg:'未知错误'});
          }
        }
      },
      failure:function(){
        if(callback){
          callback({success:false,msg:'未知错误'});
        }
      }
    });
  },
  remove:function(args,callback){
    Ext.Ajax.request({
      url:'http://localhost:3000/producttyperemove',
      method:'POST',
      params:args,
      success:function(response,options){
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          callback({success:true});
        }
      },
      failure:function(){
        if(callback){
          callback({success:false,msg:'未知错误'});
        }
      }
    });
  }
});

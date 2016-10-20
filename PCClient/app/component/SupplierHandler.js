Ext.define('SC.component.SupplierHandler',{
  uses:['SC.utils.Messages'],
  add:function(args,callback){
    Ext.Ajax.request({
      url:'http://localhost:3000/supplieradd',
      method:'POST',
      params:args,
      success:function(response,options){
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          //callback(result);
          if(result.code == SC.utils.Messages.RES_SUCCESS){
            callback({success:true});
          }else if(result.code == SC.utils.Messages.RES_INVALID_OBJECT){
            callback({success:false,msg:'无效参数'});
          }else if(result.code == SC.utils.Messages.RES_NAME_EXISTED){
            callback({success:false,msg:'供应商已经存在'});
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
      url:'http://localhost:3000/supplierremove',
      method:'POST',
      params:args,
      success:function(response,options){
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          //callback(result);
          if(result.code == SC.utils.Messages.RES_SUCCESS){
            callback({success:true});
          }else if(result.code == SC.utils.Messages.RES_INVALID_OBJECT){
            callback({success:false,msg:'无效参数'});
          }else if(result.code == SC.utils.Messages.RES_NAME_EXISTED){
            callback({success:false,msg:'供应商已经存在'});
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
    Ext.Ajax.request({
      url:'http://localhost:3000/supplierupdate',
      method:'POST',
      params:args,
      success:function(response,options){
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          //callback(result);
          if(result.code == SC.utils.Messages.RES_SUCCESS){
            callback({success:true});
          }else if(result.code == SC.utils.Messages.RES_INVALID_OBJECT){
            callback({success:false,msg:'无效参数'});
          }else if(result.code == SC.utils.Messages.RES_NAME_EXISTED){
            callback({success:false,msg:'供应商已经存在'});
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
  }
});

Ext.define('SC.component.ProductInfoHandler',{
  add:function(args,callback){
    const RES_INVALID_OBJECT = -4;
    const RES_SUCCESS = 0;
    const RES_NAME_EXISTED = -1;
    const RES_CODE_EXISTED = -2;
    const RES_BARCODE_EXISTED = -3;
    const RES_ITEMCODE_EXISTED = -4;
    const RES_INTERNAL_ERR = -500;

    Ext.Ajax.request({
      url:'http://localhost:3000/productinfoadd',
      method:'POST',
      params:args,
      success:function(response,options){
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          //callback(result);
          if(result.code == RES_SUCCESS){
            callback({success:true});
          }else if(result.code == RES_INVALID_OBJECT){
            callback({success:false,message:'无效参数'});
          }else if(result.code == RES_NAME_EXISTED){
            callback({success:false,message:'商品档案名称已经存在'});
          }else if(result.code == RES_BARCODE_EXISTED){
            callback({success:false,message:'商品条码已经存在'});
          }else if(result.code == RES_ITEMCODE_EXISTED){
            callback({success:false,message:'商品编码已经存在'});
          }else{
            callback({success:false,message:'未知错误'});
          }
        }
      },
      failure:function(){
        if(callback){
          callback({success:false,message:'未知错误'});
        }
      }
    });
  },
  remove:function(args,callback){
    const RES_INVALID_OBJECT = -4;
    const RES_SUCCESS = 0;
    const RES_NAME_EXISTED = -1;
    const RES_CODE_EXISTED = -2;
    const RES_BARCODE_EXISTED = -3;
    const RES_ITEMCODE_EXISTED = -4;
    const RES_INTERNAL_ERR = -500;

    Ext.Ajax.request({
      url:'http://localhost:3000/productinforemove',
      method:'POST',
      params:args,
      success:function(response,options){
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          //callback(result);
          if(result.code == RES_SUCCESS){
            callback({success:true});
          }else if(result.code == RES_INVALID_OBJECT){
            callback({success:false,message:'无效参数'});
          }else if(result.code == RES_NAME_EXISTED){
            callback({success:false,message:'商品档案名称已经存在'});
          }else if(result.code == RES_BARCODE_EXISTED){
            callback({success:false,message:'商品条码已经存在'});
          }else if(result.code == RES_ITEMCODE_EXISTED){
            callback({success:false,message:'商品编码已经存在'});
          }else{
            callback({success:false,message:'未知错误'});
          }
        }
      },
      failure:function(){
        if(callback){
          callback({success:false,message:'未知错误'});
        }
      }
    });
  },
  update:function(args,callback){
    const RES_INVALID_OBJECT = -4;
    const RES_SUCCESS = 0;
    const RES_NAME_EXISTED = -1;
    const RES_CODE_EXISTED = -2;
    const RES_BARCODE_EXISTED = -3;
    const RES_ITEMCODE_EXISTED = -4;
    const RES_INTERNAL_ERR = -500;

    Ext.Ajax.request({
      url:'http://localhost:3000/productinfoupdate',
      method:'POST',
      params:args,
      success:function(response,options){
        if(callback){
          var result = Ext.util.JSON.decode(response.responseText);
          //callback(result);
          if(result.code == RES_SUCCESS){
            callback({success:true});
          }else if(result.code == RES_INVALID_OBJECT){
            callback({success:false,message:'无效参数'});
          }else if(result.code == RES_NAME_EXISTED){
            callback({success:false,message:'商品档案名称已经存在'});
          }else if(result.code == RES_BARCODE_EXISTED){
            callback({success:false,message:'商品条码已经存在'});
          }else if(result.code == RES_ITEMCODE_EXISTED){
            callback({success:false,message:'商品编码已经存在'});
          }else{
            callback({success:false,message:'未知错误'});
          }
        }
      },
      failure:function(){
        if(callback){
          callback({success:false,message:'未知错误'});
        }
      }
    });
  }
});

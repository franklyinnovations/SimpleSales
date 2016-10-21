Ext.define('SC.component.LoginHandler',{
  requires:[
    'SC.component.LocalStorage'
  ],
  login:function(args,callback){
    Ext.Ajax.request({
      url:'http://localhost:3000/login',
      params:args,
      method:'POST',
      success:function(response,options){
        var result = Ext.decode(response.responseText);
        //	console.log(result.datas.rows[0]);
        if(result.result == 'success'){
          SC.component.LocalStorage.set('usrname',result.datas.rows[0].name);
          SC.component.LocalStorage.set('usrcode',result.datas.rows[0].code);
          SC.component.LocalStorage.set('uid',result.datas.rows[0].id);
          var ipcRenderer = require('electron').ipcRenderer;
          ipcRenderer.send('asynchronous-message', 'user-login');
          // var events = require('events');
          // var emitter = new events.EventEmitter();
          // emitter.emit('refresh-user-title',result.datas.rows[0].name);
          SC.component.AppEventHandler.send('refresh-user-title',result.datas.rows[0].name);
          if(callback){
            callback({
              success:true
            })
          }
          //me.destroy();
        }else{
          if(callback){
            callback({
              success:false,
              message:'用户名或密码不正确'
            });
          }
        }
      },
      failure:function(){
        if(callback){
          callback({
            success:false,
            message:'请求超时或网络故障'
          })
        }
      }
    });
  }
});

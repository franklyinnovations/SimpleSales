Ext.define('SC.component.MainProcessMessageHandler',{
  requires:[
    'SC.view.ProductTypeWin'
  ],
  ipcRenderer:null,
  app:null,
  constructor:function(config){
    var me = this;
    me.app = config.app;
    me.ipcRenderer = require('electron').ipcRenderer;

    me.ipcRenderer.on('event-toolbar-toggled',function(event,msg){
      if(msg == 'show-product-info-win'){
        me.showProductInfoWin();
      }else if(msg == 'show-product-type-win'){
        me.showProductTypeWin();
      }
    });
    me.ipcRenderer.on('event-app-exit',function(event,msg){
      if(msg == 'app-exit'){
        localStorage.clear();
      }
    });
    console.log('MainProcessMessageHandler:init')
  },

  send:function(event,message){
    this.ipcRenderer.send(event,message);
  },

  showProductInfoWin:function(){
    var me = this;
    var module = me.app.getModule('win-product-info');
    console.log('module == null?' + (module == null));
    var win = module && module.createWindow();
    if(win){
      win.show();
    }
  },

  showProductTypeWin:function(){
    var me = this;
    var win = new SC.view.ProductTypeWin({
      desktop:me.app.getDesktop()
    });
    win.show();
  }


});

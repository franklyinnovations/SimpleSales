Ext.define('SC.view.ProductPreviewWin',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'Ext.tree.*',
    'Ext.data.*',
    'SC.component.LocalStorage',
  ],
  id:'product-preview-win',
  iconCls:'product-info-24x24',
  title:'商品预览',
  init:function(){

  },
  createWindow:function(){
    var me = this;
    var desktop = me.app.getDesktop();
    var win = desktop.getWindow('product-preview-win');
    if(!win){
      win = desktop.createWindow({
        id:'product-preview-win',
        title:'商品预览',
        width:800,
        height:600,
        layout:'fit',
        items:[{
          xtype: 'component',
          autoEl: {tag: 'iframe', src: ''}
        }
      ],
        listeners:{
          show:function(thiz,opts){
            //thiz.maximize();
          },
          // boxready:function(){
          //   this.items.items[0].el.dom.src='http://www.baidu.com';
          // }
        }
      });
    }

    return win;
  },
  refreshPage:function(url){
    this.items.items[0].el.dom.src=url;
  }
});

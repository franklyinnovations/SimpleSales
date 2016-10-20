Ext.define('SC.view.ProductInfoWin',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'Ext.tree.*',
    'Ext.data.*',
    'SC.store.ProductTypeStore',
    'SC.view.ProductTypeWin',
    'SC.view.SupplierWin'
  ],
  id:'win-product-info',

  init:function(){
    this.launcher = {
      title:'商品档案',
      iconCls:'product-info-16x16'
    }
  },
  createWindow:function(){
    var desktop = this.app.getDesktop();
    var win = desktop.getWindow('win-product-info');
    var me = this;
    if(!win){

      win = desktop.createWindow({
        id:'win-product-info',
        title:'商品档案',
        width:600,
        height:400,
        iconCls:'product-info-16x16',
        layout: 'fit',
        items:[],
        tbar:[
          {
            xtype:'button',
            text:'添加分类',
            handler:function(){
              var typeWin = new SC.view.ProductTypeWin({
                desktop:desktop
              });
              typeWin.show();
            }
          },{
            xtype:'button',
            text:'添加供应商',
            handler:function(){
              var win = new SC.view.SupplierWin({
                desktop:desktop
              });
              win.show();
            }
          }
        ]
      });
    }
    return win;
  },

})

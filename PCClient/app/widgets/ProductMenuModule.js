Ext.define('SC.widgets.ProductMenuModule',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'SC.view.ProductTypeWin',
    'SC.view.SupplierWin',
    'SC.component.AppWindowManager'
  ],
  init:function(){
    var me = this;
    this.launcher = {
      text:'商品',
      iconCls:'product-info-24x24',
      handler:function(){
        return false;
        },
        menu: {
            items: []
        }
      };
    this.launcher.menu.items.push({
        text:'商品档案列表',
        iconCls:'product-info-24x24',
        handler:function(){
          var desktop = me.app.getDesktop();
          var win = desktop.getWindow('win-product-info-list');
          if(!win){
            var module = me.app.getModule('win-product-info-list');
            win = module && module.createWindow();
          }
          win.show();
          return win;
        }
      });
      this.launcher.menu.items.push('-');
      this.launcher.menu.items.push({
        text:'添加商品档案',
        iconCls:'product-info-24x24',
        handler:function(){
          var desktop = this.app.getDesktop();
          var win = desktop.getWindow('win-add-product-info');
          if(!win){
            var module = this.app.getModule('win-add-product-info');
            win = module && module.createWindow();
          }
          win.show();
          return win;
        },
        scope:this
      });
      this.launcher.menu.items.push('-');
      this.launcher.menu.items.push({
        text:'商品分类',
        iconCls:'product-info-24x24',
        handler:function(){

          return SC.component.AppWindowManager.showWindow('win-product-type','SC.view.ProductTypeWin',
          {desktop:this.app.getDesktop()});
        },
        scope:this
      });
      this.launcher.menu.items.push('-');
      this.launcher.menu.items.push({
        text:'商品供应商',
        iconCls:'product-info-24x24',
        handler:function(){
          return SC.component.AppWindowManager.showWindow('module-supplier',
                'SC.view.SupplierWin',
                {desktop:this.app.getDesktop()});
        },
        scope:this
      });

  }

});

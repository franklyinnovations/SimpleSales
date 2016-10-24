Ext.define('SC.widgets.ProductShortcutModule',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'Ext.data.Store',
  //  'Ext.dataview.DataView',
    'SC.view.ProductTypeWin',
    'SC.view.SupplierWin',
    'SC.component.AppWindowManager',
    'SC.model.WindowShortcut',
    'SC.model.WindowShortcut'

  ],
  id:'productinfo-shortcut-module',
  text:'商品',
  init:function(){
    var me = this;

    var shortcutView = me.createDataView();

    me.dataViewWindow = Ext.create('Ext.window.Window',{
      id:'productinfo-shortcut-module',
      title:'商品',
      resizable : false,
      draggable : false,
      border : false,
      bodyStyle : 'padding:5px;',
      maximizable : false,//禁止最大化
      closeAction : 'close',
      //closable : false,//禁止关闭,
      modal:true,
      layout : {
		      type : 'fit',
		      align : 'stretch'
	    },
      width:600,
      height:250,
      align : 'center',
      items:[shortcutView],
      keyHandlers :{
        ESC:function(event){
          this.hide();
        }
      }
    });
    this.handler = function(){
        me.dataViewWindow.show();
    }
  },

  shortcutItemSelector: 'div.ux-desktop-shortcut',
  createDataView: function () {
      var me = this;
      var imageTpl = new Ext.XTemplate(
        '<tpl for=".">',
            '<div style="margin-bottom: 10px;float:left;background-color: transparent;background-repeat: no-repeat;padding: 8px;margin-left: 20px" class="thumb-wrap">',
              '<img src="{iconCls}" />',
              '<br/><span class="ux-desktop-shortcut-text-win">{name}</span>',
            '</div>',
        '</tpl>'
      );
      var dataView = Ext.create('Ext.view.View', {
        store: me.shortcuts,
        tpl: imageTpl,
        itemSelector: 'div.thumb-wrap',
        autoScroll:true,
        emptyText: 'No images available',
        //renderTo: Ext.getBody(),
        listeners:{
            itemclick:function( thiz , record , item , index , e , eOpts ) {
                //console.log(record);
                me.onShortcutItemClick(thiz,record);
            }
        },
      });
      return dataView;
  },

  shortcuts:Ext.create('Ext.data.Store', {
      model: 'SC.model.WindowShortcut',
      data: [
        {name:'商品档案列表',iconCls:'resources/icons/product-info-96x96.png',module:'win-product-info-list',isWindow:false,windowId:null},
        {name:'添加商品档案',iconCls:'resources/icons/product-info-96x96.png',module:'win-add-product-info',isWindow:false,windowId:null},
        {name:'添加供应商',iconCls:'resources/icons/product-info-96x96.png',module:'SC.view.SupplierWin',isWindow:true,windowId:'module-supplier'},
        {name:'添加商品类型',iconCls:'resources/icons/product-info-96x96.png',module:'SC.view.ProductTypeWin',isWindow:true,windowId:'win-product-type'},
      ]
  }),
  onShortcutItemClick: function (dataView, record) {

      console.log('item click');
      var me = this;
      var _desktop = me.app.getDesktop();
      if(record.data.isWindow){
        me.dataViewWindow.hide();
      //  me.dataViewWindow = null;
        SC.component.AppWindowManager.showWindow(record.data.windowId,
          record.data.module,{desktop:_desktop});
      }else{
        var module = me.app.getModule(record.data.module);
        var win = module && module.createWindow();
        if(win){
          me.dataViewWindow.hide();
          //me.dataViewWindow = null;
          _desktop.restoreWindow(win);
        }
      }

  },
});

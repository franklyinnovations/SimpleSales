Ext.define('SC.view.AddProductInfoWin',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'Ext.tree.*',
    'Ext.data.*',
    'SC.store.ProductTypeStore',
    'SC.view.ProductTypeWin',
    'SC.view.SupplierWin',
    'SC.component.AppWindowManager',
    'SC.component.LocalStorage',
    'SC.component.ProductInfoHandler'
  ],
  id:'win-add-product-info',
  selectedItem:null,
  bodyStyle : 'padding:30 0 0 20;',
  uid:-1,
  init:function(){
    // this.launcher = {
    //   title:'商品档案',
    //   iconCls:'product-info-16x16'
    // }
    var me = this;
    me.uid = SC.component.LocalStorage.get('uid');
    me.handler = new SC.component.ProductInfoHandler();
  },
  createWindow:function(){
    var desktop = this.app.getDesktop();
    var win = desktop.getWindow('win-product-info');
    var me = this;
    if(!win){
      var leftPanel = me.createTree();
      var centerPanel = me.createProductForm();
      var southpanel = me.createStorePanel();
      win = desktop.createWindow({
        id:'win-add-product-info',
        title:'添加商品档案',
        width:800,
        height:480,
        iconCls:'product-info-16x16',
        layout: 'border',
        items:[leftPanel,centerPanel,southpanel],
        tbar:[
          {
            xtype:'button',
            text:'添加分类',
            handler:function(){
              // if(SC.component.AppWindowManager.hasWindow('win-add-product-type')){
              //   console.log('Window Product Type has existed');
              //   return;
              // }else{
              //   var desktop = me.app.getDesktop();
              //   SC.component.AppWindowManager.addWindow('win-add-product-type');
              //   var win = new SC.view.ProductTypeWin({desktop:desktop});
              //   win.show();
              // }
              SC.component.AppWindowManager.showWindow('win-product-type',
              'SC.view.ProductTypeWin',{desktop:desktop});
            }
          },{
            xtype:'button',
            text:'添加供应商',
            handler:function(){
              // if(SC.component.AppWindowManager.hasWindow('module-supplier')){
              //   console.log('Widow SupplierWin has existed');
              //   return;
              // }else{
              //   var desktop = me.app.getDesktop();
              //   var win = new SC.view.SupplierWin({desktop:desktop});
              //   win.show();
              //   //return win;
              // }
              SC.component.AppWindowManager.showWindow('module-supplier',
              'SC.view.SupplierWin',{desktop:desktop});
            }
          }
        ],
        listeners:{
          show:function(thiz,opts){
            thiz.maximize();
          }
        }
      });
    }
    return win;
  },
  createTreeStore:function(){
    var me = this;
    var _url = 'http://localhost:3000/producttypes?userId=' + SC.component.LocalStorage.get('uid');
    var store = new Ext.data.TreeStore({
      model:'SC.model.ProductType',
      proxy:{
        type:'ajax',
        url:_url,
        reader:{
          rootProperty:'productTypes',
          type:'json'
        }
      },
      root:{
        text:'商品类型',
        expanded: true
      },
      fields:[
        {name:'text'},
        {name:'leaf'},
        {name:'id'},
        {name:'children'}
      ]
    });
    return store;
  },
  createTree:function(){
    var me = this;
    me.productTypeStore = me.createTreeStore();
    var tree = new Ext.tree.Panel({
      xtype:'treepanel',
      hideHeaders: true,
      rootVisible: true,
      viewConfig: {
          plugins: [{
              ptype: 'treeviewdragdrop'
          }]
      },
      autoHeight : true,
      width: 200,
      //title: 'Directory Listing',
      store:me.productTypeStore,
      collapsible: false,
      listeners:{
            select: this.onSelect,
            scope:this,
      }
    });
    var panel = Ext.create('Ext.Panel',{
      region: 'west',
      title: '商品分类',
      width: 200,
      autoHeight : true,
      split: true,
      collapsible: true,
      floatable: false,
      items:[
        tree
      ]
    });
    return panel;
  },
  onSelect:function(tree,record){
    console.log(record.data);
    this.selectedItem = record.data;
    Ext.getCmp('productinfo-producttype-tf').setValue(record.data.text);
  },
  createProductForm:function(){
    var me = this;
    var panel = Ext.create('Ext.form.Panel',{
      region:'center',
      title:'商品信息',
      layout: 'vbox',
      bodyStyle : 'padding:30 0 0 20;',
      //sytle:'margin-top:10px',
      labelAlign:'right',
      labelWidth : 65,

      items:[{//第一行
          layout:'column',
          items:[{
            layout:'form',
            columnWidth:0.3,
            items:[{
              xtype:'textfield',
              id:'productinfo-name-tf',
              width:100,
              fieldLabel:'  名称',
              allowBlank:false
            }]
          },{
            layout:'form',
            columnWidth:0.3,
            items:[{
              xtype:'textfield',
              id:'productinfo-itemcode-tf',
              width:100,
              fieldLabel:'  编码',
              allowBlank:false
            }]
          },{
            layout:'form',
            columnWidth:0.3,
            items:[{
              xtype:'textfield',
              id:'productinfo-barcode-tf',
              width:100,
              fieldLabel:'条码',
              allowBlank:false
            }]
          }]
      },{//第二行
        layout:'column',
        items:[
          {
            layout:'form',
            columnWidth:0.3,
            items:[{
              xtype:'numberfield',
              id:'productinfo-supplyprice-tf',
              width:100,
              minValue:0.0,
              allowDecimals: true,
              allowNegative: false,
              fieldLabel:'进货价',
              allowBlank:false
            }]
          },{
            layout:'form',
            columnWidth:0.3,
            items:[{
              xtype:'numberfield',
              id:'productinfo-sellprice-tf',
              width:100,
              minValue:0.0,
              allowDecimals: true,
              allowNegative: false,
              fieldLabel:'零售价',
              allowBlank:false
            }]
          },{
            layout:'form',
            columnWidth:0.3,
            items:[{
              xtype:'textfield',
              id:'productinfo-producttype-tf',
              width:100,
              fieldLabel:'分类',
              allowBlank:false,
              readOnly:true
            }]
          }
        ]
      },{//第三行
        layout:'column',
        items:[{
          layout:'form',
          items:[
          {
            xtype:'textfield',
            columnWidth:0.3,
            id:'productinfo-unit-name-tf',
            width:100,
            fieldLabel:'单位',
            allowBlank:false
          }]
        },{layout:'form',
        items:[{
              xtype:'combobox',
              columnWidth:0.3,
              allowBlank:false,
              id:'productinfo-supplier-vb',
              width:100,
              fieldLabel:'供应商',
              store:{
                fields:['id','name'],
                proxy:{
                  url:'http://localhost:3000/supplierquerywithuid?userId=' + SC.component.LocalStorage.get('uid'),
                  type:'ajax',
                  reader:{
                    type:'json',
                    rootProperty:'rows',
                    totalProperty:'total'
                  }
                },

              },
              editable: false,
              displayField:'name',
              valueField:'id',
              emptyText: "--请选择供应商--"
          }]
        }]
      }],//
      buttons:[
        {
          text:'新增',
          handler:function(){
            if(me.selectedItem == null){
              Ext.MessageBox.alert('添加商品档案','请选择商品分类');
              return;
            }
            if(me.selectedItem.root){
              Ext.MessageBox.alert('添加商品档案','请选择具体的商品分类');
              return;
            }
            var _name = Ext.getCmp('productinfo-name-tf').getValue();
            var _barcode = Ext.getCmp('productinfo-barcode-tf').getValue();
            var _itemcode = Ext.getCmp('productinfo-itemcode-tf').getValue();
            var _supplyPrice = Ext.getCmp('productinfo-supplyprice-tf').getValue();
            var _sellPrice = Ext.getCmp('productinfo-sellprice-tf').getValue();
            var _supplierId = Ext.getCmp('productinfo-supplier-vb').getValue();
            var _typeId = me.selectedItem.id;
            var _unitName = Ext.getCmp('productinfo-unit-name-tf').getValue();

            if(_name == null || _name.trim().length == 0){
              Ext.MessageBox.alert('添加商品档案','请输入名称');
              return;
            }

            if(_barcode == null || _barcode.trim().length == 0){
              Ext.MessageBox.alert('添加商品档案','请输入条码');
              return;
            }

            if(_itemcode == null || _itemcode.trim().length == 0){
              Ext.MessageBox.alert('添加商品档案','请输入商品编码');
              return;
            }

            if(_supplyPrice == null){
              Ext.MessageBox.alert('添加商品档案','请输入进货价');
              return;
            }
            if(_supplyPrice <= 0.0){
              Ext.MessageBox.alert('添加商品档案','无效进货价');
              return;
            }

            if(_sellPrice == null){
              Ext.MessageBox.alert('添加商品档案','请输入零售价');
              return;
            }
            if(_sellPrice <= 0.0){
              Ext.MessageBox.alert('添加商品档案','无效零售价');
              return;
            }
            if(_supplierId == null){
              Ext.MessageBox.alert('添加商品档案','请选择供应商');
              return;
            }
            if(_unitName == null || _unitName.trim().length == 0){
              Ext.MessageBox.alert('添加商品档案','请输入单位');
              return;
            }

            var args = {
              name:_name,
              barcode:_barcode,
              itemcode:_itemcode,
              supplierId:_supplierId,
              typeId:_typeId,
              userId:SC.component.LocalStorage.get('uid'),
              supplyPrice:_supplyPrice,
              sellPrice:_sellPrice,
              unitName:_unitName
            };

            me.handler.add(args,function(result){
              if(result.success){
                Ext.getCmp('productinfo-barcode-tf').setValue('');
                Ext.getCmp('productinfo-itemcode-tf').setValue('');
                Ext.getCmp('productinfo-supplyprice-tf').setValue(0.0);
                Ext.getCmp('productinfo-sellprice-tf').setValue(0.0);
              }else{
                Ext.MessageBox.alert('添加商品档案',result.message);
              }
            });

          }
        }
      ]
    });
    return panel;
  },
  createStorePanel:function(){
    var panel = Ext.create('Ext.panel.Panel',{
      region:'south',
      title:'仓库',
      collapsible:true
    });
    return panel;
  }

});

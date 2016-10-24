Ext.define('SC.view.ProductInfoListWin',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'Ext.tree.*',
    'Ext.data.*',
    'SC.store.ProductTypeStore',
    'SC.view.ProductTypeWin',
    'SC.view.SupplierWin',
    'SC.component.AppWindowManager',
    'SC.component.LocalStorage',
  ],
  id:'win-product-info-list',
  iconCls:'product-info-24x24',
  title:'商品列表',
  init:function(){
    var me = this;
    me.uid = SC.component.LocalStorage.get('uid');
  },
  createWindow:function(){
    var me = this;
    var desktop = me.app.getDesktop();
    var win = desktop.getWindow('win-product-info-list');
    if(!win){
      me.productTypeTree = me.createTree();
      me.productInfoPanel = me.createProductListGrid();
      me.updateInfoPanel = me.createUpdatePanel();
      win = desktop.createWindow({
        id:'win-product-info-list',
        title:'商品列表',
        layout:'border',
        width:800,
        height:600,
        items:[me.productTypeTree,me.productInfoPanel,me.updateInfoPanel],
        listeners:{
          show:function(thiz,opts){
            thiz.maximize();
          }
        }
      });
    }
    return win;
  },
  createProductListGrid:function(){
    var me = this;
    me.productInfoGridStore = Ext.create('Ext.data.Store',{
      autoDestroy: true,
      pageSize:20,
      model:'SC.model.ProductInfoDisplay',
      proxy:{
        url:'http://localhost:3000/productinfopagingquery?userId='+me.uid,
        type:'ajax',
        reader:{
          type: 'json',
          rootProperty:'rows',
          totalProperty:'total'
        }
      }
    });
    function handleQuery(){
      var name = Ext.getCmp('productinfo-query-tf').getValue();
      if(!name){
        me.productInfoGridStore.load();
      }else{
        var _url = 'http://localhost:3000/productinfopagingquery?userId='+me.uid + '&name='+name
        me.productInfoGridStore.getProxy().url = _url;
        me.productInfoGridStore.load(function(records, operation, success){
          me.productInfoGridStore.getProxy().url = 'http://localhost:3000/productinfopagingquery?userId='+ me.uid;
        });
      }
    }
    var productInfoPanel = Ext.create('Ext.grid.Panel',{
      region: 'center',
      title:'商品列表',
      store: me.productInfoGridStore,
      disableSelection: false,
      loadMask: true,
      viewConfig: {
            //trackOver: false,
            stripeRows: true
      },
      columns:[
         new Ext.grid.RowNumberer(),
         {
           text: "ID",
           dataIndex: 'id',
           width: 50,
           hidden: true,
           sortable: true
         },
         {
             text: "名称",
             dataIndex: 'name',
             width: 150,
             hidden: false,
             sortable: true
         },
         {
             text: "编码",
             dataIndex: 'itemcode',
             width: 150,
             hidden: false,
             sortable: true
         },
         {
             text: "条码",
             dataIndex: 'barcode',
             width: 150,
             hidden: false,
             sortable: true
         },
         {
             text: "进货价",
             dataIndex: 'supplyPrice',
             width: 150,
             hidden: false,
             sortable: true
         },
         {
             text: "零售价",
             dataIndex: 'sellPrice',
             width: 150,
             hidden: false,
             sortable: true
         },
         {
             text: "类型",
             dataIndex: 'typeName',
             width: 150,
             hidden: false,
             sortable: true
         },
         {
           text:'单位',
           dataIndex:'unitName',
           width:150,
           hidden:false,
           sortable:false
         },
         {
             text: "供应商",
             dataIndex: 'supplierName',
             width: 150,
             hidden: false,
             sortable: true
         },
      ],
      tbar:[
        {
          xtype:'button',
          text:'删除',
          handler:function(){

          }
        },'商品查询',
        {
          xtype:'textfield',
          name:'productinfo-query-tf',
          id:'productinfo-query-tf'
        },{
          xtype:'button',
          text:'查询',
          handler:function(){
            handleQuery();
          }
        }
      ],
      bbar: Ext.create('Ext.PagingToolbar', {
          store: me.productInfoGridStore,
          displayInfo: true,
          displayMsg: '当前商品 {0} - {1} of {2}',
          emptyMsg: "没有可显示的数据",
          inputItemWidth: 35,
        }),
      listeners:{
        rowclick:function(grid,row){
          var sm = grid.getSelectionModel();
          var record=sm.getSelection()[0];
          me.selectProductInfo = {
            id:record.get('id'),
            name:record.get('name'),
            barcode:record.get('barcode'),
            itemcode:record.get('itemcode'),
            supplyPrice:record.get('supplyPrice'),
            sellPrice:record.get('sellPrice'),
            typeId:record.get('typeId'),
            typeName:record.get('typeName'),
            supplierId:record.get('supplierId'),
            supplierName:record.get('supplierName'),
            unitName:record.get('unitName')
          };
          console.log(me.selectProductInfo);
        }
      }
    });
    return productInfoPanel;
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
  createUpdatePanel:function(){
    var panel = Ext.create('Ext.panel.Panel',{
      region:'east',
      title:'更新商品档案',
      collapsible:true,
      items:[]
    });
  },
  onSelect:function(tree,record){
    console.log(record.data);
    this.selectedItem = record.data;
    console.log(record.data);
    if(record.data.root){
      this.handleQueryByType(-1);
    }else{
      this.handleQueryByType(record.data.id);
    }
  },
  handleQueryByType:function (typeId){
    //var name = Ext.getCmp('productinfo-query-tf').getValue();
    var me = this;
    if(typeId == -1){
      var _url = 'http://localhost:3000/productinfopagingquery?userId='+ me.uid;
      me.productInfoGridStore.getProxy().url = _url
      me.productInfoGridStore.load();
    }else{
      var _url = 'http://localhost:3000/productinfopagingquery?userId='+me.uid + '&typeId='+typeId
      me.productInfoGridStore.getProxy().url = _url;
      me.productInfoGridStore.load(function(records, operation, success){
        me.productInfoGridStore.getProxy().url = 'http://localhost:3000/productinfopagingquery?userId='+ me.uid;
      });
    }
  }
});

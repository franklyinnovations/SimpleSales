Ext.define('SC.view.SupplierWin',{
  extend: 'Ext.window.Window',
  uses:[
    'Ext.form.*',
    'Ext.panel.Panel',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.PagingToolbar',
    'SC.component.SupplierHandler',
    'SC.component.LocalStorage',
    'SC.model.Supplier'
  ],
  id:'supplier-win',
  title:'供应商信息',
  iconCls:'product-info-16x16',
  width: 800,
  height: 480,
  border: false,
  layout: {
    type: 'border',
    padding: 5
  },
  uid:-1,
  gridStore:null,
  initComponent:function(){
    var me = this;
    me.uid = SC.component.LocalStorage.get('uid');
    var gridpanel = me.createGridPanel();
    var infopanel = me.createAddInfoPanel();
    me.items = [infopanel,gridpanel];
    me.callParent();
    console.log('id')
  },

  createGridPanel:function(){
    var me = this;
    //me.store = me.createGridStore();
    me.gridStore = Ext.create('Ext.data.Store',{
      pageSize:20,
      model:'SC.model.Supplier',
      proxy:{
        url:'http://localhost:3000/supplierpagequery?userId='+me.uid,
        type:'ajax',
        reader:{
          type: 'json',
          root:'rows',
          totalProperty:'total'
        }
      }
    });
    var gridpanel = new Ext.grid.Panel({
      region: 'center',
      title:'供应商列表',
      store: me.gridStore,
      disableSelection: true,
      loadMask: true,
      viewConfig: {
            trackOver: false,
            stripeRows: false
      },
      columns:[
         new Ext.grid.RowNumberer(),
        {
          text: "ID",
          dataIndex: 'id',
          width: 50,
          hidden: true,
          sortable: false
        },
        {
            text: "名称",
            dataIndex: 'name',
            width: 150,
            hidden: false,
            sortable: false
        },
        {
            text: "电话",
            dataIndex: 'telephone',
            width: 100,
            hidden: false,
            sortable: false
        },
        {
            text: "手机",
            dataIndex: 'mobile',
            width: 100,
            hidden: false,
            sortable: false
        },
        {
            text: "地址",
            dataIndex: 'address',
            width: 200,
            hidden: false,
            sortable: false
        },
      ],
      bbar: Ext.create('Ext.PagingToolbar', {
          store: me.gridStore,
          displayInfo: true,
          displayMsg: '当前供应商 {0} - {1} of {2}',
          emptyMsg: "没有可显示的数据",
          inputItemWidth: 35,
            // items:[
            //     '-', {
            //     text: 'Show Preview',
            //     pressed: pluginExpanded,
            //     enableToggle: true,
            //     toggleHandler: function(btn, pressed) {
            //         grid.getPlugin('preview').toggleExpanded(pressed);
            //     }
            // }]
        })
    });
    return gridpanel;
  },

  createGridStore:function(){
    var me = this;
    var store = new Ext.data.Store({
        pageSize: 50,
        model: 'SC.model.Supplier',
        //remoteSort: true,
        proxy: {
            type: 'json',
            url: 'http://localhost:3000/supplierpagequery?userId='+me.uid,
            reader: {
                root: 'rows',
                totalProperty: 'total'
            }
        },
        // sorters: [{
        //     property: 'lastpost',
        //     direction: 'DESC'
        // }]
    });
    return store;
  },

  createAddInfoPanel:function(){
    var panel = new Ext.panel.Panel({
        region: 'west',
        title: '添加供应商',
        width: 300,
        split: true,
        collapsible: true,
        floatable: false,
        items:[

        ]
   });

    return panel;
  }
});

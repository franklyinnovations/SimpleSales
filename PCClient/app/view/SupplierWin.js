Ext.define('SC.view.SupplierWin',{
  extend: 'Ext.window.Window',
  uses:[
    'Ext.form.*',
    'Ext.panel.Panel',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.menu.Menu',
    'Ext.PagingToolbar',
    'SC.component.SupplierHandler',
    'SC.component.LocalStorage',
    'SC.model.Supplier',
    'SC.component.AppWindowManager'
  ],
  id:'module-supplier',
  title:'供应商信息',
  iconCls:'product-info-16x16',
  width: 800,
  height: 480,
  border: false,
  maximizable: true,
  // minimizable: true,
  layout: {
    type: 'border',
    padding: 5
  },
  uid:-1,
  gridStore:null,
  selectedRecord:null,
  handler:null,
  rowContextMenu:null,
  initComponent:function(){
    var me = this;
    me.handler = new SC.component.SupplierHandler();
    // me.rowContextMenu = me.createRowContextMenu();
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
      autoDestroy: true,
      pageSize:20,
      model:'SC.model.Supplier',
      proxy:{
        url:'http://localhost:3000/supplierpagequery?userId='+me.uid,
        type:'ajax',
        reader:{
          type: 'json',
          rootProperty:'rows',
          totalProperty:'total'
        }
      }
    });
    var gridpanel = new Ext.grid.Panel({
      region: 'center',
      title:'供应商列表',
      store: me.gridStore,
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
            text: "电话",
            dataIndex: 'telephone',
            width: 100,
            hidden: false,
            sortable: true
        },
        {
            text: "手机",
            dataIndex: 'mobile',
            width: 100,
            hidden: false,
            sortable: true
        },
        {
            text: "地址",
            dataIndex: 'address',
            width: 200,
            hidden: false,
            sortable: false
        },
      ],
      tbar:[
        {
          xtype:'button',
          text:'删除',
          handler:function(){
            if(me.selectedRecord){
              me.handler.remove(me.selectedRecord,function(result){
                if(result.success){
                  me.selectedRecord = null,
                  me.gridStore.load();
                  me.supplierForm.refreshData();
                }else{
                  Ext.MessageBox.alert('删除供应商','删除失败');
                  me.gridStore.load();
                }
              })
            }else{
              Ext.MessageBox.alert('删除供应商','请选择一个供应商');
            }
          }
        },'供应商查询',
        {
          xtype:'textfield',
          width:100,
          allowBlank:false,
          id:'supplier-query-name'
        },
        {
          xtype:'button',
          text:'查询',
          handler:function(){

          }
        }
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
        }),
        listeners:{
          rowclick:function(grid,row){
            var sm = grid.getSelectionModel();
            var record=sm.getSelection()[0];
            var supplier = {
              id:record.get('id'),
              name:record.get('name'),
              address:record.get('address'),
              email:record.get('email'),
              mobile:record.get('mobile'),
              telephone:record.get('telephone'),
              userId:me.uid
            };
            me.selectedRecord = supplier;
            me.supplierForm.refreshData();
            console.log(supplier);
          },
          rowdblclick:function(grid,row){
            var sm = grid.getSelectionModel();
            var record=sm.getSelection()[0];
            var supplier = {
              id:record.get('id'),
              name:record.get('name'),
              address:record.get('address'),
              email:record.get('email'),
              mobile:record.get('mobile'),
              telephone:record.get('telephone'),
              userId:me.uid
            };
            me.selectedRecord = supplier;
            console.log('double click:' + supplier);
          },
          // rowcontextmenu:function(grid , record , tr , rowIndex , e , eOpts){
          //    e.preventDefault();//取消默认的浏览器右键事件
          //   var sm = grid.getSelectionModel();
          //   sm.select(rowIndex);//将点中的那行选中
          //   var supplier = {
          //     id:record.get('id'),
          //     name:record.get('name'),
          //     address:record.get('address'),
          //     email:record.get('email'),
          //     mobile:record.get('mobile'),
          //     telephone:record.get('telephone'),
          //     userId:me.uid
          //   };
          //   me.selectedRecord = supplier;
          //   me.rowContextMenu.showAt(e.getXY());//在选中的那行显示按钮
          // }
          // selectionchange:function(view, records){
          //   console.log(records);
          // }
        }
    });
    return gridpanel;
  },
  // createRowContextMenu:function(){
  //   var me = this;
  //   var ctxMenu = new Ext.menu.Menu({
  //     id:'gridrow-ctx-menu',
  //     items:[
  //       {
  //         text:'删除',
  //         handler:function(){
  //           if(me.selectedRecord){
  //             me.handler.remove(me.selectedRecord,function(result){
  //               if(result.success){
  //                 me.selectedRecord = null,
  //                 me.gridStore.load();
  //               }else{
  //                 Ext.MessageBox.alert('删除供应商','删除供应失败');
  //               }
  //             });
  //           }
  //         }
  //       }
  //     ]
  //   });
  //
  //   return ctxMenu;
  // },
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
        sorters: [{
            property: 'id',
            direction: 'DESC'
        }]
    });
    return store;
  },

  createAddInfoPanel:function(){
    var me = this;
    me.supplierForm = new Ext.form.Panel({
      width:280,
      height:300,
      bodyPadding: 10,
      defaultType: 'textfield',
      buttonAlign : 'center',
      defaults : {
				width : 200,
        labelAlign:'right',
        labelWidth : 50
			},
      items:[
        {
            fieldLabel: '名称',
            name: 'supplier-name',
            id:'supplier-name',
            allowBlank:false
        },
        {
            fieldLabel: '地址',
            name: 'supplier-address',
            id:'supplier-address'
        },
        {
            fieldLabel: '电话',
            name: 'supplier-telephone',
            id:'supplier-telephone'
        },
        {
            fieldLabel: '手机',
            name: 'supplier-mobile',
            id:'supplier-mobile'
        },
        {
            fieldLabel: 'Email',
            name: 'supplier-email',
            id:'supplier-email'
        },
      ],
      buttons:[
        {
          text:'添加',
          handler:function(){
            var _name = Ext.getCmp('supplier-name').getValue();
            var _address = Ext.getCmp('supplier-address').getValue();
            var _telephone = Ext.getCmp('supplier-telephone').getValue();
            var _mobile = Ext.getCmp('supplier-mobile').getValue();
            var _email = Ext.getCmp('supplier-email').getValue();
            var args = {};
            if(!_name){
              Ext.MessageBox.alert('添加供应商','请输入供应商名称');
              return;
            }
            args.name = _name;
            if(_address){
              args.address = _address;
            }
            if(_telephone){
              args.telephone = _telephone;
            }
            if(_mobile){
              args.mobile = _mobile;
            }
            if(_email){
              args.email = _email;
            }
            args.userId = me.uid;
            me.handler.add(args,function(result){
              if(result.success){
                me.gridStore.load();
                me.clearAll();
              }else{
                Ext.MessageBox.alert('添加供应商',result.message);
              }
            });
          }
        },
        {
          text:'更新',
          handler:function(){
            if(!me.selectedRecord){
              return;
            }
            var _name = Ext.getCmp('supplier-name').getValue();
            var _address = Ext.getCmp('supplier-address').getValue();
            var _telephone = Ext.getCmp('supplier-telephone').getValue();
            var _mobile = Ext.getCmp('supplier-mobile').getValue();
            var _email = Ext.getCmp('supplier-email').getValue();
            var args = {};
            if(_name && _name != me.selectedRecord.name){
              args.name = _name;
            }
            if(_address){
              args.address = _address;
            }
            if(_telephone){
              args.telephone = _telephone;
            }
            if(_mobile){
              args.mobile = _mobile;
            }
            if(_email){
              args.email = _email;
            }
            args.id = me.selectedRecord.id;
            args.userId = me.selectedRecord.userId;
            me.handler.update(args,function(result){
              if(result.success){
                me.gridStore.load();
                console.log('SupplierWin::update success');
              }else{
                Ext.MessageBox.alert('更新供应信息',result.message);
              }
            });
          }
        },
        {
          text:'清空',
          handler:function(){
            me.clearAll();
          }
        }
      ],
      refreshData:function(){
        if(me.selectedRecord){
          Ext.getCmp('supplier-name').setValue(me.selectedRecord.name);
          Ext.getCmp('supplier-address').setValue(me.selectedRecord.address);
          Ext.getCmp('supplier-telephone').setValue(me.selectedRecord.telephone);
          Ext.getCmp('supplier-mobile').setValue(me.selectedRecord.mobile);
          Ext.getCmp('supplier-email').setValue(me.selectedRecord.email);
        }else{
          me.clearAll();
        }
      }
    });
    var panel = new Ext.panel.Panel({
        region: 'west',
        title: '添加/更新供应商',
        width: 300,
        split: true,
        collapsible: true,
        floatable: false,
        items:[
          me.supplierForm
        ]
   });

    return panel;
  },
  listeners:{
    destroy:function(winobj , eOpts ){
      SC.component.AppWindowManager.removeWindow('module-supplier');
      // delete this.rowContextMenu;
      console.log('SupplierWin:destroy');
    }
  },
  clearAll:function(){
    Ext.getCmp('supplier-name').setValue('');
    Ext.getCmp('supplier-address').setValue('');
    Ext.getCmp('supplier-telephone').setValue('');
    Ext.getCmp('supplier-mobile').setValue('');
    Ext.getCmp('supplier-email').setValue('');
  }
});

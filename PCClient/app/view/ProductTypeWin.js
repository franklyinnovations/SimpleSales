Ext.define('SC.view.ProductTypeWin',{
  extend: 'Ext.window.Window',
  uses:[
    'Ext.tree.Panel',
    'Ext.tree.View',
    'Ext.form.field.Checkbox',
    'Ext.layout.container.Anchor',
    'Ext.layout.container.Border',
    'SC.store.ProductTypeStore',
    'SC.component.ProductTypeHandler',
    'SC.component.LocalStorage',
    'SC.component.AppWindowManager'
  ],
  id:'win-product-type',
  title:'添加商品分类',
  iconCls:'product-info-16x16',
  width: 640,
  height: 480,
  border: false,
  layout:'fit',
  selectedItem:null,
  handler:null,
  store:null,
  uid:-1,
  initComponent:function(){
    var me = this;
    me.uid = SC.component.LocalStorage.get('uid');
    //console.log('uid = ' + me.uid);
    this.handler = new SC.component.ProductTypeHandler();
    me.store = me.createTreeStore();
    me.tree = me.createTree();
    me.items = [me.tree];
    me.tbar = [
      {
        xtype:'textfield',
        width:200,
        //height:30,
        id:'product-type-name-tf',
        blankText:'输入分类名'
      },
      {
        xtype:'button',
      //  width:100,
        //height:30,
        text:'添加',
        handler:function(){
          var _name = Ext.getCmp('product-type-name-tf').getValue();
          if(_name == null || _name.trim().length == 0){
            Ext.MessageBox.alert('添加商品分类','请输入分类名称');
            return;
          }
          if(!me.selectedItem){
            Ext.MessageBox.alert('添加商品分类','请选择一个分类');
            return;
          }
          var _pid = -1;
          if(me.selectedItem.root){
            _pid = -1;
          }else{
            _pid = me.selectedItem.id;
          }
        //  var _pid = me.selectedItem.parentId == 'root' ? -1 : me.selectedItem.id;
          var args = {
            name:_name,
            userId:me.uid,
            parentId:_pid,
            leaf:true
          }

          me.handler.add(args,function(result){
            if(result.success){
              me.tree.store.load();
            }else{
              Ext.MessageBox.alert('添加商品分类',result.msg);
            }
            Ext.getCmp('product-type-name-tf').setValue('');
          });
        }
      },
      {
        xtype:'button',
      //  width:100,
        //height:30,
        text:'更新',
        handler:function(){
          var _name = Ext.getCmp('product-type-name-tf').getValue();
          if(_name == null || _name.trim().length == 0){
            Ext.MessageBox.alert('添加商品分类','请输入分类名称');
            return;
          }
          if(!me.selectedItem){
            Ext.MessageBox.alert('添加商品分类','请选择一个分类');
            return;
          }
          if(me.selectedItem.root){
            return;
          }
          var args = {
            name:_name,
            userId:me.uid,
            id:me.selectedItem.id
          }
          me.handler.update(args,function(result){
            if(result.success){
              me.tree.store.load();
            }else{
              Ext.MessageBox.alert('更新商品分类',result.msg);
            }
            Ext.getCmp('product-type-name-tf').setValue('');
          });
        }
      },
      {
        xtype:'button',
        //width:100,
        //height:30,
        text:'删除',
        handler:function(){
          if(!me.selectedItem){
            Ext.MessageBox.alert('删除商品分类','请选择一个分类');
            return;
          }
          var _leaf = true;
          var _root = me.selectedItem.root;
          var args = {
            userId:me.uid,
            id:-1,
            leaf:_leaf,
            root:_root
          }
          if(me.selectedItem.root){
            args.id = -1;
            args.leaf = false;
          }else{
            args.id = me.selectedItem.id;
            args.leaf = me.selectedItem.leaf;
          }

          me.handler.remove(args,function(result){
            me.tree.store.load();
          });
        }
      },
      {
        xtype:'button',
      //  width:100,
      //  height:30,
        text:'刷新',
        handler:function(){
          me.tree.store.load();
        }
      },
    ];
    me.callParent();
  },
  createTreeStore:function(){
    var me = this;
    var _url = 'http://localhost:3000/producttypes?userId=' + me.uid;
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
    var tree = new Ext.tree.Panel({
      xtype:'treepanel',
      hideHeaders: true,
      rootVisible: true,
      viewConfig: {
          plugins: [{
              ptype: 'treeviewdragdrop'
          }]
      },
      height: 350,
      width: 400,
      //title: 'Directory Listing',
      store:me.store,
      collapsible: false,
      listeners:{
            select: this.onSelect,
            scope:this
      }
    });

    return tree;
  },
  onSelect:function(tree,record){
    console.log(record.data);
    this.selectedItem = record.data;
  },
  listeners:{
    destroy:function(winobj , eOpts ){
      SC.component.AppWindowManager.removeWindow(this.id);
    }
  }

})

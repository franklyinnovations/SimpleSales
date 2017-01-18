Ext.define('SC.view.GrabNewWin',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'Ext.tree.*',
    'Ext.data.*',
    'SC.component.LocalStorage',
    'SC.model.ProductItem',
    'SC.component.SQLiteHandler',
    'Ext.DataView',
    'Ext.data.SimpleStore',
    'Ext.form.ComboBox'
  ],
  id:'grab-new-win',
  iconCls:'product-info-24x24',
  title:'每日新款',
  selectedItem:null,
  init:function(){

  },
  createWindow:function(){
    var me = this;
    var desktop = me.app.getDesktop();
    var crawer = me.app.crawler;
    var win = desktop.getWindow('grab-new-win');
    me.tree = me.createDataView();
    //me.selectedItem = null;
    var querystring = require('querystring');

    var queryTypeStore = Ext.create("Ext.data.Store", {
    fields: ["Name", "Value"],
      data: [
         { "Name": "所有分类", "Value": "0" },
          { "Name": "女装", "Value": "16" },
          { "Name": "男装", "Value": "30" },
          { "Name":"家居服/内衣","Value":"1625"},
          { "Name":"女装-连衣裙","Value":"50010850"},
          { "Name":"女装-T恤","Value":"50000671"},
          { "Name":"女装-衬衫","Value":"162104"},
          { "Name":"女装-裤子","Value":"1622"},
          { "Name":"女装-裤子-休闲裤","Value":"162201"},
          { "Name":"女装-裤子-西装裤/正装裤","Value":"50022566"},
          { "Name":"女装-裤子-打底裤","Value":"50007068"},
          { "Name":"女装-裤子-棉裤/羽绒裤","Value":"50026651"},
          { "Name":"女装-牛仔裤","Value":"162205"},
          { "Name":"女装-半身裙","Value":"1623"},
          { "Name":"女装-背心/吊带","Value":"162105"},
          { "Name":"女装-马夹","Value":"50013196"},
          { "Name":"女装-蕾丝/雪纺","Value":"162116"},
          { "Name":"女装-毛针织衫","Value":"50000697"},
          { "Name":"女装-短外套","Value":"50011277"},
          { "Name":"女装-西装","Value":"50008897"},
          { "Name":"女装-卫衣/绒衫","Value":"50008898"},
          { "Name":"女装-毛呢外套","Value":"50013194"},
          { "Name":"女装-毛衣","Value":"162103"},
          { "Name":"女装-风衣","Value":"50008901"},
          { "Name":"女装-棉衣/棉服","Value":"50008900"},
          { "Name":"女装-羽绒服","Value":"50008899"},
          { "Name":"女装-皮衣","Value":"50008904"},
          { "Name":"女装-皮草","Value":"50008905"},
          { "Name":"女装-中老年","Value":"50000852"},
          { "Name":"女装-大码","Value":"1629"},
          { "Name":"女装-校服/制服","Value":"1624"},
          { "Name":"女装-校服/制服-学生校服","Value":"50008903"},
          { "Name":"女装-校服/制服-职业女裙套装","Value":"162401"},
          { "Name":"女装-校服/制服-职业女裤套装","Value":"162402"},
          { "Name":"女装-校服/制服-休闲运动套装","Value":"162404"},
          { "Name":"女装-校服/制服-其它套装","Value":"162403"},
          { "Name":"女装-校服/制服-医护制服","Value":"50011411"},
          { "Name":"女装-校服/制服-酒店工作制服","Value":"50011412"},
          { "Name":"女装-校服/制服-其它制服","Value":"50011413"},
          { "Name":"女装-校服/制服-时尚套装","Value":"123216004"},
          { "Name":"女装-婚纱/旗袍","Value":"50011404"},
          { "Name":"女装-婚纱/旗袍-婚纱","Value":"162701"},
          { "Name":"女装-婚纱/旗袍-旗袍","Value":"50005065"},
          { "Name":"女装-婚纱/旗袍-礼服/晚装","Value":"162702"},
          { "Name":"女装-唐装/民族","Value":"50008906"},
          { "Name":"女装-唐装/民族-民族服装/舞台装","Value":"162703"},
          { "Name":"女装-唐装/民族-唐装/中式服装","Value":"1636"},
          { "Name":"女装-背心吊带","Value":"121412004"},
          { "Name":"女装-抹胸","Value":"121434004"},
          { "Name": "男装-背心/马甲", "Value": "50011153" },
          { "Name": "男装-T恤", "Value": "50000436" },
          { "Name": "男装-Polo", "Value": "50010402" },
          { "Name": "男装-衬衫", "Value": "50011123" },
          { "Name": "男装-针织/毛衣", "Value": "50000557" },
          { "Name": "男装-牛仔裤", "Value": "50010167" },
          { "Name": "男装-休闲裤", "Value": "3035" },
          { "Name": "男装-棉裤", "Value": "50025885" },
          { "Name": "男装-羽绒裤", "Value": "50025884" },
          { "Name": "男装-皮裤", "Value": "50011127" },
          { "Name": "男装-夹克", "Value": "50010158" },
          { "Name": "男装-卫衣", "Value": "50010159" },
          { "Name": "男装-风衣", "Value": "50011159" },
          { "Name": "男装-毛呢大衣", "Value": "50025883" },
          { "Name": "男装-棉衣", "Value": "50011165" },
          { "Name": "男装-皮衣", "Value": "50011161" },
          { "Name": "男装-西服", "Value": "50010160" },
          { "Name": "男装-西裤", "Value": "50011129" },
          { "Name": "男装-西服套装", "Value": "50011130" },
          { "Name": "男装-民族服装", "Value": "50001748" },
          { "Name": "男装-套装", "Value": "124730001" },
          { "Name":"家居服/内衣-文胸","Value":"50008881"},
          { "Name":"家居服/内衣-文胸套装","Value":"50008883"},
          { "Name":"家居服/内衣-内裤","Value":"50008882"},
          { "Name":"家居服/内衣-塑身上衣","Value":"50008884"},
          { "Name": "家居服/内衣-美体裤", "Value": "50012774" },
          { "Name": "家居服/内衣-腰封/腰夹", "Value": "50012775" },
          { "Name":"家居服/内衣-分体套装","Value":"50012776"},
          { "Name":"家居服/内衣-连体衣","Value":"50012781"},
          { "Name":"家居服/内衣-睡裤","Value":"50012766"},
          { "Name":"家居服/内衣-睡裙","Value":"50012771"},
          { "Name":"家居服/内衣-短袜/打底袜","Value":"50006846"},
          { "Name": "家居服/内衣-抹胸", "Value": "50008888" },
          { "Name": "家居服/内衣-吊带/背心", "Value": "50010394" },
          { "Name":"家居服/内衣-肚兜","Value":"50008890"},
          { "Name":"家居服/内衣-乳贴","Value":"50008889"},
          { "Name":"家居服/内衣-肩带","Value":"50012784"},
          {"Name":"家居服/内衣-吊袜带","Value":"50012785"},
          {"Name":"家居服/内衣-插片/胸垫","Value":"50012786"},
          {"Name":"家居服/内衣-搭扣","Value":"50012787"},
      ]
    });
    var cbox = Ext.create('Ext.form.ComboBox', {
        fieldLabel: '分类',
        labelWidth:30,
        store: queryTypeStore,
        id:'pro-type-new-new-cb',
        queryMode: 'local',
        labelAlign:'right',
        displayField: 'Name',
        valueField: 'Value',
        emptyText: "--请选择--",
        editable: false,
        width:200,
        listeners:{
          select: function( combo , record , eOpts ){
            me.cateid = record.data.Value;
            console.log("cateid = " + me.cateid)

            var pricestart = Ext.getCmp('price-start-new').getValue();
            var priceend = Ext.getCmp('price-end-new').getValue();

            if(pricestart!=null && pricestart != '' && pricestart.trim() !=''&& priceend!=null && priceend != '' && priceend.trim() !=''){
              if(Number(pricestart) > Number(priceend)){
                  Ext.getCmp('pro-type-new').setValue(record.data.Name + priceend + '-' + pricestart);
              }else{
                  Ext.getCmp('pro-type-new').setValue(record.data.Name + pricestart + '-' + priceend);
              }

            }else{
              Ext.getCmp('pro-type-new').setValue(record.data.Name)
            }

          }
        }
    });

    //console.log(combo)
    if(!win){
      win = desktop.createWindow({
        id:'grab-new-win',
        title:'每日新款',
        width:800,
        height:600,
        layout:'border',
        items:[
            {
              xtype:'panel',
              layout:'fit',
              region:'west',
              autoHeight:true,
              collapsible:true,
              scrollable:{
                  direction:'vertical'
              },
              width:250,
              title:'查询结果',
              //split:true,
              items:[
                me.tree
              ],

            },
            {
              xtype:'panel',
              layout:'fit',
              region:'center',
              id:'preview-panel',
              items:[
                {
                 xtype: 'component',
                 autoHeight:true,
                 autoEl: {tag: 'iframe', src: ''}
                }
              ]
            }
        ],
        tbar:[
            cbox,
            {
              xtype:'label',
              text:'关键词',
            },
            {
              xtype:'textfield',
              width:200,
              id:'query-name-new'
            },

            {
              xtype:'label',
              text:'价格',

            },
            {
              xtype:'textfield',
              width:75,
              id:'price-start-new'
            },
            {
              xtype:'label',
              text:'-'
            },
            {
              xtype:'textfield',
              width:75,
              id:'price-end-new'
            },
            {
              xtype:'button',
              text:'查询',
              handler:function(){
                  //me.selectedItem = null;
                SC.component.LocalStorage.set('pro-url-new','')
                SC.component.LocalStorage.set('pro-gid-new','')
                var keyword = Ext.getCmp('query-name-new').getValue();
                var pricestart = Ext.getCmp('price-start-new').getValue();
                var priceend = Ext.getCmp('price-end-new').getValue();
                if(keyword == null || keyword == '' || keyword.trim().length == 0){
                  keyword='';
                }
                if(pricestart == null || pricestart == '' || pricestart.trim().length == 0){
                  pricestart = 0;
                }
                if(priceend == null || priceend == '' || priceend.trim().length == 0){
                  priceend = 9999;
                }

                if(Number(pricestart) > Number(priceend)){
                  var temp = pricestart;
                  pricestart = priceend;
                  priceend = tmp;
                }
                var protypeName = Ext.getCmp('pro-type-new-new-cb').getSelection().data.Name;
                if(pricestart!=null && pricestart != '' && pricestart.trim() !=''&& priceend!=null && priceend != '' && priceend.trim() !=''){
                  if(Number(pricestart) > Number(priceend) && Number(pricestart) != 0 && Number(priceend) != 9999){
                      Ext.getCmp('pro-type-new').setValue(protypeName + priceend + '-' + pricestart);
                  }else{
                      Ext.getCmp('pro-type-new').setValue(protypeName + pricestart + '-' + priceend);
                  }

                }else{
                  Ext.getCmp('pro-type-new').setValue(protypeName)
                }

              var keywordparam = keyword.replace(/ /g,'+');
               keywordparam =  querystring.stringify({so:keywordparam});
               me.curpage = 1;
               if(!me.cateid){
                 me.cateid = "0";
               }
                me.queryurl = "http://gz.17zwd.com/mrxk.htm?cateid=" + me.cateid + "&zdid=42&mid=-1&fid=-1&pstart="+pricestart+"&pend="+priceend+"&"+keywordparam+"&page=";
                console.log('query url = ');
                console.log(me.queryurl);
                crawer.httpRequest('http://gz.17zwd.com',me.queryurl+ me.curpage,function(results){
                  //console.log(results)
                  if(results.length == 0){
                    Ext.MessageBox.alert('查询','结果为空');
                    return;
                  }
                //  me.tree.store.loadData(results)
                me.tree.getStore().loadData(results);
                })
              }
            },
            {
              xtype:'button',
              text:'上一页',
              handler:function(){
                //me.selectedItem = null;
                SC.component.LocalStorage.set('pro-url-new','')
                SC.component.LocalStorage.set('pro-gid-new','')
                if(me.curpage <= 0){
                  me.curpage = 1;
                }
                me.curpage -= 1;
                var url = me.queryurl + me.curpage;
                console.log('query url = ');
                console.log(me.queryurl);
                crawer.httpRequest('http://gz.17zwd.com',me.queryurl+ me.curpage,function(results){
                  //console.log(results)
                  if(results.length == 0){
                    Ext.MessageBox.alert('查询','结果为空');
                    return;
                  }
                //  me.tree.store.loadData(results)
                me.tree.getStore().loadData(results);
                })
              }
            },
            {
              xtype:'button',
              text:'下一页',
              handler:function(){
                  //me.selectedItem = null;
                SC.component.LocalStorage.set('pro-url-new','')
                SC.component.LocalStorage.set('pro-gid-new','')
                if(me.curpage <= 0){
                  me.curpage = 1;
                }
                me.curpage += 1;
                var url = me.queryurl + me.curpage;
                console.log('query url = ');
                console.log(me.queryurl);
                crawer.httpRequest('http://gz.17zwd.com',me.queryurl+ me.curpage,function(results){
                  //console.log(results)
                  if(results.length == 0){
                    Ext.MessageBox.alert('查询','结果为空');
                    return;
                  }
                //  me.tree.store.loadData(results)
                me.tree.getStore().loadData(results);
                })
              }
            },
            {
              xtype:'textfield',
              width:400,
              id:'pro-name'
            },{
              xtype:'label',
              text:'分类',
            },
            {
              xtype:'textfield',
              id:'pro-type-new',
              width:75
            },
            {
              xtype:'button',
              text:'添加',
              handler:function(){
                var key = Ext.getCmp('pro-type-new').getValue();
                if(!key){
                  Ext.MessageBox.alert('添加商品','请选择分类');
                  return;
                }
                var gid =SC.component.LocalStorage.get('pro-gid-new');
                var url = SC.component.LocalStorage.get('pro-url-new');
                var need_modify = Ext.getCmp('need-modify-new').getValue() ? 1:0;
                if(gid == null || gid == '' || url == null || url == ''){
                  Ext.MessageBox.alert('添加商品','请选择商品');
                  return;
                }

                console.log(key + '/' + gid + '/' + url + '/' +need_modify);
                me.app.sqlite.put(key,gid,url,need_modify);
                SC.component.LocalStorage.set('pro-gid-new','');
                SC.component.LocalStorage.get('pro-url-new','');
              }
            },{
              xtype:'button',
              text:'删除',
              handler:function(){
                var key = Ext.getCmp('pro-type-new').getValue();
                var gid = null;
                var gid =SC.component.LocalStorage.get('pro-gid-new');
                var need_modify = Ext.getCmp('need-modify-new').getValue() ? 1:0;
                if(gid == null || gid == ''){
                  gid = null;
                }
                //var url = SC.component.LocalStorage.get('pro-url-new');
                me.app.sqlite.remove(key,gid,need_modify);
              }
            },{
              xtype:'button',
              text:'查看添加',
              handler:function(){
                var key = Ext.getCmp('pro-type-new').getValue();
                if(!key){
                  Ext.MessageBox.alert('添加商品','请选择分类');
                  return;
                }
                var need_modify = Ext.getCmp('need-modify-new').getValue() ? 1:0;
                var reswin = Ext.create('Ext.window.Window', {
                    title: '添加结果',
                    height: 600,
                    width: 800,
                    layout: 'fit',
                    items: [ // Let's put an empty grid in just to illustrate fit layout
                        {xtype: 'panel',
                        layout:'fit',
                        items:[
                          {
                            xtype:'textareafield',
                            id:'result-textarea',
                            width:'100%',
                            height:'100%',
                            text:'',
                          }
                        ],
                    }]
                });
                var textarea = Ext.getCmp('result-textarea');
                var resultsstr = '';
                me.app.sqlite.all(key,need_modify,function(results){

                  if(results.length > 0){
                    results.forEach(function(result){
                    //  console.log(result);
                      resultsstr += result.url + '\n';
                    });
                    textarea.setValue(resultsstr);
                    reswin.show()
                  }
                })
              }
            },{
              xtype:'checkbox',
              id:'need-modify-new',
              fieldLabel:'需要修改',
              labelAlign:'right',
              checked:false
            },{
              xtype:'button',
              text:'删除分类',
              handler:function(){
                var key = Ext.getCmp('pro-type-new').getValue();
                if(key == null || key == '' || key.trim() == '' || key.trim().length == 0){
                  return;
                }
                var need_modify = Ext.getCmp('need-modify-new').getValue() ? 1:0;
                me.app.sqlite.remove(key,null,need_modify);
              }
            },
            {
              xtype:'button',
              text:'清空所有',
              handler:function(){
                me.app.sqlite.removeAll();
              }
            }
          ],
        listeners:{
          show:function(thiz,opts){
            thiz.maximize();
          },
          // boxready:function(){
          //   this.items.items[0].el.dom.src='http://www.baidu.com';
          // }
        }
      });
      //win.tbar.addField(combo)
    }

    return win;
  },
  createDataView:function(){
    var me = this;
    var store = new Ext.data.JsonStore({
        data:[],
        fields: ['text', 'url', 'gid','img']
    });
    var tpl = new Ext.XTemplate(
     '<tpl for=".">',
        '<div class="thumb-wrap" id="{text}">',
         '<div class="thumb"><img src="{img}" title="{text}"></div>',
         '<span>{text}</span>',
         '</tpl>',
         '<div class="x-clear"></div>'
    );

    var dataview = new Ext.DataView({
            store: store,
            width:250,
            height:'100%',
            autoScroll: true,
            tpl: tpl,
            //autoHeight:true,
          //  multiSelect: true,
          //  overClass:'x-view-over',
            itemSelector:'div.thumb-wrap',
            emptyText: '无数据',
            listeners:{
              select:me.onDataviewSelected
            }
          });
    return dataview;
  },
  createTree : function() {
        var me = this;

        // function child (img) {
        //     return { img: img, text: me.getTextOfWallpaper(img), iconCls: '', leaf: true };
        // }

        var tree = new Ext.tree.Panel({
            title: '商品列表',
            rootVisible: false,
            lines: false,
            scrollable: true,
            width: 400,
            region: 'west',
            split: true,
            minWidth: 100,
            listeners: {
              //  afterrender: { fn: this.setInitialSelection, delay: 100 },
                select: this.onSelect,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: 'SC.model.ProductItem',
                root: {
                    text:'products',
                    expanded: true,
                    children:[

                    ]
                }
            })
        });

        return tree;
    },
    onSelect: function (tree, record) {
    var me = this;

    if (record.data.url) {
        //me.selected = 'resources/images/wallpapers/' + record.data.img;
        Ext.getCmp('preview-panel').items.items[0].el.dom.src=record.data.url;
    }
  },
  onDataviewSelected:function( thiz , record , eOpts ){
    var me = this;
    me.selectedItem = record.data;
    if(record.data.url){
      Ext.getCmp('preview-panel').items.items[0].el.dom.src=record.data.url;
      Ext.getCmp('pro-name').setValue(record.data.url)
      console.log('gid = ' + record.data.gid);
      me.selectedItem = record.data;
      SC.component.LocalStorage.set('pro-url-new',record.data.url);
      SC.component.LocalStorage.set('pro-gid-new',record.data.gid);
    }
    console.log(me.selectedItem)
  }
});

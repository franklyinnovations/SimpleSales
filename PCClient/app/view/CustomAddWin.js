Ext.define('SC.view.CustomAddWin',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'Ext.tree.*',
    'Ext.data.*',
    'SC.component.LocalStorage',
    'SC.model.ProductItem',
    'SC.component.SQLiteHandler',
    'Ext.DataView',
    'Ext.data.SimpleStore',
    'Ext.form.ComboBox',
    'SC.view.NotificationWin'
  ],
  id:'grab-custom-win',
  iconCls:'product-info-24x24',
  title:'手动添加',
  selectedItem:null,
  init:function(){

  },
  createWindow:function(){
    var me = this;
    var desktop = me.app.getDesktop();
    var crawer = me.app.crawler;
    var win = desktop.getWindow('grab-custom-win');
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
            me.customcateid = record.data.Value;
            console.log("cateid = " + me.customcateid)
          }
        }
      });

      if(!win){
        win = desktop.createWindow({
          id:'grab-custom-win',
          title:'手动添加',
          width:800,
          height:600,
          layout:'border',
          items:[
            {
              xtype:'panel',
              layout:'fit',
              region:'center',
              width:'100%',
              height:'100%',
              items:[
                {
                  xtype:'textarea',
                  id:'custom-add-new-ta',
                  width:'100%',
                  height:'100%'
                }
              ]
            }
          ],
          tbar:[
            cbox,
            {
              xtype:'label',
              text:'价格',

            },
            {
              xtype:'numberfield',
              width:75,
              id:'price-start-custom',
              minValue: 0,
              maxValue: 9999,
              allowDecimals:false,
              allowNegative:false
            },
            {
              xtype:'label',
              text:'-'
            },
            {
              xtype:'numberfield',
              width:75,
              id:'price-end-custom',
              minValue: 0,
              maxValue: 9999,
              allowDecimals:false,
              allowNegative:false
            },
            {
              xtype:'checkbox',
              id:'custom-need-modify-cb',
              fieldLabel:'需要修改',
              labelAlign:'right'
            },
            {
              xtype:'button',
              text:'添加',
              handler:function(){
                var key = me.customcateid;
                if(key == null){
                  Ext.MessageBox.alert('手动添加','请选择分类');
                  return;
                }
                var values = Ext.getCmp('custom-add-new-ta').getValue()
                if(values == null ||values.trim().length == 0){
                  return;
                }
                var results = values.split('\n');
                if(results == null || results.length ==0){
                  return;
                }

                var pricestart = Ext.getCmp('price-start-custom').getValue();

                var priceend = Ext.getCmp('price-end-custom').getValue();
                if(pricestart == null || priceend == null){
                  Ext.MessageBox.alert('手动添加','请填写价格');
                  return;
                }
                var need_modify = Ext.getCmp('custom-need-modify-cb').getValue();
                if(Number(pricestart) > Number(priceend)){
                  var temp = pricestart;
                  pricestart = priceend;
                  priceend = temp;
                }

                var patten = "^((https|http|ftp|rtsp|mms)?://)"
               + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
                  + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                  + "|" // 允许IP和DOMAIN（域名）
                  + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                  + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                  + "[a-z]{2,6})" // first level domain- .com or .museum
                  + "(:[0-9]{1,4})?" // 端口- :80
                  + "((/?)|" // a slash isn't required if there is no file name
                  + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
                  var reg = new RegExp(patten);
                  var url = require('url');

                  var success = 0;
                  var failes = 0;
                  console.log('results=' + results);
                  console.log('results.length='+results.length)
                  for(var i = 0;i < results.length;i++){
                    var urlstr = results[i];
                    if(urlstr == null || urlstr.trim().length == 0){
                      failes += 1;
                      continue;
                    }

                    var argstr = url.parse(urlstr).query
                    var arg = querystring.parse(argstr);
                    var gid = arg.GID;

                    if(gid == null){
                      failes += 1;
                      continue;
                    }


                    me.app.sqlite.put(key,gid,urlstr,need_modify,pricestart,priceend);
                    success += 1;
                  }
                  Ext.getCmp('custom-add-new-ta').setValue('')
              }
            }
          ]
        });

      }
      return win;
  },
});

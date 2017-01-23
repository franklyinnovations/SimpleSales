Ext.define('SC.view.VVICWebPageBrowser',{
  extend: 'Ext.ux.desktop.Module',
  requires:[
    'Ext.tree.*',
    'Ext.data.*',
    'SC.component.LocalStorage',
    'SC.model.ProductItem',
    'SC.component.SQLiteHandler',
    'SC.utils.Stack',
    'Ext.DataView',
    'Ext.data.SimpleStore',
    'Ext.form.ComboBox'
  ],
  id:'vvic-browser-win',
  urls:new SC.utils.Stack(),
  title:'搜款网',
  init:function(){
    console.log('VVIC Browser inited')
  },
  createWindow:function(){
    var me = this;
    var desktop = me.app.getDesktop();
    var win = desktop.getWindow('vvic-browser-win');
    me.urls.push('http://www.vvic.com?output=embed');
    if(!win){
      win = desktop.createWindow({
          id:'vvic-browser-win',
          title:'搜款网',
          width:800,
          height:600,
          layout:'fit',
          items:[{
            xtype:'panel',
            layout:'fit',
            width:'100%',
            height:'100%',
            id:'vvic-browser-panel',
            items:[
              {
               xtype: 'component',
               autoHeight:true,
               width:'100%',
               height:'100%',
               autoEl: {tag: 'iframe', src: 'http://www.vvic.com?output=embed'}
              }
            ]
          }],
          tbar:[
            {
              xtype:'label',
              text:'网址'
            },
            {
              xtype:'textfield',
              width:500,
              id:'vvic-url-tf'
            },
            {
              xtype:'button',
              text:'转到',
              handler:function(){
                // if(me.urls.length() == 0){
                //   me.urls.push('http://www.vvic.com?output=embed')
                // }
                var url = Ext.getCmp('vvic-url-tf').getValue();
                if(url == null || url == '' || url.length == 0 ||url.trim().length == 0){
                  return;
                }
                // Ext.getCmp('vvic-browser-panel').items.items[0].src = url;
                // me.urls.push(url);
                
              }
            },
            {
              xtype:'button',
              text:'返回',
              handler:function(){
                if(me.urls.length == 0){
                  return;
                }
                var url = me.urls.pop();
                Ext.getCmp('vvic-url-tf').setValue(url);
                Ext.getCmp('vvic-browser-panel').items.items[0].src = url;
              }
            },{
              xtype:'button',
              text:'刷新',
              handler:function(){
                if(me.urls.length == 0){
                  return;
                }
                var url = me.urls.peek();
                Ext.getCmp('vvic-url-tf').setValue(url);
                Ext.getCmp('vvic-browser-panel').items.items[0].src = url;
              }
            }
          ],
          listeners:{
            show:function(thiz,opts){
              thiz.maximize();
            },
          }

      });
    }
    return win;
  }
});

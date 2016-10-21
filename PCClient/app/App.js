/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('SC.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
      'Ext.form.field.HtmlEditor',
      'Ext.window.MessageBox',
      'Ext.ux.desktop.ShortcutModel',
      'Ext.ux.desktop.Video',
      'Ext.chart.*',
      'Ext.data.JsonStore',
      'SC.view.LoginWindow',
      'SC.view.ProductInfoWin',
      'SC.component.MainProcessMessageHandler',
      'SC.component.AppEventHandler',
      'SC.widgets.ProductMenuModule'
      //'SC.widgets.SupplierModule'
    ],

    messageHandler:null,
    menuTitle:'',
    init: function() {
        // custom logic before getXYZ methods get called...
        var me = this;

        me.messageHandler = new SC.component.MainProcessMessageHandler({app:me});

        me.callParent();
        var loginWin = new SC.view.LoginWindow();
        loginWin.show();

        // now ready...
    },

    getModules : function(){
        return [
          new SC.view.ProductInfoWin(),
          new SC.widgets.ProductMenuModule()
          //new SC.widgets.SupplierModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                  {name:'商品档案',iconCls:'product-info-48x48',module:'win-product-info'}

                ]
            }),

            wallpaper: 'resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: true
        });
    },

    getStartConfig : function() {
      console.log('getStartConfig');
        var me = this, ret = me.callParent();
        me.startConfigObj = {
            title: me.menuTitle,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'设置',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'注册',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            },
            listeners:{
              show:function(menu,options){
                //console.log('menu show')
                var name = SC.component.LocalStorage.get('usrname');
                me.menuTitle = name;
                menu.setTitle(name);
              }
            }
        };
        return Ext.apply(ret,me.startConfigObj);
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
              //  { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
              //  { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new SC.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});

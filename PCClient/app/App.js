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
      'SC.component.MainProcessMessageHandler'
    ],
    // ipcRenderer:null,
    // onMainProcessMessage:function(event,args){
    //   //var me = this;
    //   console.log(args);
    //   console.log('desktop == null?' + (this.desktop == null));
    //   //console.log('desktop.app == null?' + (me.desktop.app == null));
    //   if(args == 'show-product-info-win'){
    //     var module = this.getModule('win-product-info');
    //     var win = module && module.createWindow();
    //     if(win){
    //       win.show();
    //     }
    //   }
    // },
    messageHandler:null,
    init: function() {
        // custom logic before getXYZ methods get called...
        var me = this;
        // me.ipcRenderer = require('electron').ipcRenderer;
        // me.ipcRenderer.on('toolbar-msg',me.onMainProcessMessage);
        me.messageHandler = new SC.component.MainProcessMessageHandler({app:me});

        this.callParent();
        var loginWin = new SC.view.LoginWindow();
        loginWin.show();
        // now ready...
    },

    getModules : function(){
        return [
          new SC.view.ProductInfoWin()
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
                    //{ name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
                  //  { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                  //  { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
                  //  { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'},
                  //  { name: 'WebGL', iconCls: 'grid-shortcut', module: 'webgl-win' },
                  //{ name: 'WebPage', iconCls: 'grid-shortcut', module: 'webpage-win' }
                ]
            }),

            wallpaper: 'resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: true
        });
    },
    // getModule:function(name){
    //
    //   return this.callParent(name);
    // },
    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
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

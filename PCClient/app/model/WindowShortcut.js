Ext.define('SC.model.WindowShortcut', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'name' },
       { name: 'iconCls' },
       { name: 'module' },
       { name:  'isWindow'},
       { name:  'windowId'}
    ]
});

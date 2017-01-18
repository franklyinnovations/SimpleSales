Ext.define('SC.model.ProductItem', {
    extend: 'Ext.data.TreeModel',
    fields: [
        { name: 'text' },
        { name: 'img' },
        {name:'gid'},
        {name:'url'},
        {name:'price'}
    ]
});

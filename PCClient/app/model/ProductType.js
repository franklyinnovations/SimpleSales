Ext.define('SC.model.ProductType',{
  extend: 'Ext.data.TreeModel',
  fields:[
    {name:'text'},
    {name:'leaf'},
    {name:'id'},
    {name:'children'}
  ]
});

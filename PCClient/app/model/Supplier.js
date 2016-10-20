Ext.define('SC.model.Supplier',{
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields:[
    {name:'id'},
    {name:'name'},
    {name:'address'},
    {name:'email'},
    {name:'telephone'},
    {name:'mobile'},
    {name:'qq'},
    {name:'webchat'},
    {name:'bank'}
  ]
});

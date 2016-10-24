Ext.define('SC.model.ProductInfoDisplay',{
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields:[
    {name:'id'},
    {name:'name'},
    {name:'barcode'},
    {name:'itemcode'},
    {name:'supplierPrice'},
    {name:'sellPrice'},
    {name:'supplierId'},
    {name:'supplierName'},
    {name:'typeId'},
    {name:'typeName'},
    {name:'unitName'}
  ]
});

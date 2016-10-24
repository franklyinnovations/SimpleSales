'use strict';
//商品档案
module.exports = function(sequelize, DataTypes) {
  var ProductInfo = sequelize.define('ProductInfo', {
    name: DataTypes.STRING(128),
    barcode:DataTypes.STRING,//条码
    itemcode:DataTypes.STRING,//编码
    supplyPrice:DataTypes.FLOAT,//进化货价
    sellPrice:DataTypes.STRING,//销售价格
    unitName:DataTypes.STRING,//单位
    supplierId:DataTypes.INTEGER,//供应商
    userId:DataTypes.INTEGER,//用户
    typeId:DataTypes.INTEGER,//商品分类
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductInfo;
};

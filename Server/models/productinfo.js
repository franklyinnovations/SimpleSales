'use strict';
//商品档案
module.exports = function(sequelize, DataTypes) {
  var ProductInfo = sequelize.define('ProductInfo', {
    name: DataTypes.STRING(128),
    barcode:DataTypes.STRING,//条码
    itemcode:DataTypes.STRING,//编码
    supplyPrice:DataTypes.FLOAT,//进货货价
    memoryCode:DataTypes.STRING,//助记码
    sellPrice:DataTypes.STRING,//销售价格
    unitName:DataTypes.STRING,//单位
    supplierId:DataTypes.INTEGER,//供应商
    userId:DataTypes.INTEGER,//用户
    shopId:DataTypes.INTEGER,//门店
    typeId:DataTypes.INTEGER,//商品分类,
    warehouseId:DataTypes.INTEGER,//仓库
    warehouseRackId:DataTypes.INTEGER,//货架
    memberPrice:DataTypes.FLOAT,//会员价
    memberDiscount:DataTypes.FLOAT//会员折扣
  }, {
    classMethods: {
      timestamps: false,
      tableName:'t_productinfo',
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductInfo;
};

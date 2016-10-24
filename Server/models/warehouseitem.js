'use strict';
//仓库中的商品
module.exports = function(sequelize, DataTypes) {
  var WarehouseItem = sequelize.define('WarehouseItem', {
    warehouseId:DataTypes.INTEGER,//仓库
    userId:DataTypes.INTEGER,//所属用户
    warehouseRackId:DataTypes.INTEGER,//货架
    productId:DataTypes.INTEGER,//商品
    productCounts:DataTypes.INTEGER,//商品数量
    recordDate:DataTypes.DATE//录入时间
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return WarehouseItem;
};

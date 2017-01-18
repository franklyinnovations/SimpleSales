'use strict';
//商品分类
module.exports = function(sequelize, DataTypes) {
  var ProductType = sequelize.define('ProductType', {
    name: DataTypes.STRING(128),
    isLeaf: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    parentId:DataTypes.INTEGER
  }, {
    classMethods: {
      timestamps: false,
      tableName:'t_product_type',
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductType;
};

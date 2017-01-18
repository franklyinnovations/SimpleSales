'use strict';
//商品属性
module.exports = function(sequelize, DataTypes) {
  var ProductProperties = sequelize.define('ProductProperties', {
    name: DataTypes.STRING,
    value:DataTypes.STRING,
    description:DataTypes.STRING(1024),
    productId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    shopId:DataTypes.INTEGER

  }, {
    classMethods: {
      timestamps: false,
      tableName:'t_product_properties',
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductProperties;
};

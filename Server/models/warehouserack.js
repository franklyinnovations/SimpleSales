'use strict';
//货架
module.exports = function(sequelize, DataTypes) {
  var WarehouseRack = sequelize.define('WarehouseRack', {
    name: DataTypes.STRING(128),
    position:DataTypes.STRING,
    userId:DataTypes.INTEGER,
    warehouseId:DataTypes.INTEGER,
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return WarehouseRack;
};

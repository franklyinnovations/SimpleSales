'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductType = sequelize.define('ProductType', {
    name: DataTypes.STRING(128),
    isLeaf: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    parentId:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductType;
};

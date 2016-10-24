'use strict';
//仓库
module.exports = function(sequelize, DataTypes) {
  var Warehouse = sequelize.define('Warehouse', {
    name: DataTypes.STRING(128),
    userId:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Warehouse;
};

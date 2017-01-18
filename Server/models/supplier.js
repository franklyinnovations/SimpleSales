'use strict';
//供应商
module.exports = function(sequelize, DataTypes) {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING(128),
    address:DataTypes.STRING,
    email:DataTypes.STRING,
    telephone:DataTypes.STRING,
    mobile:DataTypes.STRING,
    qq:DataTypes.STRING,
    webchat:DataTypes.STRING,
    bank:DataTypes.STRING,
    userId:DataTypes.INTEGER,
    shopId:DataTypes.INTEGER
  }, {
    classMethods: {
      timestamps: false,
      tableName:'t_supplier',
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Supplier;
};

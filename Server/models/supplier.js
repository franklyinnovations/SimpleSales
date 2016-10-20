'use strict';
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
    userId:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Supplier;
};

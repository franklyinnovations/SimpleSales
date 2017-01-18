'use strict';
//用户
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile:DataTypes.STRING,
    email:DataTypes.STRING,
    telphone:DataTypes.STRING,
    industry:DataTypes.STRING,
    address:DataTypes.STRING,
    registerDate:DataTypes.DATE,
  }, {
    timestamps: false,
    tableName:'t_user',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};

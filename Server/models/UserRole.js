'use strict';
//用户角色
module.exports = function(sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
    name: DataTypes.STRING,
    shopId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName:'t_user_role',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserRole;
};

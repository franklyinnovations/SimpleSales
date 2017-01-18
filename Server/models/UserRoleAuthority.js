'use strict'
//用户角色权限
module.exports = function(sequelize, DataTypes) {
  var UserRoleAuthority = sequelize.define('UserRoleAuthority', {
    authorityId:DataTypes.INTEGER,
    value:DataTypes.INTEGER,
    roleId:DataTypes.INTEGER,
    shopId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName:'t_user_role_authority',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserRoleAuthority;
};

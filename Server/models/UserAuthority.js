'use strict'
//用户权限
module.exports = function(sequelize, DataTypes) {
  var UserAuthority = sequelize.define('UserAuthority', {
    name: DataTypes.STRING,
    groupId:DataTypes.INTEGER,
    //shopId:DataTypes.INTEGER,
    //userId:DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName:'t_user_authority',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserAuthority;
};

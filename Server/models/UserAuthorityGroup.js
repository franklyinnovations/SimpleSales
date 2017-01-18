'use strict';
//用户权限组
module.exports = function(sequelize, DataTypes) {
  var UserAuthorityGroup = sequelize.define('UserAuthorityGroup', {
    name: DataTypes.STRING,
    //shopId:DataTypes.INTEGER,
    //userId:DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName:'t_user_authority_group',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserAuthorityGroup;
};

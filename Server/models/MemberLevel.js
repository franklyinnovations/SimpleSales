'use strict'
//会员等级

module.exports = function(sequelize, DataTypes) {
  var MemberLevel = sequelize.define('MemberLevel', {
    name: DataTypes.STRING,
    shopId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName:'t_member_level',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MemberLevel;
};

'use strict'
//会员等级规则

module.exports = function(sequelize, DataTypes) {
  var MemberLevelRule = sequelize.define('MemberLevelRule', {
    name: DataTypes.STRING,
    value:DataTypes.INTEGER,
    valueOpt:DataTypes.INTEGER,//值操作+-*/
    levelId:DataTypes.INTEGER,
    shopId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName:'t_member_level_rule',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MemberLevelRule;
};

'use strict'
//会员
// 会员ID
// 开卡门店
// 会员姓名
// 会员等级
// 会员编号
// 会员电话
// 开卡日期
// 积分
// 余额
module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    code:DataTypes.STRING,
    mobile:DataTypes.STRING,
    registerDate:DataTypes.DATE,
    points:DataTypes.INTEGER,
    balance:DataTypes.DOUBLE,
    level:DataTypes.INTEGER,
    shopId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName:'t_member',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Member;
};

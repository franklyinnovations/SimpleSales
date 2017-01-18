'use strict';
//支付类型
module.exports = function(sequelize, DataTypes) {
  var PayType = sequelize.define('PayType', {
    name: DataTypes.STRING(128),
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER
  }, {
    classMethods: {
      timestamps: false,
      tableName:'t_pay_type',
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PayType;
};

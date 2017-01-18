'use strict'
//门店
module.exports = function(sequelize, DataTypes) {
  var Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    userId:DataTypes.INTEGER,//用户
    address:DataTypes.STRING,//地址
    code:DataTypes.STRING//门店编码
  }, {
    timestamps: false,
    tableName:'t_shop',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Shop;
};

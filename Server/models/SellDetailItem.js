'use strict'
//销售明细
module.exports = function(sequelize, DataTypes) {
  var SellDetailItem = sequelize.define('SellDetailItem', {
    orderID:DataTypes.INTEGER,//所属订单
    itemID:DataTypes.STRING,//销售流水号
    paymentID:DataTypes.STRING,//支付流水号
    productId:DataTypes.INTEGER,//商品
    productCounts:DataTypes.INTEGER,//商品数量
    discounts:DataTypes.FLOAT,//折扣
    memberID:DataTypes.FLOAT,//会员
    sellDateTime:DataTypes.DATE,//日期
    shopId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    roleId:DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName:'t_sell_detail_item',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SellDetailItem;
};

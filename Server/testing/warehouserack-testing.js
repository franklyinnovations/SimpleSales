var dao = require('../dao');
var db = require('../models');

var warehouseRackDao = new dao.WarehouseRackDao(db);
var sequelize = db.sequelize;
var randomstring = require('randomstring');
var async = require('async');

var info = {
  //id:4,
  name:'货架一',
  position:'第2行',
  warehouseId:1,
  userId:1
}

// warehouseRackDao.save(info,function(result){
//   console.log(result);
// });
// warehouseRackDao.update(info,function(result){
//   console.log(result);
// });
// warehouseRackDao.remove({userId:1,id:4},function(result){
//   console.log(result);
// });
// warehouseRackDao.findOne({userId:1,name:'货架一'},function(result){
//   console.log(result);
// });

warehouseRackDao.findAll({userId:1},function(result){
    console.log(result);
});

var dao = require('../dao');
var db = require('../models');

var warehouseDao = new dao.WarehouseDao(db);
var sequelize = db.sequelize;
var randomstring = require('randomstring');
var async = require('async');

var warehouse = {
  name:'总仓库',
  userId:1
};

// sequelize.sync().then(function(){
//   warehouseDao.save(warehouse,function(result){
//     console.log(result);
//   });
// })

// warehouseDao.update({
//   name:'广州总仓库',
//   userId:1,
//   id:1
// })

// warehouseDao.findOne({userId:1,id:1},function(results){
//   console.log(results);
// });

// warehouseDao.findAll({userId:1},function(results){
//   console.log(results);
// });

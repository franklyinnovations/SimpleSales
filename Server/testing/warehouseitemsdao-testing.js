var dao = require('../dao');
var db = require('../models');

var warehouseItemDao = new dao.WarehouseItemDao(db);
var sequelize = db.sequelize;
var randomstring = require('randomstring');
var async = require('async');

warehouseItemDao.findOne({userId:1,supplierName:'FFF'},function(results){
  console.log(results);
})

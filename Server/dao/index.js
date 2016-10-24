'use strict';
var daos = {};

daos['UserDao'] = require('./UserDao.js');
daos['ProductTypeDao'] = require('./ProductTypeDao.js');
daos['SupplierDao'] = require('./SupplierDao.js');
daos['ProductInfoDao'] = require('./ProductInfoDao.js');
daos['WarehouseDao'] = require('./WarehouseDao.js');
daos['WarehouseRackDao'] = require('./WarehouseRackDao.js');
daos['WarehouseItemDao'] = require('./WarehouseItemDao.js');

//daos['ProductTypeTreeDao'] = require('./ProductTypeTreeDao.js');

module.exports = daos;

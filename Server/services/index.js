'use strict';

var services = {};

services['UserService'] = require('./userservice.js');
services['ProductTypeService'] = require('./producttypeservices.js');
services['SupplierService'] = require('./supplierservice.js');
services['ProductInfoService'] = require('./productinfoservice.js');
services['WarehouseService'] = require('./warehouseservice.js');
services['WarehouseRackService'] = require('./warehouserackservice.js');

module.exports = services;

'use strict';

var services = {};

services['UserService'] = require('./userservice.js');
services['ProductTypeService'] = require('./producttypeservices.js');
services['SupplierService'] = require('./supplierservice.js');
services['ProductInfoService'] = require('./productinfoservice.js');
module.exports = services;

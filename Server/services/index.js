'use strict';

var services = {};

services['UserService'] = require('./userservice.js');
services['ProductTypeService'] = require('./producttypeservices.js');
services['SupplierService'] = require('./supplierservice.js')
module.exports = services;

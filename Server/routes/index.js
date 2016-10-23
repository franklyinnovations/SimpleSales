'use strict';
var routes = {};

routes['UserRegister'] = require('./userregister.js')
routes['UserUpdate'] = require('./userupdate.js');
routes['UserLogin'] = require('./userlogin.js');
routes['ProductTypes'] = require('./producttypesquery.js');
routes['ProductTypeUpdate'] = require('./producttypeupdate.js');
routes['ProductTypeAdd'] = require('./producttypeadd.js');
routes['ProductTypeRemove'] = require('./producttyperemove.js');
routes['SupplierAdd'] = require('./supplieradd.js');
routes['SupplierRemove'] = require('./supplierremove.js');
routes['SupplierUpdate'] = require('./supplierupdate.js');
routes['SupplierPageQuery'] = require('./supplierpagequery.js');
routes['SupplierQueryWithUID'] = require('./supplierquerywithuid.js');

module.exports = routes;

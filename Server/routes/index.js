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

routes['ProductInfoAdd'] = require('./productinfoadd.js');
routes['ProductInfoQueryOne'] = require('./productinfoqueryone.js');
routes['ProductInfoPagingQuery'] = require('./productinfopagingquery.js');
routes['ProductInfoRemove'] = require('./productinforemove.js');
routes['ProductInfoUpdate'] = require('./productinfoupdate.js');

routes['WarehouseAdd'] = require('./warehouseadd.js');
routes['WarehouseUpdate'] = require('./warehouseupdate.js');
routes['WarehouseRemove'] = require('./warehouseremove.js');
routes['WarehouseFindOne'] = require('./warehousefindone.js');
routes['WarehouseFindAll'] = require('./warehousefindall.js');

routes['WarehouseRackAdd'] = require('./warehouserackadd.js');
routes['WarehouseRackUpdate'] = require('./warehouserackupdate.js');
routes['WarehouseRackRemove'] = require('./warehouserackremove.js');
routes['WarehouseRackFindOne'] = require('./warehouserackfindone.js');
routes['WarehouseRackFindAll'] = require('./warehouserackfindall.js');

module.exports = routes;

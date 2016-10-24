'use strict';
exports.register = function(server,options,next){
    var db = options.db;
    var service = options.service;
    var routes = options.routes;
    var daos = options.dao;

    var dao = new daos.WarehouseDao(db);
    var whservice = new service.WarehouseService(dao);
    var route = new routes.WarehouseRemove(whservice);

    server.route(route.getRoute());

    next();
}

exports.register.attributes = {
    pkg: require('./package.json')
};

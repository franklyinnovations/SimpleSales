'use strict';
exports.register = function(server,options,next){
    var db = options.db;
    var service = options.service;
    var routes = options.routes;
    var daos = options.dao;

    var dao = new daos.WarehouseRackDao(db);
    var whservice = new service.WarehouseRackService(dao);
    var route = new routes.WarehouseRackAdd(whservice);

    server.route(route.getRoute());

    next();
}

exports.register.attributes = {
    pkg: require('./package.json')
};

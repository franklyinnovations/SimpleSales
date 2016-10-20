var _dao = require('./dao');
var _service = require('./services');
var _db = require('./models');
var _routes = require('./routes');

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 3000 });

var sequelize = _db.sequelize;

var commOpts = {
  dao:_dao,
  service:_service,
  db:_db,
  routes:_routes
}



sequelize.sync({forece:true}).then(function(){
    server.register([{
      register: Good,
      options: {
          reporters: {
              console: [{
                  module: 'good-squeeze',
                  name: 'Squeeze',
                  args: [{
                      response: '*',
                      log: '*'
                  }]
              }, {
                  module: 'good-console'
              }, 'stdout']
          }
      }
  },{
    register:require('./plugins/user/register/registerplugin.js'),
    options:commOpts
  },{
    register:require('./plugins/user/update/updateplugin.js'),
    options:commOpts
  },{
    register:require('./plugins/user/login/loginplugin.js'),
    options:commOpts
  },{
    register:require('./plugins/producttype/alltypes/producttypes.js'),
    options:commOpts
  },{
    register:require('./plugins/producttype/updatetype/updateproducttype.js'),
    options:commOpts
  },{
    register:require('./plugins/producttype/removetype/producttyperemove.js'),
    options:commOpts
  },{
    register:require('./plugins/producttype/addtype/producttypeadd.js'),
    options:commOpts
  },{
    register:require('./plugins/supplier/add/supplieradd.js'),
    options:commOpts
  },{
    register:require('./plugins/supplier/update/supplierupdate.js'),
    options:commOpts
  },{
    register:require('./plugins/supplier/remove/supplierremove.js'),
    options:commOpts
  },{
    register:require('./plugins/supplier/pagequery/supplierpagequery.js'),
    options:commOpts
  }], (err) => {

      if (err) {
          throw err; // something bad happened loading the plugin
      }

      server.start((err) => {

          if (err) {
              throw err;
          }
          server.log('info', 'Server running at: ' + server.info.uri);
      });
  });
});

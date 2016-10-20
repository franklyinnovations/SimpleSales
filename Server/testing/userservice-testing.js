var daos = require('../dao');
var db = require('../models');
var services = require('../services');

var userDao = new daos.UserDao(db);
var userService = new services.UserService(userDao);

userService.register({
  name:'ABC',
  code:'001',
  password:'888888'
},function(result){
  console.log(result);
});

// userService.login('008','AAAAAAA',function(result){
//   console.log(result);
//   console.log(result.datas.rows[0]);
// });

var dao = require('../dao');
var db = require('../models');

var userDao = new dao.UserDao(db);
var randomstring = require('randomstring');
var async = require('async');

// for(var i = 1;i <= 109;i++ ){
//   var user = {
//     name:randomstring.generate(8),
//     password:randomstring.generate(8),
//     code:randomstring.generate(4)
//   }
//
//   userDao.save(user,function(results){
//     console.log(results);
//   });
// }
userDao.save({
  name:'jenson',
  code:'001',
  password:'123456'},function(results){
  console.log(results);
});

// userDao.update({name:'JENSONB',id:7},function(result){
//   console.log(result);
// });

// userDao.remove({id:1},function(result){
//   console.log(result)
// });

// userDao.findByCodeAndPassword('008','AAAAAAA',function(result){
//   console.log(result);
//   console.log(result.datas.rows[0]);
// });
// var users = {id:21};
// function queryWithPage(done){
//   userDao.findWithPage(2,10,function(results){
//     console.log(results);
//     results.datas.rows.forEach(function(result){
//       console.log(result);
//       users.push(result);
//     });
//     done(null,null);
//   });
// }
// function batchRemove(done){
//   userDao.remove(users,function(results){
//     console.log(results);
//     done(null,null);
//   });
// }
//
// async.series([batchRemove]);


//userDao.findWithPage(1,10,function(results){
// console.log(results);
//  results.datas.rows.forEach(function(result){
//    console.log(result);
    //users.push(result);
//  });
//});

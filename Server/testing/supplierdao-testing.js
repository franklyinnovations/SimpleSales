var daos = require('../dao');
var db = require('../models');

var supplierDao = new daos.SupplierDao(db);
var randomstring = require('randomstring');
var async = require('async');

// supplierDao.save({
//   name:'微软服饰',
//   address:'广州',
//   email:'apple@apple.com',
//   telephone:'020-123456',
//   mobile:'13712345678',
//   webchat:'apple',
//   qq:'100001',
//   bank:'工行,62202123333333',
//   userId:1
// },function(result){
//   console.log(result);
// });

// supplierDao.remove({
//   id:2,userId:1
// },function(result){
//   console.log(result)
// })

// supplierDao.update({
//   address:'韩国',
//   email:'sumsun@sumsun.com',
//   telephone:'020-123456',
//   mobile:'13712345678',
//   webchat:'sumsung',
//   qq:'100001',
//   bank:'工行,62202123333333',
//   userId:1,
//   id:3
// },function(result){
//   console.log(result);
// });

// supplierDao.get({id:1},function(result){
//   console.log(result.datas.rows[0]);
// });

// supplierDao.findAll({id:4},function(results){
//   console.log(results);
// });

// supplierDao.getTotal({userId:1},function(result){
//   console.log(result)
// });

// for(var i = 1;i <= 50;i++){
//   supplierDao.save({
//     name:randomstring.generate(8),
//     address:randomstring.generate(8),
//     email:randomstring.generate(8)+'@apple.com',
//     telephone:'020-123456',
//     mobile:'13712345678',
//     webchat:'apple',
//     qq:'100001',
//     bank:'工行,62202123333333',
//     userId:1
//   },function(result){
//     console.log(result);
//   });
// }
//
// for(var i = 1;i <= 50;i++){
//   supplierDao.save({
//     name:randomstring.generate(8),
//     address:randomstring.generate(8),
//     email:randomstring.generate(8)+'@apple.com',
//     telephone:'020-123456',
//     mobile:'13712345678',
//     webchat:'apple',
//     qq:'100001',
//     bank:'工行,62202123333333',
//     userId:2
//   },function(result){
//     console.log(result);
//   });
// }

// supplierDao.findWithPage({userId:1,id:4},1,10,function(result){
//   console.log(result);
//   if(result.datas.total > 0){
//     result.datas.rows.forEach(function(row){
//       console.log(row);
//     })
//   }
// });

var dao = require('../dao');
var db = require('../models');

var productInfoDao = new dao.ProductInfoDao(db);
var randomstring = require('randomstring');
var async = require('async');



// for(var i = 1;i <= 50;i++){
//   var _barcode = randomstring.generate(8);
//   var _name = 'ES';
  // var info = {
  //   //id:1,
  //   barcode:_barcode,
  //   itemcode:'CS'+_barcode,
  //   name:'CS',
  //   userId:1,
  //   supplyPrice:29.0,
  //   sellPrice:49.0,
  //   supplierId:1,
  //   typeId:1,
  //   unitName:'pice'
  // };
//   productInfoDao.save(info,function(result){
//     console.log(result);
//   });
// }
//
// for(var i = 1;i <= 50;i++){
//   var _barcode = randomstring.generate(8);
//   var info = {
//     //id:1,
//     barcode:_barcode,
//     itemcode:'CK'+_barcode,
//     name:'CK',
//     userId:1,
//     supplyPrice:29.0,
//     sellPrice:49.0,
//     supplierId:1,
//     typeId:1,
//     unitName:'pice'
//   };
//   productInfoDao.save(info,function(result){
//     console.log(result);
//   });
// }

// productInfoDao.save(info,function(result){
//   console.log(result);
// });

// productInfoDao.update(info,function(result){
//   console.log(result);
// });

// productInfoDao.get({userId:1,name:'ES'},function(result){
//   console.log(result);
//   if(result.rows.length > 0){
//     result.rows.forEach(function(row){
//       console.log(row);
//     })
//   }
// });

// productInfoDao.remove({barcode:'hw8dBR9G',userId:1},function(result){
//   console.log(result);
// });
// productInfoDao.findAllWithPage({userId:1,typeId:1},function(results){
//   console.log(results)
// });

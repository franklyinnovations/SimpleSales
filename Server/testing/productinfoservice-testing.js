var http = require('http');
var querystring = require('querystring');
var assert = require('assert');
var req_data = querystring.stringify({
        'userId':'1',
        'page':'1',
        'limit':'10'
      });

var update_info = {
        id:75,
        barcode:'CS123456',
        itemcode:'CS123456',
        name:'CS',
        userId:1,
        supplyPrice:29.0,
        sellPrice:49.0,
        supplierId:1,
        typeId:2,
        unitName:'pice'
      };
var req_update_data = querystring.stringify(update_info);

var remove_info = {
  id:75,
  userId:1
}
var req_remove_data = querystring.stringify(remove_info);

var add_info = {
        id:75,
        barcode:'CS123457',
        itemcode:'CS123457',
        name:'CS',
        userId:1,
        supplyPrice:29.0,
        sellPrice:49.0,
        supplierId:1,
        typeId:2,
        unitName:'pice'
      };

var req_add_data = querystring.stringify(add_info);


var req_opt = {
    method:'GET',
    host:'127.0.0.1',
    port:3000,
    path:'/productinfopagingquery?userId=1',
    headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': req_data.length
    }
}

var req_add_opt = {
    method:'POST',
    host:'127.0.0.1',
    port:3000,
    path:'/productinfoadd',
    headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': req_add_data.length
    }
}

var req_update_opt = {
    method:'POST',
    host:'127.0.0.1',
    port:3000,
    path:'/productinfoupdate',
    headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': req_update_data.length
    }
}

var req_remove_opt = {
    method:'POST',
    host:'127.0.0.1',
    port:3000,
    path:'/productinforemove',
    headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': req_remove_data.length
    }
}



// var req = http.request(req_opt,function(res){
//     res.setEncoding('utf8');
//        res.on('data', function (chunk) {
//          console.log('BODY: ' + chunk);
//          var result = JSON.parse(chunk);
//          assert.equal(result.code,0,'result code should be 0');
//        });
// });
//
// req.write(req_data + "\n");

// var req = http.request(req_update_opt,function(res){
//     res.setEncoding('utf8');
//        res.on('data', function (chunk) {
//          console.log('BODY: ' + chunk);
//          var result = JSON.parse(chunk);
//          assert.equal(result.code,0,'result code should be 0');
//        });
// });
//
// req.write(req_update_data + "\n");

// var req = http.request(req_add_opt,function(res){
//     res.setEncoding('utf8');
//        res.on('data', function (chunk) {
//          console.log('BODY: ' + chunk);
//          var result = JSON.parse(chunk);
//          assert.equal(result.code,0,'result code should be 0');
//        });
// });
//
// req.write(req_add_data + "\n");

var req = http.request(req_remove_opt,function(res){
    res.setEncoding('utf8');
       res.on('data', function (chunk) {
         console.log('BODY: ' + chunk);
         var result = JSON.parse(chunk);
         assert.equal(result.code,0,'result code should be 0');
       });
});

req.write(req_remove_data + "\n");

req.end();

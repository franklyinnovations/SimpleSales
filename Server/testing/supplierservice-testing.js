var http = require('http');
var querystring = require('querystring');
var assert = require('assert');
var req_data = querystring.stringify({
        'userId':'1',
        'page':'1',
        'pageSize':'10'
      });

var req_opt = {
    method:'GET',
    host:'127.0.0.1',
    port:3000,
    path:'/supplierpagequery?userId=1&page=1&pageSize=10',
    headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': req_data.length
    }
}

var req = http.request(req_opt,function(res){
    res.setEncoding('utf8');
       res.on('data', function (chunk) {
         console.log('BODY: ' + chunk);
         var result = JSON.parse(chunk);
         assert.equal(result.code,0,'result code should be 0');
       });
});

req.write(req_data + "\n");
req.end();

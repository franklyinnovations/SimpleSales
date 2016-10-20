var fs = require('fs');
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser

fs.readFile(__dirname + '/producttype.xml',function(err,data){
  if(err){
    throw err;
  }
//  console.log(data.toString());
  var doc = new dom().parseFromString(data.toString());

  var nodes = xpath.select("//type[name='A1']/children", doc);
  console.log(nodes)

});

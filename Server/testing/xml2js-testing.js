var xml2js = require('xml2js');

var types = {};

var productTypes = [{
    name:"A",
    id:1,
    children:[
        {
          name:"A1",
          id:2
        }
    ]
},{
  name:"B",
  id:3,
  children:[
    {
      name:"B1",
      id:4
    },
    {
      name:"B2",
      id:5
    },
    {
      name:"B3",
      id:6
    }
  ]
}];


var builder = new xml2js.Builder();
var xml = builder.buildObject(productTypes);
//
console.log(xml)

var xml2json = xml2js.parseString;
var fs = require('fs');
var xmldata = null;
var treeobject = null;
var async = require('async');
async.series([function(done){
  fs.readFile(__dirname + '/producttype.xml',function(err,data){
    xmldata = data;
    done(null,null);
  });
},function(done){
  xml2json(xmldata,function(err,result){
  //  console.log(result);
    treeobject = result;
    // console.log(result.productTypes)
    // console.log(result.productTypes.type)
    // console.log(result.productTypes.type[0])
    console.log(result.productTypes.type[0].children[0].type)
    var obj = builder.buildObject(treeobject);
    console.log(obj);
    done(null,null);
  });
}]);

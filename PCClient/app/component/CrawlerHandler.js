Ext.define('SC.component.CrawlerHandler',{
  httpRequest:function(host,uri,_callback){
    var Crawler = require("crawler");
    var results = [];
    var querystring = require('querystring')
    var url = require('url')
    var pages = 0;
    var c = new Crawler({
    maxConnections : 1,
    rateLimit:2000,
    callback : function (error, res, done) {
        if(error){
            console.error(error);
        }else{
            var $ = res.$;
			      var index = 0;

            var item = $('div.left-container').find('div.design-goods-list-item-contianer').each(function($this){
    				var a = $(this).find('.design-goods-image-container').children('a').attr('href');
    				var img = $(this).find('.design-goods-image-container').children('a').children('img').attr('src')
    				var title =$(this).find('.design-goods-image-container').children('a').children('img').attr('title')
    				var price = $(this).find('.design-goods-price-and-collect-container').children('div.design-goods-price').text()
    				//var ref = a.attr('href')
    				//var img = a.children('img').attr('src')
            var record = {};

    				var argstr = url.parse(host+a).query
    				var arg = querystring.parse(argstr);
              //console.log('gid = ' + arg.GID)
              record.gid = arg.GID;
              record.img = 'http:'+img;
              record.text = title;
              record.price = price;
              record.url = host+a;

              //results.iconCls='background-image:url(http:'+ img + ');';
              //results.leaf = true;
              results.push(record);
    			  //  console.log(record)
    				// console.log('------------')
    				// console.log()
			   });
      }
        if(_callback){
          _callback(results)
        }
        done();
    }
  });
    console.log(uri);
    c.queue({
        uri:uri,
    });
  }
});

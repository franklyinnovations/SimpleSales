Ext.define('SC.component.AppEventHandler',{
  statics:{
    eventEmitter:null,
    // constructor:function(config){
    //   var me = this;
    //   var events = require('events');
    //   me.eventEmitter = new events.EventEmitter();
    // },
    init:function(){
      var events = require('events');
      this.eventEmitter = new events.EventEmitter();
      console.log('AppEventHandler::init');
    },
    register:function(event,callback){
      var me = this;
      me.eventEmitter.on(event,callback);
      console.log('register event:' + event);
    },
    unregister:function(event){
      // var me = this;
      // me.eventEmitter.removeListener(event,funciton(){
      //   console.log('unregister event:' + event);
      // })
    },
    send:function(event,msg){
      var me = this;
      me.eventEmitter.emit(event,msg);
      console.log('send event:' + event);
    }
  }
});

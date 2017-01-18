Ext.define('SC.component.LocalStorage',{
  statics:{
    //sessionStorage : sessionStorage,
    set:function(key,value){
      //this.LocalStorage.setItem(key,value);
      //sessionStorage[key] = value;
      localStorage.setItem(key,value);
    },
    get:function(key){
      //return this.localStorage.getItem(key);
      return localStorage.getItem(key);
    },
    clear:function(){
      localStorage.clear();
    }
  }
});

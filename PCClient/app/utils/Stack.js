Ext.define('SC.utils.Stack',{
    dataStore:[],
    top:0,
    push:function(data){
      this.dataStore[this.top++] = data;
    },
    pop:function(){
      if(this.top <= 0){
        return null;
      }

      return this.dataStore[--this.top];
    },
    peek:function(){
      return this.dataStore[this.top - 1];
    },
    clear:function(){
      this.top = 0;
    },
    length:function(){
      return this.top;
    }
});

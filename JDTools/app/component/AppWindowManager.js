Ext.define('SC.component.AppWindowManager',{
  requires:[
    'SC.utils.Map'
  ],
  statics:{
    windows:[],
    addWindow:function(id){
      if(this.hasWindow(id)){
        console.log('window:' + id + 'has existed');
        return;
      }
      this.windows.push(id);
      console.log('addWindow:id = ' + id);
    },
    hasWindow:function(key){
      return this.windows.filter(function(v){
          if(v===key){
            return key;
        }
      }).length>0;
    },
    removeWindow:function(id){
      var len = this.windows.length;
      if(len == 0){
        return;
      }

      var idx = -1;
      for(var i = 0;i < len;i++){
        if(this.windows[i] == id){
          idx = i;
          break;
        }
      }
      if(idx >= 0){
        var datas = this.windows.splice(idx,1);
        console.log('removeWindow:datas = ' + datas);
      }else{
        console.log('removeWindow:not found:' + id);
      }
    },
    showWindow:function(id,clazz,cfg){
      if(this.hasWindow(id) || !id || id == null){
        return false;
      }
      var win = Ext.create(clazz,cfg);
      this.addWindow(id);
      win.show();
      // if(callback){
      //   callback(win);
      // }
      console.log('showWindow:id = ' + id);
      return win;
    }
  }
});

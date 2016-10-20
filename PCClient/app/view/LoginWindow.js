Ext.define('SC.view.LoginWindow',{
	extend:'Ext.Window',
	uses:[],
	require:[
		  'Ext.window.MessageBox',
			'Ext.MessageBox',
			'SC.component.LocalStorage'
	],
	id : 'login-win',
	layout : 'fit', //自适应布局
	align : 'center',
	width : 300,
	height : 200,
	resizable : false,
	draggable : false,
	border : false,
	bodyStyle : 'padding:5px;',
	maximizable : false,//禁止最大化
	closeAction : 'close',
	closable : false,//禁止关闭,
	title:'登录系统',
	modal:true,
	items:[
		{
			xtype:'form',
			//labelWidth : 75,
			defaults : {
				width : 150
			},
			defaultType : 'textfield',//默认字段类型
			bodyStyle : 'padding:30 0 0 20;',
			border : false,
			buttonAlign : 'center',
			border : false,
			scope:this,
			id : "form",
			//定义表单元素
			items : [
			 	{
			 		xtype:'textfield',
					id :'login-uname',
					fieldLabel : '用户名:',
					labelAlign:'right',
					name : 'name',//元素名称
					//anchor:'95%',//也可用此定义自适应宽度
					allowBlank : false,//不允许为空
					blankText : '请输入用户名',//错误提示内容
					width:'100%',
					enableKeyEvents: true,
					listeners:{
						 keyup : function( thiz , e , eOpts ){
							 	if(e.getKey() == Ext.event.Event.ENTER){
									var uname = Ext.getCmp('login-uname').getValue();
									var pwd = Ext.getCmp('login-pwd').getValue();
									if((uname == null || uname.trim() == '') && (pwd && pwd.trim() != '')){
										Ext.getCmp('login-uname').setValue('');
										Ext.getCmp('login-pwd').focus(false,100);
										Ext.getCmp('login-uname').focus(true,100);
									}else if((pwd == null || pwd.trim() == '') && (uname && uname.trim() != '')){
										Ext.getCmp('login-pwd').setValue('');
										Ext.getCmp('login-uname').focus(false,100);
										Ext.getCmp('login-pwd').focus(true,100);
									}else if((uname == null || uname.trim() == '') || (pwd == null || pwd.trim() == '')){
										Ext.getCmp('login-uname').setValue('');
										Ext.getCmp('login-pwd').focus(false,100);
										Ext.getCmp('login-uname').focus(true,100);
									}else{
										console.log('all is ready');
										var win = Ext.getCmp('login-win');
										win.handleLogin();

									}
									return true;
								}
								return false;
						 }
					}
				},
				{
					xtype:'textfield',
					id : 'login-pwd',
					//xtype: 'textfield',
					inputType : 'password',
					fieldLabel : '密码:',
					//anchor:'95%',
					labelAlign:'right',
					//maxLength : 10,
					name : 'password',
					allowBlank : false,
					width:'100%',
					blankText : '请输入密码',
					enableKeyEvents: true,
					listeners:{
						 keyup : function( thiz , e , eOpts ){
							 if(e.getKey() == Ext.event.Event.ENTER){
							 var uname = Ext.getCmp('login-uname').getValue();
							 var pwd = Ext.getCmp('login-pwd').getValue();
							 if((uname == null || uname.trim() == '') && (pwd && pwd.trim() != '')){
								 Ext.getCmp('login-uname').setValue('');
								 Ext.getCmp('login-pwd').focus(false,100);
								 Ext.getCmp('login-uname').focus(true,100);
							 }else if((pwd == null || pwd.trim() == '') && (uname && uname.trim() != '')){
								 Ext.getCmp('login-pwd').setValue('');
								 Ext.getCmp('login-uname').focus(false,100);
								 Ext.getCmp('login-pwd').focus(true,100);
							 }else if((uname == null || uname.trim() == '') || (pwd == null || pwd.trim() == '')){
								 Ext.getCmp('login-uname').setValue('');
								 Ext.getCmp('login-pwd').focus(false,100);
								 Ext.getCmp('login-uname').focus(true,100);
							 }else{
								 console.log('all is ready');
								 var win = Ext.getCmp('login-win');
								 win.handleLogin();

							 }
							 return true;
						 }
								return false;
						 }
					}
			} ],
			buttons : [ {
				text : 'Login',
				//type : 'submit',
				//id : 'sb',
				//scope:this,
				//定义表单提交事件
				handler : function(){
					//console.log('login');
					//this.handleLogin();
					var win = Ext.getCmp('login-win');
					win.handleLogin();

				}
			}, {
				text : 'Reset',
				//scope:this,
				handler:function(){
					//console.log('reset');
					var win = Ext.getCmp('login-win');
					win.handleReset();
				}
			} ]

		}
	],
	handleLogin:function(){
		var uname = Ext.getCmp('login-uname').getValue();
		var pwd = Ext.getCmp('login-pwd').getValue();
		var me  = this;
		Ext.Ajax.request({
			 url:'http://localhost:3000/login',
			 params: {name:uname,password:pwd },
			 method: 'POST',
      success: function (response, options) {
				var result = Ext.decode(response.responseText);
			//	console.log(result.datas.rows[0]);
				if(result.result == 'success'){
					SC.component.LocalStorage.set('uname',uname);
					SC.component.LocalStorage.set('uid',result.datas.rows[0].id);
					var ipcRenderer = require('electron').ipcRenderer;
					ipcRenderer.send('asynchronous-message', 'user-login');
					me.destroy();
				}else{
					Ext.MessageBox.alert('失败','用户名或密码不正确');
				}
      },
      failure: function (response, options) {
        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
      },
		});
	},
	handleReset:function(){
		Ext.getCmp('login-uname').setValue('');
		Ext.getCmp('login-pwd').setValue('');
	},
});

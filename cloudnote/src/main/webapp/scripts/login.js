/**login.js 封装登录和注册处理 **/
//log_in.html主处理
	$(function(){//页面 载入完毕
	//给登录按钮绑定单击处理
	$("#login").click(checkLogin);
	//给注册按钮绑定单击事件
	$("#regist_button").click(registUser);
	});
//登录处理
	function checkLogin(){
		//获取请求参数
		var name = $("#count").val().trim();
		var password = $("#password").val().trim();
		//检测参数格式
		//先清空以前提示信息
		$("#count_span").html("");
		$("#password_span").html("");
		var ok = true;//是否通过监测
		if(name==""){
			ok = false;
			$("#count_span").html("用户名为空");
		}
		if(password==""){
			ok = false;
			$("#password_span").html("密码为空");
		}
		//发送Ajax请求
		if(ok){
			$.ajax({
				url:base_path+"/user/login.do",
				type:"post",
				data:{"name":name,"password":password},
				dataType:"json",
				success:function(result){
					//result是服务器返回的JSON结果{"status":xx,"msg":xx,"data":xx}
					if(result.status==0){//成功
						//TODO 将用户信息写入Cookie
						var user = result.data;//获取返回的user
						//写入Cookie
						addCookie("uid",user.cn_user_id,2);
						addCookie("uname",user.cn_user_name,2);
						window.location.href="edit.html";
					}else if(result.status==1){//用户名错
						$("#count_span").html(result.msg);
					}else if(result.status==2){//密码错
						$("#password_span").html(result.msg);
					}
				},
				error:function(){
					alert("登录异常");
				}
			});
		}
	}
//注册处理
	function registUser(){
		//获取请求参数
		var name = $("#regist_username").val().trim();
		var nick = $("#nickname").val().trim();
		var password = $("#regist_password").val().trim();
		var f_password = $("#final_password").val().trim();
		var ok = true;
		//格式检查
		$("#warning_1 span").html("");
		$("#warning_2 span").html("");
		$("#warning_3 span").html("");
		if(name==""){
			ok = false;
			$("#warning_1").show();//显示隐藏内容
			$("#warning_1 span").html("用户名为空");
		}
		if(password==""){
			ok = false;
			$("#warning_2").show();
			$("#warning_2 span").html("密码为空");
		}else if(password.length<6){
			ok = false;
			$("#warning_2").show();
			$("#warning_2 span").html("密码长度太短");
		}
		if(f_password==""){
			ok = false;
			$("#warning_3").show();
			$("#warning_3 span").html("密码为空");
		}else if(password != f_password){
			ok = false;
			$("#warning_3").show();
			$("#warning_3 span").html("两次密码不相同");
		}
		//发送Ajax请求
		if(ok){
			$.ajax({
				url:base_path+"/user/add.do",
				type:"post",
				data:{"name":name,"password":password,"nick":nick},
				dataType:"json",
				success:function(result){
					if(result.status==0){//成功
						alert(result.msg);
						$("#back").click();//转向登录界面
					}else if(result.status==1){//用户名被占用
						$("#warning_1").show();
						$("#warning_1 span").html(result.msg);
					}
				},
				error:function(){
					alert("注册异常");
				}
			});
		}
	}
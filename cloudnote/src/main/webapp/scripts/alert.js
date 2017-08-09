/**alert.js 封装对话框处理 **/

//弹出回收站彻底删除笔记对话框
function alertDeleteRollBackWindow() {
	$("#can").load("alert/alert_delete_rollback.html");
	$(".opacity_bg").show();
	$("#recylebin_ul a").removeClass("checked");
	$(this).parent().addClass("checked");
}

//弹出回收站恢复笔记对话框
function alertReplayNoteWindow() {
	$("#can").load("alert/alert_replay.html");
	$(".opacity_bg").show();
	$("#recylebin_ul a").removeClass("checked");
	$(this).parent().addClass("checked");
	//获取请求参数
	var userId = getCookie("uid");
	//检查格式
	if(userId==null){
		window.location.href="log_in.html";
	}else{
		//发送ajax请求
		$.ajax({
			url:base_path+"/book/loadbooks.do",
			type:"post",
			data:{"userId":userId},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					//获取返回的笔记本集合
					var books = result.data;
					for(var i=0;i<books.length;i++){
						var bookId = books[i].cn_notebook_id;//获取笔记本ID
						var bookName = books[i].cn_notebook_name;//获取笔记本的名称
						var option = '<option value='+bookId+'>'+ bookName+'</option>';
						$("#replaySelect").append(option);
					}
				}
			},
			error:function(){
				alert("加载笔记本列表异常");
			}
		});
	}
}

//弹出移动笔记对话框
function alertMoveNoteWindow() {
	$("#can").load("alert/alert_move.html");
	$(".opacity_bg").show();
	//获取请求参数
	var userId = getCookie("uid");
	loadBookName(userId);
}

//弹出删除对话框
function alertDeleteNoteWindow(){
	$("#can").load("alert/alert_delete_note.html");
	$(".opacity_bg").show();
}


//弹出创建笔记对话框
function alertAddNoteWindow(){
	//如果没有选中笔记本，提示
	//获取选中的笔记li元素
	var $a = $("#book_ul a.checked").parent();
	if($a.length==0){//没有选择笔记本
		alert("请选择一个笔记本")
	}else{//有选中笔记本，再弹出创建笔记对话框
		$("#can").load("alert/alert_note.html");
		$(".opacity_bg").show();
	}
}

//弹出重命名笔记本对话框
function alertRenameBookWindow(){
	$("#can").load("alert/alert_rename.html");
	$(".opacity_bg").show();
}

//弹出创建笔记本对话框
function alertAddBookWindow() {
		//弹出对话框alert_notebook.html
		$("#can").load("alert/alert_notebook.html");
		$(".opacity_bg").show();
}

//关闭对话框
function closeAlertWindow(){
	//关闭操作
	$("#can").empty();//清空对话框内容
	$(".opacity_bg").hide();//隐藏背景div
}

function createBookOption(bookId,bookName){
	var option = '<option value='+bookId+'>'+ bookName+'</option>';
	$("#moveSelect").append(option);
}

//加载笔记本信息
function loadBookName(userId){
	//检查格式
	if(userId==null){
		window.location.href="log_in.html";
	}else{
		//发送ajax请求
		$.ajax({
			url:base_path+"/book/loadbooks.do",
			type:"post",
			data:{"userId":userId},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					//获取返回的笔记本集合
					var books = result.data;
					for(var i=0;i<books.length;i++){
						var bookId = books[i].cn_notebook_id;//获取笔记本ID
						var bookName = books[i].cn_notebook_name;//获取笔记本的名称
						createBookOption(bookId,bookName);
					}
				}
			},
			error:function(){
				alert("加载笔记本列表异常");
			}
		});
	}
}
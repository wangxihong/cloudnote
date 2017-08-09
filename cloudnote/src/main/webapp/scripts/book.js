/**book.js 封装笔记本相关处理**/

//修改笔记本名字

function  renameBook(){
		var reName = $("#input_notebook_rename").val().trim();
		//获取选中笔记本的li元素
		var $li = $("#book_ul a.checked").parent();
		var bookId = $li.data("bookId");
		$.ajax({
			url:base_path+"/book/rename.do",
			type:"post",
			data:{"bookId":bookId,"reName":reName},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					closeAlertWindow();
					$("#book_ul").empty();
					loadUserBooks();
					alert(result.msg);					
				}
			},
			error:function(){
				alert("修改笔记本名失败");
			}
		});
	}

//创建笔记本

function addBook(){
		var userId = getCookie("uid");
		var name = $("#input_notebook").val().trim();
		//格式检查
		var ok = true;
		if(name==""){
			ok = false;
			$("#input_notebook_span").html("笔记本名不能为空");
		}
		if(userId==null){
			ok = false;
			window.location.href="log_in.html";
		}
		//发送Ajax请求
		if(ok){
			$.ajax({
				url:base_path+"/book/add.do",
				type:"post",
				data:{"userId":userId,"name":name},
				dataType:"json",
				success:function(result){
					if(result.status==0){
						//关闭对话框
						closeAlertWindow();
						var bookId = result.data.cn_notebook_id;
						var bookName = result.data.cn_notebook_name;
						createBookli(bookId,bookName);
						alert(result.msg);
					}
				},
				error:function(){
					alert("笔记创建失败");
				}
			});
		}
	}

//加载用户笔记本列表
function loadUserBooks(){
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
						createBookli(bookId,bookName);
					}
				}
			},
			error:function(){
				alert("加载笔记本列表异常");
			}
		});
	}
}

//创建笔记本列表的li元素
function createBookli(bookId,bookName){
	//构建列表li元素
	var sli = "";
	sli+='<li class="online">';
	sli+="	<a  >";
	sli+='		<i class="fa fa-book" title="online" rel="tooltip-bottom">';
	sli+='		</i>'+bookName;
	sli+='	</a>';
	sli+='</li>';
	//将bookId绑定到li元素上
	var $li = $(sli);
	$li.data("bookId",bookId);
	//将li元素添加到ul列表中
	$("#book_ul").append($li);
}

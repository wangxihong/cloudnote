/**note.js 封装笔记相关操作**/

//还原回收站内笔记
function replayRecycleBinNote(){
		var $li = $("#recylebin_ul a.checked").parent();
		var noteId = $li.data("noteId");
		//要还原如的笔记本ID
		var inBookId = $("#replaySelect").val();
		$.ajax({
			url:base_path+"/note/replaynote.do",
			type:"post",
			data:{"noteId":noteId,"inBookId":inBookId},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					//关闭窗口，删除li，提示还原成功
					closeAlertWindow();
					$li.remove();
					alert(result.msg);
				}
			},
			error:function(){
				alert("还原笔记失败");
			}
		});
	}

//彻底删除笔记
function deleteRecycleBinNote(){
		var $li = $("#recylebin_ul a.checked").parent();
		var noteId = $li.data("noteId");
		$.ajax({
			url:base_path+"/note/deleterollback.do",
			type:"post",
			data:{"noteId":noteId},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					//关闭窗口，删除li，提示删除成功
					closeAlertWindow();
					$li.remove();
					alert(result.msg);
					
				}
			},
			error:function(){
				alert("删除失败");
			}
		});
	}

//单击预览分享笔记
function PreviewShareNote(){
		//设置笔记选中状态
		$("#seeknote_ul a").removeClass("checked");
		$(this).find("a").addClass("checked");
		var $li = $(this);
		var shareId = $li.data("shareId");
		$.ajax({
			url:base_path+"/note/seeknote.do",
			type:"post",
			data:{"shareId":shareId},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					$("#pc_part_3").hide();
					$("#pc_part_5").show();
					$("#noput_note_title").html(result.data.cn_share_title);
					$(".clear_margin p").html(result.data.cn_share_body);
				}
			},
			error:function(){
				alert("预览失败");
			}
		});
	}

//搜索分享笔记
function SearchShareNote(event){
		var code = event.keyCode;
		if(code==13){//回车键
			//清除原有列表结果
			$("#pc_part_6 ul").empty();
			//显示搜索结果列表，其他列表隐藏
			$("#pc_part_2").hide();
			$("#pc_part_4").hide();
			$("#pc_part_6").show();
			$("#pc_part_7").hide();
			$("#pc_part_8").hide();
			//获取请求参数
			keyword = $("#search_note").val().trim();
			page = 1;//设置初始值1
			//发送ajax请求
			searchSharePage(keyword,page);
		}
	}

//回收站加载删除笔记
function RecycleBinNote(){		
		$("#pc_part_2").hide();
		$("#pc_part_4").show();
		$("#pc_part_6").hide();
		$("#pc_part_7").hide();
		$("#pc_part_8").hide();
		$.ajax({
			url:base_path+"/note/recycle_bin.do",
			type:"post",
			data:{},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					$("#recylebin_ul").empty();
					var notes = result.data;
					for(var i=0;i<notes.length;i++){
						var noteId = notes[i].cn_note_id;
						var noteTitle = notes[i].cn_note_title;
						sli = "";
						sli += '<li class="disable">';
						sli += '	<a>';
						sli += '		<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'; 
						sli += noteTitle;
						sli += '		<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button>'; 
						sli += '		<button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay"><i class="fa fa-reply"></i></button>'; 
						sli += '	</a>'; 
						sli += '</li>'; 
						//将noteId绑定到li元素上
						var $li = $(sli);
						$li.data("noteId",noteId);
						//将li元素添加到笔记列表ul中
						$("#recylebin_ul").append($li);
					}
				}
			},
			error:function(){
				alert("加载回收站列表失败");
			}
		});
	}

//分页加载搜索分享笔记
function searchSharePage(keyword,page){
	$.ajax({
		url:base_path+"/note/search_share.do",
		type:"post",
		data:{"keyword":keyword,"page":page},
		dataType:"json",
		success:function(result){
			if(result.status==0){
				//获取服务器返回的搜索结果
				var shares = result.data;			
				//循环解析生成列表li元素
				for(var i=0;i<shares.length;i++){
					var shareId = shares[i].cn_share_id;//分享ID
					var shareTitle = shares[i].cn_share_title;//分享标题
					//生成一个li							
					var sli = "";
					sli+='<li class="online">';
					sli+='	<a>';
					sli+='		<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>';
					sli+= shareTitle;
					sli+='			<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-star"></i></button>';
					sli+='	</a>';
					sli+='</li>';
					//添加到搜索结果ul中
					var $li = $(sli);
					$li.data("shareId",shareId);
					//将li元素添加到笔记列表ul中
					$("#pc_part_6 ul").append($li);
				}
				
			}
		},
		error:function(){
			alert("搜索异常");
		}
	});
}

//笔记分享
//TDOO 还要在分享的笔记后面做一个标记  修改cn_note_type_id
function shareNote(){
		var $li = $("#note_ul a.checked").parent();
		//var $li = $(this).parents("li");
		var noteId = $li.data("noteId");
		$.ajax({
			url:base_path+"/note/share.do",
			type:"post",
			data:{"noteId":noteId},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					//添加分享图标
					var img = '<i class="fa fa-sitemap"></i>';
					$li.find(".btn_slide_down").before(img);
					//提示成功
					alert(result.msg);
				}else{
					alert(result.msg);
				}
			},
			error:function(){
				alert("分享失败");
			}
		});					
}

//笔记移动
function moveNote(){
		//要转移笔记的笔记本Id
		var $liBook = $("#book_ul a.checked").parent();
		var outBookId = $liBook.data("bookId");
		//要转移笔记的Id
		var $liNote = $("#note_ul a.checked").parent();
		var noteId = $liNote.data("noteId");
		//要转入笔记的笔记本Id
		var inBookId = $("#moveSelect").val();
		//判断转入和转出的笔记本ID是否一样
		if(outBookId == inBookId){
			alert("要移入的笔记本和移出的笔记本相同");
		}else{
			$.ajax({
				url:base_path+"/note/move.do",
				type:"post",
				data:{"inBookId":inBookId,"noteId":noteId},
				dataType:"json",
				success:function(result){
					if(result.status==0){
						//关闭对话框
						closeAlertWindow();
						$liNote.remove();
						alert("转移笔记成功");
					}
				},
				error:function(){
					alert("转移笔记失败");
				}
			});
		}
		
}


//删除笔记
function deleteNote(){
		//获取选中笔记本的li元素
		var $li = $("#note_ul a.checked").parent();
		var noteId = $li.data("noteId");
		if(noteId.length>0){
			$.ajax({
				url:base_path+"/note/delete.do",
				type:"post",
				data:{"noteId":noteId},
				dataType:"json",
				success:function(result){
					if(result.status==0){
						//关闭对话框
						closeAlertWindow();
						$li.remove();
						alert(result.msg);
					}
				},
				error:function(){
					alert(noteId);
				}
			});
		}
	}

//隐藏笔记菜单
function hideNoteMenu(){
		$("#note_ul div").hide();
	}

//弹出笔记菜单
function popNoteMenu(){
		//隐藏笔记所有菜单
		$("#note_ul div").hide();
		//显示点击的笔记菜单
		var $menu = $(this).parent().next();
		$menu.slideDown(1000);//下拉显示1秒
		//设置点击笔记选中结果
		$("#note_ul a").removeClass("checked");
		$(this).parent().addClass("checked");
		//阻止事件向li,body冒泡
		return false;
	}

//创建新的笔记
function addNote(){
		var userId = getCookie("uid");
		var title = $("#input_noteId").val().trim();
		var $li = $("#book_ul a.checked").parent();
		var bookId = $li.data("bookId");
		var ok = true;
		if(title==""){
			ok = false;
			$("#input_notespan").html("笔记名不能为空");
		}
		if(ok){
			$.ajax({
				url:base_path+"/note/add.do",
				type:"post",
				data:{"bookId":bookId,"title":title,"userId":userId},
				dataType:"json",
				success:function(result){
					if(result.status==0){
					//关闭对话框
					closeAlertWindow();
					//生成笔记列表
					var noteId = result.data.cn_note_id;
					var noteTitle = result.data.cn_note_title;
					createNoteli(noteId,noteTitle);
					//弹出提示
					alert(result.msg);
					}
				},
				error:function(){
					alert("创建笔记失败");
				}
			});
		}
	}

//"保存笔记"按钮的处理
function updateNote(){
		//获取请求参数
		var title = $("#input_note_title").val().trim();//获取标题内容
		var body = um.getContent();
		//获取选中的笔记li元素
		var $li = $("#note_ul a.checked").parent();
		var noteId = $li.data("noteId");
		//清除上次提示信息
		$("#note_title_span").html("");
		//检查格式
		if($li.length==0){//没有选择的笔记
			alert("请选择要保存的笔记")
		}else if(title==""){
			//有选中的笔记
			//检查笔记标题是否为空
			$("#note_title_span").html("<font color='red'>标题不能为空<font>");
		}else{
			$.ajax({
				url:base_path+"/note/update.do",
				type:"post",
				data:{"noteId":noteId,"title":title,"body":body},
				dataType:"json",
				success:function(result){
					if(result.status==0){
						//更新列表li中标题
						var sli = "";
						sli+='		<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>';
						sli+= title;
						sli+='			<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>';
						//将选择li元素的a内容替换
						$li.find("a").html(sli);
						//提示成功
						alert(result.msg);
					}
				},
				error:function(){
					alert("保存笔记异常");
				}
			});
		}
	}
//根据笔记ID加载笔记信息
function loadNote(){
		//隐藏预览框，显示编辑框
		$("#pc_part_5").hide();
		$("#pc_part_3").show();
		//设置笔记选中状态
		$("#note_ul a").removeClass("checked");
		$(this).find("a").addClass("checked");
		//获取请求参数
		var noteId = $(this).data("noteId");
		//发送ajax请求
		$.ajax({
			url:base_path+"/note/load.do",
			type:"post",
			data:{"noteId":noteId},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					//获取笔记标题
					var title = result.data.cn_note_title;
					//获取笔记内容
					var body = result.data.cn_note_body;
					//设置到编辑区域
					$("#input_note_title").val(title);
					um.setContent(body);
				}
			},
			error:function(){
				alert("加载笔记异常");
			}
		});
	}
//根据笔记本ID加载笔记列表
function loadBookNotes(){
		//切换列表显示
		$("#pc_part_2").show();
		$("#pc_part_4").hide();
		$("#pc_part_6").hide();
		$("#pc_part_7").hide();
		$("#pc_part_8").hide();
		//设置笔记本li选中效果
		$("#book_ul a").removeClass("checked");//去除a上的checked样式
		$(this).find("a").addClass("checked");//为选择选中的a加上checked样式
		//获取请求参数
		var bookId = $(this).data("bookId");
		//发送ajax请求
		$.ajax({
			url:base_path+"/note/loadnotes.do",
			type:"post",
			data:{"bookId":bookId},
			dataType:"json",
			success:function(result){
				if(result.status==0){
					//清空原有笔记列表
					//$("#note_ul").empty();
					$("#note_ul li").remove();
					//获取服务器返货的笔记集合信息
					var notes = result.data;
					//循环生成笔记li元素
					for(var i=0;i<notes.length;i++){
						var noteId = notes[i].cn_note_id;
						var noteTitle = notes[i].cn_note_title;
						//创建一个笔记li元素
						createNoteli(noteId,noteTitle);
						//将新添加的元素是否该加分享图标
						var typeId = notes[i].cn_note_type_id;
						if(typeId=='2'){//加分享图标
							var img = '<i class="fa fa-sitemap"></i>';
							//获取新添加的li元素
							var $li = $("#note_ul li:last");
							$li.find(".btn_slide_down").before(img);
						}
					}
				}				
			},
			error:function(){
				alert("笔记列表加载失败");
			}
		});
	}

function createNoteli(noteId,noteTitle){
	var sli = "";
	sli+='<li class="online">';
	sli+='	<a>';
	sli+='		<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>';
	sli+= noteTitle;
	sli+='			<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>';
	sli+='	</a>';
	sli+='	<div class="note_menu" tabindex="-1">';
	sli+='		<dl>';
	sli+='			<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt>';
	sli+='			<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>';
	sli+='			<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>';
	sli+='		</dl>';
	sli+='	</div>';
	sli+='</li>';
	//将noteId绑定到li元素上
	var $li = $(sli);
	$li.data("noteId",noteId);
	//将li元素添加到笔记列表ul中
	$("#note_ul").append($li);
}
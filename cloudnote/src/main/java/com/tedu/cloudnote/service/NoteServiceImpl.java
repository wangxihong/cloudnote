package com.tedu.cloudnote.service;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tedu.cloudnote.dao.NoteDao;
import com.tedu.cloudnote.dao.ShareDao;
import com.tedu.cloudnote.entity.Note;
import com.tedu.cloudnote.entity.Share;
import com.tedu.cloudnote.util.NoteResult;
import com.tedu.cloudnote.util.NoteUtil;

@Service("noteService")
public class NoteServiceImpl implements NoteService{

	@Resource
	private NoteDao noteDao;
	@Resource
	private ShareDao shareDao;
	
	public NoteResult loadBookNotes(String bookId) {
		//根据笔记本ID加载笔记
		List<Note> list = noteDao.findByBookId(bookId);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("加载笔记列表成功");
		result.setData(list);
		return result;
	}

	public NoteResult loadNote(String noteId) {
		//根据笔记id加载笔记
		Note note = noteDao.findById(noteId);
		//加载笔记
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("加载笔记成功");
		result.setData(note);
		return result;
	}

	public NoteResult updataNote(String noteId, String body,String title) {
		//修改笔记
		Note note = new Note();
		note.setCn_note_body(body);
		note.setCn_note_id(noteId);
		note.setCn_note_title(title);
		note.setCn_note_last_modify_time(System.currentTimeMillis());
		//int rows = noteDao.updateNote(note);
		int rows = noteDao.dynamicUpdate(note);
		//�������ؽ��
		NoteResult result = new NoteResult();
		if(rows==1){//修改笔记成功
			result.setStatus(0);
			result.setMsg("修改笔记成功");
		}else{//修改笔记失败
			result.setStatus(1);
			result.setMsg("修改笔记失败");
		}
		return result;
	}

	public NoteResult save(String bookId, String title, String userId) {
		Note note = new Note();
		note.setCn_note_last_modify_time(System.currentTimeMillis());
		note.setCn_note_create_time(System.currentTimeMillis());
		note.setCn_note_id(NoteUtil.createId());
		note.setCn_note_title(title);
		note.setCn_user_id(userId);
		note.setCn_notebook_id(bookId);
		noteDao.save(note);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("添加笔记成功");
		result.setData(note);
		return result;
	}

	public NoteResult deleteNote(String noteId) {
		//noteDao.updateStatus(noteId);
		Note note = new Note();
		note.setCn_note_id(noteId);
		note.setCn_note_status_id("2");
		noteDao.dynamicUpdate(note);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("删除笔记成功");
		return result;
	}

	public NoteResult moveNote(String inBookId,String noteId) {
		Note note = new Note();
		note.setCn_note_id(noteId);
		note.setCn_notebook_id(inBookId);
		noteDao.dynamicUpdate(note);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("转移笔记成功");
		return result;
	}

	public NoteResult shareNote(String noteId) {
		//获取笔记信息
		Note note = noteDao.findById(noteId);
		NoteResult result = new NoteResult();
		String typeId = note.getCn_note_type_id();
		//检查cn_note_type_id是否为分享状态'2'
		if("2".equals(typeId)){
			result.setStatus(1);
			result.setMsg("该笔记已经为分享状态");
			return result;
		}
		//更新笔记的cn_note_type_id为分享状态'2'
		//noteDao.updateTypeId(noteId);
		note.setCn_note_type_id("2");
		noteDao.dynamicUpdate(note);
		//添加到分享表
		Share share = new Share();
		share.setCn_share_body(note.getCn_note_body());
		share.setCn_share_title(note.getCn_note_title());
		share.setCn_note_id(noteId);
		share.setCn_share_id(NoteUtil.createId());
		shareDao.save(share);
		result.setStatus(0);
		result.setMsg("分享笔记成功");
		return result;
	}

	public NoteResult searchShareNote(String keyword,int page) {
		//处理查询条件
		String title = "%";
		if(keyword!=null && !"".equals(keyword)){
			title = "%"+keyword+"%";
		}
		//计算抓取记录的起点
		if(page<1){
			page = 1;
		}
		int begin = (page-1)*5;
		//封装成Map参数
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("begin", begin);//对应#{begin}
		params.put("keyword", title);//对应#{keyword}
		NoteResult result = new NoteResult();
		List<Share> shares = shareDao.findLikeTitle(params);
		if(shares.size()>0){
			result.setStatus(0);
			result.setMsg("查询成功");
			result.setData(shares);
			return result;
		}
		result.setStatus(1);
		result.setMsg("查无此类型笔记");
		return result;
	}

	public NoteResult seekShareNote(String shareId) {
		Share share = shareDao.findByShareId(shareId); 
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("预览成功");
		result.setData(share);
		return result;
	}

	//回收站列表加载
	public NoteResult recycleBinNote() {
		List<Note> notes = noteDao.findByStatus();
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("回收站笔记列表加载成功");
		result.setData(notes);
		return result;
	}

	public NoteResult deleteRecyckeBinNote(String noteId) {
		noteDao.deleteNote(noteId);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("删除成功");
		return result;
	}

	public NoteResult replayNote(String noteId, String inBookId) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("noteId", noteId);
		map.put("inBookId", inBookId);
		noteDao.updateStatus2(map);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("还原成功");
		return result;
	}

	public NoteResult searchNotes(String title, String status, String beginStr, String endStr) {
		//创建查询参数
		//标题
		Map<String,Object> params = new HashMap<String,Object>();
		if(title!=null && !"".equals(title)){
			//对应SQL中的#{title}
			params.put("title", "%"+title+"%");
		}
		//状态，如果不是全部选项"0"
		if(!"0".equals(status)){
			//对应SQL中的#{status}
			params.put("status", status);
		}
		//起始时间
		if(beginStr!=null && !"".equals(beginStr)){
			//对应SQL中的#{begin}
			Date beginDate = Date.valueOf(beginStr);
			params.put("begin", beginDate.getTime());
		}
		//结束日期
		if(endStr!=null && !"".equals(endStr)){
			//对应SQL中的#{end}
			Date endDate = Date.valueOf(endStr);
			params.put("end", endDate.getTime());
		}
		//根据参数查询笔记信息
		List<Note> list = noteDao.findNotes(params);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("查询成功");
		result.setData(list);
		return result;
	}

	

}

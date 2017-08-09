package com.tedu.cloudnote.dao;

import java.util.List;
import java.util.Map;

import com.tedu.cloudnote.entity.Note;


public interface NoteDao {

	public  int batchDelete(String[] ids);
	public int dynamicUpdate(Note note);
	public List<Note> findByBookId(String id);
	public Note findById(String noteId);
//	public int updateNote(Note note);
	public void save(Note note);
//	public void updateStatus(String cn_note_id);
//	public void updateBookId(Note note);
//	public void updateTypeId(String noteId);
	public List<Note> findByStatus();
	public void deleteNote(String noteId);
	public void updateStatus2(Map<String,Object> map);
	public List<Note> findNotes(Map params);
} 

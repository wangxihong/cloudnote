package com.tedu.cloudnote.service;

import com.tedu.cloudnote.util.NoteResult;

public interface NoteService {

	public NoteResult loadNote(String noteId);
	public NoteResult loadBookNotes(String bookId);
	public NoteResult updataNote(String noteId,String body,String title);
	public NoteResult save(String bookId,String title,String userId);
	public NoteResult deleteNote(String noteId);
	public NoteResult moveNote(String inBookId,String noteId);
	public NoteResult shareNote(String noteId);
	public NoteResult searchShareNote(String keyword,int page);
	public NoteResult seekShareNote(String shareId);
	public NoteResult recycleBinNote();
	public NoteResult deleteRecyckeBinNote(String noteId);
	public NoteResult replayNote(String noteId,String inBookId);
	public NoteResult searchNotes(String title,String status,String beginStr,String endStr);
}

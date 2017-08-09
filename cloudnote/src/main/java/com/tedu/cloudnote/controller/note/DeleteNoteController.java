package com.tedu.cloudnote.controller.note;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tedu.cloudnote.service.NoteService;
import com.tedu.cloudnote.util.NoteResult;

@Controller
public class DeleteNoteController {

	@Resource
	private NoteService noteService;
	
	@RequestMapping("/note/delete.do")
	@ResponseBody
	public NoteResult excetue(String noteId){
		NoteResult result = noteService.deleteNote(noteId);
		return result;	
	}
}

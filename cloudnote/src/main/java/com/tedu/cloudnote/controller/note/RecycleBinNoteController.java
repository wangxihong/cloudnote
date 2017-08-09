package com.tedu.cloudnote.controller.note;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tedu.cloudnote.service.NoteService;
import com.tedu.cloudnote.util.NoteResult;

@Controller
public class RecycleBinNoteController {

	@Resource
	private NoteService noteService;
	
	@RequestMapping("/note/recycle_bin.do")
	@ResponseBody
	public NoteResult execute(){
		NoteResult result = noteService.recycleBinNote();
		return result;		
	}
}

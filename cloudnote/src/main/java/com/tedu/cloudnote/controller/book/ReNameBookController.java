package com.tedu.cloudnote.controller.book;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tedu.cloudnote.service.BookService;
import com.tedu.cloudnote.util.NoteResult;

@Controller
public class ReNameBookController {

	@Resource
	private BookService bookService;
	
	@RequestMapping("/book/rename.do")
	@ResponseBody
	public NoteResult execute(String bookId,String reName){
		NoteResult result = bookService.reName(bookId, reName);
		return result;
	}
}

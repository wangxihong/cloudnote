package com.tedu.cloudnote.service;

import java.sql.Timestamp;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tedu.cloudnote.dao.BookDao;
import com.tedu.cloudnote.entity.Book;
import com.tedu.cloudnote.util.NoteResult;
import com.tedu.cloudnote.util.NoteUtil;

@Service("bookService")
public class BookServiceImpl implements BookService{

	@Resource
	private BookDao bookDao;
	
	public NoteResult loadUserBooks(String userId) {
		//根据用户ID加载笔记本列表
		List<Book> list = bookDao.findByUserId(userId);
		//�������ؽ��
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("加载笔记本列表成功");
		result.setData(list);
		return result;
	}

	public NoteResult addBook(String userId,String name) {
		Book book = new Book();
		book.setCn_user_id(userId);
		book.setCn_notebook_name(name);
		book.setCn_notebook_id(NoteUtil.createId());
		Timestamp time = new Timestamp(System.currentTimeMillis());
		book.setCn_notebook_createtime(time);
		bookDao.save(book);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("新建笔记本成功");
		result.setData(book);//返回新建笔记本信息
		return result;
	}

	public NoteResult reName(String bookId, String reName) {
		Book book = new Book();
		book.setCn_notebook_id(bookId);
		book.setCn_notebook_name(reName);
		bookDao.reName(book);
		NoteResult result = new NoteResult();
		result.setStatus(0);
		result.setMsg("修改笔记本名成功");
		result.setData(reName);
		return result;
	}

}

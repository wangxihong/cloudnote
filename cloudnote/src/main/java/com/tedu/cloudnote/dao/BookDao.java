package com.tedu.cloudnote.dao;

import java.util.List;

import com.tedu.cloudnote.entity.Book;

public interface BookDao {

	public List<Book> findByUserId(String cn_user_id);
	public void save(Book book);
	public void reName(Book Book);
}

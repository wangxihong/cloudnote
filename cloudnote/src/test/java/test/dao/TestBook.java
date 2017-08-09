package test.dao;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.Test;

import com.tedu.cloudnote.dao.BookDao;
import com.tedu.cloudnote.entity.Book;
import com.tedu.cloudnote.util.NoteUtil;

public class TestBook extends BaseTest{
	
	@Test
	public void test1(){
		BookDao dao = ac.getBean("bookDao",BookDao.class);
		List<Book> books = dao.findByUserId("39295a3d-cc9b-42b4-b206-a2e7fab7e77c");
		System.out.println(books.toString());
		for(Book l: books){
			System.out.println(l.getCn_notebook_createtime());
		}
		Timestamp d = new Timestamp(System.currentTimeMillis()); 
		System.out.println(d);
	}
	
	@Test
	public void test2(){
		BookDao dao = ac.getBean("bookDao",BookDao.class);
		Book book = new Book();
		book.setCn_user_id("39295a3d-cc9b-42b4-b206-a2e7fab7e77c");
		book.setCn_notebook_type_id("123456");
		String s = NoteUtil.createId();
		book.setCn_notebook_id(s);
		System.out.println(s);
		book.setCn_notebook_name("ÍõÎ÷ºê");
		book.setCn_notebook_desc("text");
		Timestamp d = new Timestamp(System.currentTimeMillis()); 
		System.out.println(d);
		book.setCn_notebook_createtime(d);
		dao.save(book);
	}
}

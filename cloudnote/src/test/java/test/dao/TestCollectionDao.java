package test.dao;

import java.util.List;

import org.junit.Test;

import com.tedu.cloudnote.dao.CollectionDao;
import com.tedu.cloudnote.entity.Book;
import com.tedu.cloudnote.entity.User;

public class TestCollectionDao extends BaseTest{

	@Test
	public void test() {
		CollectionDao dao =ac.getBean("collectionDao",CollectionDao.class);
		User user = dao.findById("52f9b276-38ee-447f-a3aa-0d54e7a736e4");
		System.out.println("用户名："+user.getCn_user_name());
		System.out.println("拥有笔记本");
		for(Book book:user.getBooks()){
			System.out.println("=="+book.getCn_notebook_name());
		}
	}
	
	@Test
	public void test2() {
		CollectionDao dao =ac.getBean("collectionDao",CollectionDao.class);
		List<User> list = dao.findAllUser();		
		for(User user:list){
			//将用户笔记本名拼一个字符串
			String bookNames = "";
			for(Book book:user.getBooks()){
				bookNames += book.getCn_notebook_name(); 
				bookNames += ",";
			}
			//打印用户名，笔记本数量，笔记本名
			System.out.println(user.getCn_user_name()+":"+
					user.getBooks().size()+":"+
					bookNames);
		}
	}
}
package test.dao;

import org.junit.Test;

import com.tedu.cloudnote.dao.NoteDao;

public class TestBatchDelete extends BaseTest{

	@Test
	public void test(){
		NoteDao noteDao = ac.getBean("noteDao",NoteDao.class);
		String[] ids = {"fsaf-as-df-asdf-as-df-dsa",
						"ss19055-30e8-4cdc-bfac-97c6bad9518f"};
		int rows = noteDao.batchDelete(ids);
		System.out.println("删除的记录行数："+rows);
	}
}

package test.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.tedu.cloudnote.dao.ShareDao;
import com.tedu.cloudnote.entity.Share;

public class TestShareDao {

	public ApplicationContext ac;
	
	@Before
	public void init() {
		String[] conf = {"conf/spring-mvc.xml","conf/spring-mybatis.xml"};
		ac = new ClassPathXmlApplicationContext(conf);
	}
	
	@Test
	public void test1(){
		ShareDao dao = ac.getBean("shareDao",ShareDao.class);
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("begin", 0);//对应#{begin}
		params.put("keyword", "%");//对应#{keyword}
		List<Share> shares = dao.findLikeTitle(params);
		for(Share s:shares){
			System.out.println(s.getCn_note_id());
		}
	}
}

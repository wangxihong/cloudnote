package test.service;

import org.junit.Test;

import com.tedu.cloudnote.service.UserService;
import com.tedu.cloudnote.util.NoteResult;

public class TestAddUser extends BaseTest{

	@Test
	public void test1() {
		UserService service = ac.getBean("userService",UserService.class);
		NoteResult result = service.addUser("zhoujia", "demo", "123");
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
		System.out.println(result.getData());
	}
}

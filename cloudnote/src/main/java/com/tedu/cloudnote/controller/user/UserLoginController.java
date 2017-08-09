package com.tedu.cloudnote.controller.user;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tedu.cloudnote.service.UserService;
import com.tedu.cloudnote.util.NoteResult;
@Controller//扫描
@RequestMapping("/user")
public class UserLoginController {

	@Resource//注入
	private UserService userService;
	
	@RequestMapping("/login.do")
	@ResponseBody//JSON输出
	public NoteResult execute(String name,String password) {
		//调用UserService处理
		NoteResult result = userService.checkLogin(name, password);
		return result;
	}
}

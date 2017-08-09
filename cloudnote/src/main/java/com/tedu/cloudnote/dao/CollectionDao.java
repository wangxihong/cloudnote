package com.tedu.cloudnote.dao;

import java.util.List;

import com.tedu.cloudnote.entity.User;

public interface CollectionDao {

	public User findById(String userId);
	public List<User> findAllUser();
}

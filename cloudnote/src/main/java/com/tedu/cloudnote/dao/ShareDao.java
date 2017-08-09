package com.tedu.cloudnote.dao;

import java.util.List;
import java.util.Map;

import com.tedu.cloudnote.entity.Share;

public interface ShareDao {

	public void save(Share share);
	public List<Share> findLikeTitle(Map<String,Object> params);
	public Share findByShareId(String shareId);
}

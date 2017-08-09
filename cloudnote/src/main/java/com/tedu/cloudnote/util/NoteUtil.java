package com.tedu.cloudnote.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import org.apache.tomcat.util.codec.binary.Base64;

public class NoteUtil {

	public static String createId() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString().replace("-", "");
	}
	/**
	 * �������src���ܴ���
	 * @param src �����ַ���
	 * @return ���ܺ���ַ������
	 * @throws NoSuchAlgorithmException 
	 */
	public static String md5(String src) throws NoSuchAlgorithmException {
		//���ַ�����Ϣ����MD5����
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] output = md.digest(src.getBytes());
		//��MD5����������Base64ת���ַ���
		String s = Base64.encodeBase64String(output);
		return s;
	}
	
	public static void main(String[] arg) throws Exception {
		System.out.println(md5("123"));
//		System.out.println(md5("123456"));
//		System.out.println(createId());
//		System.out.println(createId());
	}
}

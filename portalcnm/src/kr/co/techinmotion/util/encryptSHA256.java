package kr.co.techinmotion.util;

import java.security.MessageDigest;

public class encryptSHA256 {
	public encryptSHA256(){}
	
	public String encryptSHA256(String data) throws Exception {
		if(data == null){
			throw new NullPointerException();
		}
		
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		byte[] raw = md.digest(data.getBytes("EUC-KR"));
		
		StringBuffer result = new StringBuffer();
		for(int i=0; i<raw.length; i++){
			result.append(Integer.toHexString(raw[i] & 0xff));
		}
		
		return result.toString();
	}
}

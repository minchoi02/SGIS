package kostat.lbdms.ServiceAPI.common.security;

import java.security.MessageDigest;

import javax.xml.bind.DatatypeConverter;

 /**
 * <p>FileName   : EncryptUtil.java </p>
 * <p>Title      : EncryptUtil </p>
 * <p>Copyright  : Copyright (c) 2018 </p>
 * @author JHLEE
 */

public class EncryptUtil {

	/**
	 * 비밀번호를 SHA 알고리즘을 이용하여 암호화 ( JAVA 1.6 버전 이상 )
	 */
	public static String encryptPassword( String salt, String password ) throws Exception {

		if( password == null )
		    return "";

		byte[] hashValue = null; // 해쉬 값
		String strHashValue = null; // 해쉬 값

		MessageDigest md = MessageDigest.getInstance( "SHA-256" );
				
		md.reset();
		md.update( salt.getBytes() );

		hashValue = md.digest( password.getBytes( "UTF-8" ) );
		strHashValue = DatatypeConverter.printHexBinary( hashValue ).toUpperCase();
				
		return strHashValue;
    }
	
	/**
	 * 비밀번호를 SHA 알고리즘을 이용하여 암호화 ( JAVA 버전 상관 X )
	 */
	public static String encryptPasswordX( String salt, String password ) throws Exception {

		if( password == null )
		    return "";

		byte[] hashValue = null; // 해쉬 값
		String strHashValue = null; // 해쉬 값

		MessageDigest md = MessageDigest.getInstance( "SHA-256" );
		
		md.reset();
		md.update( salt.getBytes() );

		hashValue = md.digest( password.getBytes( "UTF-8" ) );
		strHashValue = byteArrayToHex( hashValue );
		
		if( strHashValue != null )
			strHashValue = strHashValue.toUpperCase();
				
		return strHashValue;
    }
	 
	/**
	 * SHA 암호화 비밀번호 비교
	 * @param preEncPassword : 이전 SHA 암호화된 패스워드
	 */
	public static boolean compareEncryptPassword( String salt, String password, String preEncPassword ) throws Exception {

		boolean rtnFlag = false;
		String newEncPassword = null;
		
		// 비밀번호 SHA 암호화
		newEncPassword = encryptPassword( salt, password );
		
		if( newEncPassword != null && preEncPassword != null ) {
			if( newEncPassword.equalsIgnoreCase( preEncPassword ) )
				rtnFlag = true;
		}
		
		return rtnFlag;
    }
	
	/**
	 * byte[]를 hex 문자열 값으로 변환
	 */
	public static String byteArrayToHex( byte[] byteArr ) {
		
		if( byteArr == null || byteArr.length == 0 )
			return null;
		
		StringBuffer sb = new StringBuffer();
		String hexNum = "";
		for( int i = 0; i < byteArr.length; i++ ) {
			hexNum = "0" + Integer.toHexString( 0xff & byteArr[i] );
			sb.append( hexNum.substring( hexNum.length() - 2, hexNum.length() ) );
		}
		
		return sb.toString();
	}
	
}


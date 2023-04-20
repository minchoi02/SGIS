package kostat.lbdms.ServiceAPI.common.web.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import Decoder.BASE64Decoder;
import Decoder.BASE64Encoder;
import kostat.lbdms.ServiceAPI.common.web.core.UserAuthCode;
import kostat.lbdms.ServiceAPI.controller.model.system.LoginVO;
import kostat.lbdms.ServiceAPI.controller.model.system.MemberVO;

/**  
* <pre>
* 로그인 관련 유틸
* </pre>
*
* @author        Admin
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      Admin                        최초생성
* </pre>
*/

@SuppressWarnings("restriction")
public class LoginUtil {
	private static final Logger logger = LoggerFactory.getLogger(LoginUtil.class);
	
	/**
	 * <pre>
	 * 암호화
	 * </pre>
	 * @param text
	 * @return String
	 */	
    public static String Encrypt(String text) 
    {
    	Cipher cipher;
    	byte[] results =  null;
    	BASE64Encoder encoder = new BASE64Encoder();
    	try {
    		cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    		byte[] keyBytes= new byte[16];
    		byte[] b= ConfigUtil.getString("keystore.key").getBytes("UTF-8");
    		int len= b.length;
    		if (len > keyBytes.length) len = keyBytes.length;
    		System.arraycopy(b, 0, keyBytes, 0, len);
    		SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
    		IvParameterSpec ivSpec = new IvParameterSpec(keyBytes);
    		cipher.init(Cipher.ENCRYPT_MODE,keySpec,ivSpec);
    		results = cipher.doFinal(text.getBytes("UTF-8"));
    	} catch (UnsupportedEncodingException e) {
    		logger.info(e.getMessage()); 
    	} catch (NoSuchAlgorithmException e) {
    		logger.info(e.getMessage()); 
    	} catch (NoSuchPaddingException e) {
    		logger.info(e.getMessage()); 
    	} catch (InvalidKeyException e) {
    		logger.info(e.getMessage()); 
    	} catch (InvalidAlgorithmParameterException e) {
    		logger.info(e.getMessage()); 
    	} catch (IllegalBlockSizeException e) {
    		logger.info(e.getMessage()); 
    	} catch (BadPaddingException e) {
    		logger.info(e.getMessage()); 
    	}
    	return encoder.encode(results);
    }	
	
	/**
	 * <pre>
	 * 복호화
	 * </pre>
	 * @param text 
	 * @return String
	 */	
    public static String Decrypt(String text)
    {
    	String resultStr = "";
    	
    	if ( text == null ) return resultStr;
    	
    	try {
    		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    		byte[] keyBytes= new byte[16];
    		byte[] b= ConfigUtil.getString("keystore.key").getBytes("UTF-8");
    		int len= b.length;
    		if (len > keyBytes.length) len = keyBytes.length;
    		System.arraycopy(b, 0, keyBytes, 0, len);
    		SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
    		IvParameterSpec ivSpec = new IvParameterSpec(keyBytes);
    		cipher.init(Cipher.DECRYPT_MODE,keySpec,ivSpec);

    		BASE64Decoder decoder = new BASE64Decoder();
    		byte [] results = cipher.doFinal(decoder.decodeBuffer(text));
    		resultStr = new String(results,"UTF-8");
    	} catch (UnsupportedEncodingException e) {
    		logger.info(e.getMessage()); 
    	} catch (NoSuchAlgorithmException e) {
    		logger.info(e.getMessage()); 
    	} catch (NoSuchPaddingException e) {
    		logger.info(e.getMessage()); 
    	} catch (InvalidKeyException e) {
    		logger.info(e.getMessage()); 
    	} catch (InvalidAlgorithmParameterException e) {
    		logger.info(e.getMessage()); 
    	} catch (IllegalBlockSizeException e) {
    		logger.info(e.getMessage()); 
    	} catch (BadPaddingException e) {
    		logger.info(e.getMessage()); 
    	} catch (IOException e) {
    		logger.info(e.getMessage()); 
		}              
    	return resultStr;
    }
    
	/**
	 * <pre>
	 * 패스워드 해시리턴
	 * </pre>
	 * @param id 
	 * @return pw  
	 */	
	public static String toHash(String id, String pw){
		String str = "kdsjfksdaj*fSADJifi_r9i4Uv49328jfkdsj" + id + "fkasDJFAj%sdS$adfjaSdk9594354fj" + pw + "!gkrrywwhddlEodEod";
		String SHA = ""; 
		try{
			MessageDigest sh = MessageDigest.getInstance("SHA-256"); 
			sh.update(str.getBytes()); 
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer(); 
			for(int i = 0 ; i < byteData.length ; i++){
				sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
			}
			SHA = sb.toString();
			
		}catch(NoSuchAlgorithmException e){
			SHA = null; 
		}
		return SHA;
	}
	

	/**
	 * <pre>
	 * 로그인한 사용자의 권한이 관리자일 경우 true 반환
	 * </pre>
	 * @param HttpServletRequest ( request )
	 * @return boolean 관리자 여부  
	 */
	public static boolean isAdmin( HttpServletRequest request ) {
		String userAuthCode = LoginUtil.getLoginUserDiv(request);
		
		// 내부 사용자나 외부 사용자인 경우 메뉴 코드 권한은 User 권한으로 설정 
		if ( userAuthCode.equalsIgnoreCase( UserAuthCode.INNER_USER )
				|| userAuthCode.equalsIgnoreCase( UserAuthCode.EXTERNAL_USER ) ){
			
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * 로그인 사용자 아이디 조회
	 * @param request
	 * @return
	 */
	public static String getLoginUserID( HttpServletRequest request ){
		
		MemberVO member = getLoginUser( request );
		if( member != null ){
			return member.getUser_id();
		}
		return "";
	}
	
	/**
	 * 로그인 사용자 권한 조회
	 * @param request
	 * @return
	 */
	public static String getLoginUserDiv( HttpServletRequest request ){
		
		MemberVO member = LoginUtil.getLoginUser(request);
		if ( member != null ){
			String userAuthCode = member.getUser_div();
			if( userAuthCode == null ){
				userAuthCode = UserAuthCode.INNER_USER;
			}
			return userAuthCode;
		}
		return UserAuthCode.INNER_USER;
	}
	
	/**
	 * <pre>
	 * 세션에서 로그인한 정보를 반환한다
	 * </pre>
	 * @param HttpServletRequest ( request )
	 * @return LoginVO 로그인 정보
	 */
	public static LoginVO getLogin( HttpServletRequest request ){
		if ( SessionUtil.getAttribute( request, WebAttrKey.LOGIN_INFO ) != null ){
			return (LoginVO)SessionUtil.getAttribute( request, WebAttrKey.LOGIN_INFO );
		}
		return null;
	}
	
	/**
	 * <pre>
	 * 로그인 여부를 조회한다
	 * </pre>
	 * @param HttpServletRequest ( request ) 
	 * @return boolean 로그인 여부 
	 */
	public static boolean isLogin(HttpServletRequest request) {
		return SessionUtil.getAttribute(request, "user_id" ) != null;
	}
	
	/**
	 * 로그인 사용자  조회
	 * @param request
	 * @return
	 */
	public static MemberVO getLoginUser( HttpServletRequest request ){
		
		LoginVO login = getLogin( request );
		
		if ( login != null ){
			if ( login.getMember() != null ) {
				return login.getMember();
			}
		}
		
		return null;
	}
}
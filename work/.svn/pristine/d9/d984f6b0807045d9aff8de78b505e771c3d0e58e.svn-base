package kostat.lbdms.ServiceAPI.common.security;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Properties;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import Decoder.BASE64Decoder;
import Decoder.BASE64Encoder;
/*import kostat.lbdms.ServiceAPI.api.stats.FusionStats;*/
import kostat.lbdms.ServiceAPI.common.util.StringUtil;

/**
 * 1. 기능 : 해시함수 관리 클래스.
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/18  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see <p/>
 */
public class Security {
	private static final Log logger = LogFactory.getLog(Security.class);
	public Security() {

	}
	
	private static final String PROPERTY_PATH = "/globals.properties";
	
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

	public static String toSHA256(String str) {
		String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(str.getBytes());
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16)
						.substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			//2015-12-03 시큐어코딩
			//e.printStackTrace();
			logger.info(StringUtil.getErrMsg()+e);
			SHA = null;
		}
		return SHA;
	}

	public static String sqlInjectionCheck(String str) {
		// TODO Auto-generated method stub
		if (str != null) {
			// string 객체 생성
			String filerStr = new String(str);
			// injection array
			String[] arr = { "\'", ":", ";", "--", "exec", "drop", "update",
					"delete", "select", "insert", "create", "sp_", "xp_" };

			// string에 포함된 injection을 ""로 대체
			for (int i = 0; i < arr.length; i++) {
				filerStr = filerStr.replaceAll(arr[i], "");
			}

			return filerStr;
		} else
			return str;

	}
	
	public static String cleanXss(String value) {
		// TODO Auto-generated method stub
		if (value != null) {
			value = value.replaceAll("&", "&amp;");
			value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			value = value.replaceAll("#", "&#35");
			value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
			value = value.replaceAll("'", "&#39;");
			value = value.replaceAll("\"", "&quot;");

			value = value.replaceAll("eval\\((.*)\\)", "");
			value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
			value = value.replaceAll("script", "");
	        return value;
		} else
			return value;

	}
	
	/**
	 * IP가져오기
	 * @param request
	 * @param response
	 */
	public static String getRemoteAddr(HttpServletRequest request) {
        String ip = null;
        ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("WL-Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_CLIENT_IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("X-Real-IP"); 
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("X-RealIP"); 
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("REMOTE_ADDR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getRemoteAddr(); 
        }
        return ip;
    }
	
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
    		
    		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String key = props.getProperty("Globals.Aes.key");
    		
    		cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    		byte[] keyBytes= new byte[16];
    		byte[] b= key.getBytes("UTF-8");
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
    	} catch (IOException e) {
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
    		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			String key = props.getProperty("Globals.Aes.key");
			
    		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    		byte[] keyBytes= new byte[16];
    		byte[] b= key.getBytes("UTF-8");
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
}

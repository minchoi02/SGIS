package kostat.sop.ServiceAPI.common.security;

import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * 1. 기능 : 해시함수 관리 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/18  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
public class Security
{

    public Security()
    {
    	
    }

    public static Key generateKey(String algorithm, byte keyData[])
        throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException
    {
        String upper = algorithm.toUpperCase();
        if("DES".equals(upper))
        {
            java.security.spec.KeySpec keySpec = new DESKeySpec(keyData);
            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(algorithm);
            javax.crypto.SecretKey secretKey = secretKeyFactory.generateSecret(keySpec);
            return secretKey;
        }
        if("DESede".equals(upper) || "TripleDES".equals(upper))
        {
            java.security.spec.KeySpec keySpec = new DESedeKeySpec(keyData);
            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(algorithm);
            javax.crypto.SecretKey secretKey = secretKeyFactory.generateSecret(keySpec);
            return secretKey;
        } else
        {
            SecretKeySpec keySpec = new SecretKeySpec(keyData, algorithm);
            return keySpec;
        }
    }
  
    
	public static String toSHA256(String str) {
		String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(str.getBytes());
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			System.err.println("암호화 중 에러가 발생하였습니다.");
			SHA = null;
		}
		return SHA;
	}	
}




package kostat.sop.OpenAPI3.common.security;

import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Calendar;
import java.util.Date;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.SecretKeySpec;

public class Security
{
    private static String strKey = "k8o0n0g7ya25ng0cadee3f16ce55d1dc";
    

    public Security(String key)
    {
    	strKey =key;
    }
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

    public static String encrypt(String to_encrypt)
    {
        try
        {
            Key key = generateKey("AES", ByteUtils.toBytes(strKey, 16));
            String transformation = "AES/ECB/PKCS5Padding";
            Cipher cipher = Cipher.getInstance(transformation);
            cipher.init(1, key);
            byte plain[] = to_encrypt.getBytes();
            byte encrypt[] = cipher.doFinal(plain);
            return ByteUtils.toHexString(encrypt);
        }
        catch(Exception e)
        {
            return null;
        }
    }

    public static String decrypt(String to_decrypt)
    {
        try
        {
            String transformation = "AES/ECB/PKCS5Padding";
            Cipher cipher = Cipher.getInstance(transformation);
            Key key = generateKey("AES", ByteUtils.toBytes(strKey, 16));
            cipher.init(2, key);
            byte decrypt[] = cipher.doFinal(ByteUtils.toBytes(to_decrypt, 16));
            return new String(decrypt);
        }
        catch(Exception e)
        {
            return e.toString();
        }
    }

    public static String getMD5(String input)
    {
        input = (new StringBuilder(String.valueOf(input))).append("ellay").toString();
        try
        {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte messageDigest[] = md.digest(input.getBytes());
            BigInteger number = new BigInteger(1, messageDigest);
            String hashtext;
            for(hashtext = number.toString(16); hashtext.length() < 32; hashtext = (new StringBuilder("0")).append(hashtext).toString());
            return hashtext;
        }
        catch(NoSuchAlgorithmException e)
        {
            throw new RuntimeException(e);
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
			e.printStackTrace();
			SHA = null;
		}
		return SHA;
	}
	
	public static void main(String[] strs){
		
		System.out.println(toSHA256("bus@truck"));
		System.out.println(toSHA256("call"));
		System.out.println(toSHA256("mon"));
		System.out.println(toSHA256("admin1234!"));
		System.out.println(toSHA256("qwer1234!"));
		System.out.println(toSHA256("01076437952"));
	
		// 1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014

//		
//		1e4a3d91638fb00a8e0c116e707398df085f759950ca161e0d3a89cc79408547
//		1e4a3d91638fb00a8e0c116e707398df085f759950ca161e0d3a89cc79408547
////		950f2692c3ae21b3d4b0f773b3ddcdd2f9ae917434c2cf25efd69479780a49a5
		
		// 950f2692c3ae21b3d4b0f773b3ddcdd2f9ae917434c2cf25efd69479780a49a5
//		System.out.println(toSHA256("PWD:60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752;\nID:test2;\nTIME:201301162020;\n"));
		
//		5fe7077626acfef06064ac4775431282
//		b992c5f15028c000c79aedc1a9e638c5a1a34cb5f634e4d7f26e10b3b98942ad
//		01067575004
		
	}

}




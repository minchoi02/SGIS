package kostat.sop.OpenAPI3.common.security;


import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.SecretKeySpec;

public abstract class CryptUtil {
	
	private static final String AES_KEY = "k80ng0y7angyo2ng";
	
	/**
	 * <p>
	 * 해당 알고리즘에 사용할 비밀키(SecretKey)를 생성한다.
	 * </p>
	 * 
	 * @return 비밀키(SecretKey)
	 */
	public static Key generateKey(String algorithm) throws NoSuchAlgorithmException {
		KeyGenerator keyGenerator = KeyGenerator.getInstance(algorithm);
		SecretKey key = keyGenerator.generateKey();
		return key;
	}
	
	/**
	 * <p>
	 * 주어진 데이터로, 해당 알고리즘에 사용할 비밀키(SecretKey)를 생성한다.
	 * </p>
	 * 
	 * @param algorithm
	 *            DES/DESede/TripleDES/AES
	 * @param keyData
	 * @return 비밀키(SecretKey)
	 */
	public static Key generateKey(String algorithm, String keyStr) throws NoSuchAlgorithmException,
			InvalidKeyException, InvalidKeySpecException {
		byte[] keyData = keyStr.getBytes();
		if ("DES".equals(algorithm)) {
			KeySpec keySpec = new DESKeySpec(keyData);
			SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(algorithm);
			SecretKey secretKey = secretKeyFactory.generateSecret(keySpec);
			return secretKey;
		} else if ("DESede".equals(algorithm) || "TripleDES".equals(algorithm)) {
			KeySpec keySpec = new DESedeKeySpec(keyData);
			SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(algorithm);
			SecretKey secretKey = secretKeyFactory.generateSecret(keySpec);
			return secretKey;
		} else {
			SecretKeySpec keySpec = new SecretKeySpec(keyData, algorithm);
			return keySpec;
		}
	}
	
	private static String encrypt(String str, String algorithm, String keyStr, String transformation)
			throws InvalidKeyException, NumberFormatException, NoSuchAlgorithmException, InvalidKeySpecException,
			IllegalArgumentException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
		Key key = generateKey(algorithm, keyStr);
		Cipher cipher = Cipher.getInstance(transformation);
		cipher.init(Cipher.ENCRYPT_MODE, key);
		byte[] encrypt = cipher.doFinal(str.getBytes());
		return ByteUtils.toHexString(encrypt);
	}
	
	
	public static String encryptAES(String str) throws InvalidKeyException, NumberFormatException,
			NoSuchAlgorithmException, InvalidKeySpecException, IllegalArgumentException, NoSuchPaddingException,
			IllegalBlockSizeException, BadPaddingException {
		if (str.length() % 16 != 0) {
			str = padding(str, 16);
		}
		String algorithm = "AES";
		String transformation = "AES/ECB/NoPadding";
		return encrypt(str, algorithm, AES_KEY, transformation);
	}
	
	private static String decrypt(String str, String algorithm, String keyStr, String transformation)
			throws InvalidKeyException, NumberFormatException, NoSuchAlgorithmException, InvalidKeySpecException,
			IllegalArgumentException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
		Key key = generateKey(algorithm, keyStr);
		Cipher cipher = Cipher.getInstance(transformation);
		cipher.init(Cipher.DECRYPT_MODE, key);
		byte[] decrypt = cipher.doFinal(ByteUtils.toBytes(str, 16));
		return new String(decrypt).trim();
	}
	
	
	public static String decryptAES(String str) throws InvalidKeyException, NumberFormatException,
			NoSuchAlgorithmException, InvalidKeySpecException, IllegalArgumentException, NoSuchPaddingException,
			IllegalBlockSizeException, BadPaddingException {
		String algorithm = "AES";
		String transformation = "AES/ECB/NoPadding";
		return decrypt(str, algorithm, AES_KEY, transformation);
	}
	
	private static String padding(String str, int i) {
		int pad = i - (str.length() % i);
		for (int j = 0; j < pad; j++) {
			str += " ";
		}
		return str;
	}
	
	public static void main(String[] args) throws InvalidKeyException, NumberFormatException, NoSuchAlgorithmException,
			InvalidKeySpecException, IllegalArgumentException, NoSuchPaddingException, IllegalBlockSizeException,
			BadPaddingException {
		
		String str;
		String encrypt;
		String decrypt;
		
		str = "01099995008";
		encrypt = CryptUtil.encryptAES(str);
		decrypt = CryptUtil.decryptAES(encrypt);
		System.out.println("[" + str + "]");
		System.out.println("[" + encrypt + "]");
		System.out.println("[" + decrypt + "]");
		System.out.println("--------------------------------------");		

	}
	
}

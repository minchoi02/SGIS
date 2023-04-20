/*
 * java단에서 AES
 */

package kostat.lbdms.ServiceAPI.common.security;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

public class AES128util {
	
	//암복호화에 필요한 전역변수 선언 및 초기값 설정
	public static final int KEY_SIZE = 128; //AES128 key사이즈 = 128bit
	public static final int ITERATION_COUNT = 5; //반복횟수
	public static final String IV = "A27D5C9927726BCBFE7510B1BDD3D137"; //CBC모드에 필요한 벡터값
	public static final String SALT = "2FA1EC712F627B945225DEBAD75A01B6985FE84C55A90EB122882A88C1A59A55"; //암호화 과정에서 보안을 강화할 추가 키
	public static final String PASSPHRASE = "kostat lbdms g2g"; // PASSPHRASE = 암호문
	 
	public static final String PLAIN_TEXT = "1234"; //java에서 암호화 할 plaintext 선언 및 초기화 	 
 
	// line 39 ~ 127 = AES128 CBC모드 암복호화 수행과정입니다. 변경시 변수값 주의해주세요.
    public final Cipher cipher; 

    //키사이즈와 반복횟수로 암호화를 시작
    public AES128util(int keySize, int iterationCount) {
        try {
            cipher = Cipher.getInstance("AES/CBC/PKCS5Padding"); //(암호화 방식 : AES , 블록코딩 방식 : CBC) 를 이용하여 암호화
        } catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
            throw fail(e);
        }
    }

    //암호화 부분입니다
    public String encrypt(String salt, String iv, String passphrase, String plaintext) {
        try {
            SecretKey key = generateKey(salt, passphrase);
            byte[] encrypted = doFinal(Cipher.ENCRYPT_MODE, key, iv, plaintext.getBytes("UTF-8"));
            return base64(encrypted);
        } catch (UnsupportedEncodingException e) {
            throw fail(e);
        }
    }

    //복호화 부분입니다.
    public String decrypt(String salt, String iv, String passphrase, String ciphertext) {
        try {
            SecretKey key = generateKey(salt, passphrase);
            byte[] decrypted = doFinal(Cipher.DECRYPT_MODE, key, iv, base64(ciphertext));
            return new String(decrypted, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw fail(e);
        }
    }

    
    private byte[] doFinal(int encryptMode, SecretKey key, String iv,
            byte[] bytes) {
        try {
            cipher.init(encryptMode, key, new IvParameterSpec(hex(iv)));
            return cipher.doFinal(bytes);
        } catch (InvalidKeyException | InvalidAlgorithmParameterException
                | IllegalBlockSizeException | BadPaddingException e) {
            throw fail(e);
        }
    }

    private SecretKey generateKey(String salt, String passphrase) {
        try {
            SecretKeyFactory factory = SecretKeyFactory
                    .getInstance("PBKDF2WithHmacSHA1");
            KeySpec spec = new PBEKeySpec(passphrase.toCharArray(),
                    hex(salt), ITERATION_COUNT, KEY_SIZE);
            SecretKey key = new SecretKeySpec(factory.generateSecret(spec)
                    .getEncoded(), "AES");
            return key;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw fail(e);
        }
    }

    public String random(int length) {
        byte[] salt = new byte[length];
        new SecureRandom().nextBytes(salt);
        return hex(salt);
    }

    public String base64(byte[] bytes) {
        return Base64.encodeBase64String(bytes);
    }

    public byte[] base64(String str) {
        return Base64.decodeBase64(str);
    }

    public String hex(byte[] bytes) {
        return Hex.encodeHexString(bytes);
    }

    public byte[] hex(String str) {
        try {
            return Hex.decodeHex(str.toCharArray());
        } catch (DecoderException e) {
            throw new IllegalStateException(e);
        }
    }

    private IllegalStateException fail(Exception e) {
        return new IllegalStateException(e);
    }

}

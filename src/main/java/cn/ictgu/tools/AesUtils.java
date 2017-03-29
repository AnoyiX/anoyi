package cn.ictgu.tools;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 * AES 加密工具
 * Created by Silence on 2017/3/28.
 */
public class AesUtils {

  private static final String TYPE = "AES/CBC/PKCS5Padding";
  private static final String KEY_ALGORITHM = "AES";

  /**
   * 使用AES 算法 加密，默认模式 AES/CBC/PKCS5Padding
   */
  public static String encrypt(String str, String iv, String pass) {
    try {
      Cipher cipher = Cipher.getInstance(TYPE);
      SecretKey secretKey = new SecretKeySpec(pass.getBytes(), KEY_ALGORITHM);
      cipher.init(Cipher.ENCRYPT_MODE, secretKey, new IvParameterSpec(iv.getBytes()));
      byte[] encrypt = cipher.doFinal(str.getBytes());
      return Base64.getEncoder().encodeToString(encrypt);
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    } catch (NoSuchPaddingException e) {
      e.printStackTrace();
    } catch (BadPaddingException e) {
      e.printStackTrace();
    } catch (InvalidKeyException e) {
      e.printStackTrace();
    } catch (IllegalBlockSizeException e) {
      e.printStackTrace();
    } catch (InvalidAlgorithmParameterException e) {
      e.printStackTrace();
    }
    return null;
  }

}

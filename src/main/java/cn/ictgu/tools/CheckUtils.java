package cn.ictgu.tools;

/**
 * 校验参数工具类
 * Created by Silence on 2017/3/11.
 */
public class CheckUtils {

  public static boolean  checkEmail(String email){
    if (email == null){
      return false;
    }
    String regex = "\\w+(\\.\\w)*@\\w+(\\.\\w{2,3}){1,3}";
    return email.matches(regex);
  }

  public static boolean checkPassword(String password){
    if (password == null){
      return false;
    }
    String regex = "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$";
    return password.matches(regex);
  }

  public static boolean checkNickname(String nickname){
    return nickname != null && nickname.length() < 16;
  }

}

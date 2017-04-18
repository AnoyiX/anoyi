package cn.ictgu.tools;

import lombok.extern.log4j.Log4j2;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * Url 工具类
 * Created by Silence on 2016/11/24.
 */
@Log4j2
public class UrlUtils {

  public static String getDomain(String url){
    String domain = "";
    try {
      URL target = new URL(url);
      domain = target.getHost();
    } catch (MalformedURLException e) {
      log.error("Url("+url+") Cannot convert to BASIC-URL");
      e.printStackTrace();
    }
    return domain;
  }

  public static String getTopDomain(String url){
    String domain = "";
    try {
      URL target = new URL(url);
      domain = target.getHost();
      String[] part = domain.split("\\.");
      if (part.length > 2){
        return part[part.length-2] + "." + part[part.length-1];
      }
    } catch (MalformedURLException e) {
      log.error("Url("+url+") Cannot convert to BASIC-URL");
      e.printStackTrace();
    }
    return domain;
  }

  public static String adjustUrl(String url){
    if (url.contains("http://")){
      return url;
    }
    return "http://" + url;
  }

}

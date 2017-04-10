package cn.ictgu.parse.video;

import cn.ictgu.config.OtherParseConfig;
import cn.ictgu.dao.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.AesUtils;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 第三方通用解析
 * Created by Silence on 2017/3/15.
 */
@Log4j
abstract class AllVideoParser implements Parser<Video>{

  private static final String REAL_API_REGEX = "url:'\\./(.*?)'";
  private static final String ID_REGEX = "encodeURIComponent\\(\"(.*?)\"";
  private static final String UA_PHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";

  private static final int timeout = 600000;

  /**
   * 1.创建一个带有版权信息的Video
   * 2.设置解析方信息
   * 3.爬取视频的标题和预览图片
   * 4.爬取视频的播放地址
   *
   * @param url 资源地址
   * @return 完整的视频信息
   */
  @Override
  public final Video parse(String url) {
    Video video = initVideo();
    video.setValue(url);
    video.setParser(OtherParseConfig.OFFICIAL_WEBSITE);
    video.setParserName(OtherParseConfig.OFFICIAL_NAME);
    crawlerTitleAndImage(url, video);
    String playUrl = getPlayUrl(url);
    video.setPlayUrl(playUrl);
    return video;
  }

  public abstract List<Episode> parseEpisodes(String url);

  abstract Video initVideo();

  abstract void crawlerTitleAndImage(String url, Video video);

  private String getPlayUrl(String url){
    String api = OtherParseConfig.REQUEST + url;
    Map<String, String> cookies;
    Document document;
    try {
      Connection.Response response = Jsoup.connect(api).userAgent(UA_PHONE).timeout(timeout).header("Upgrade-Insecure-Requests","1").header("Host","aikan-tv.com").ignoreContentType(true).execute();
      cookies = response.cookies();
      document = response.parse();
      Matcher matcher = Pattern.compile(REAL_API_REGEX).matcher(document.html());
      if (matcher.find()){
        String realApi =  OtherParseConfig.OFFICIAL_WEBSITE + matcher.group(1);
        matcher = Pattern.compile(ID_REGEX).matcher(document.html());
        if (matcher.find()){
          String id = matcher.group(1);
          try {
            id = URLEncoder.encode(id, "UTF-8");
          } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
          }
          try {
            Document result = Jsoup.connect(realApi).timeout(timeout).header("X-Requested-With","XMLHttpRequest").header("Content-Type","application/x-www-form-urlencoded").cookies(cookies).userAgent(UA_PHONE).ignoreContentType(true).validateTLSCertificates(false).data("id", id).data("type","auto").data("time", String.valueOf(new Date().getTime())).data("hd", "cq").post();
            log.info("Parser result : " + result.text());
            JSONObject json = JSONObject.parseObject(result.text());
            return json.getString("video");
          } catch (IOException e) {
            e.printStackTrace();
          }
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

}

package cn.ictgu.parse.video;

import cn.ictgu.config.OtherParseConfig;
import cn.ictgu.serv.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 第三方通用解析
 * Created by Silence on 2017/3/15.
 */
@Log4j2
abstract class AllVideoParser implements Parser<Video>{

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
    log.info(playUrl);
    video.setPlayUrl(playUrl);
    return video;
  }

  public abstract List<Episode> parseEpisodes(String url);

  abstract Video initVideo();

  abstract void crawlerTitleAndImage(String url, Video video);

  private String getPlayUrl(String url){
    try {
      url = URLEncoder.encode(url, "UTF-8");
      String api = String.format(OtherParseConfig.REQUEST, url);
      Connection.Response response = Jsoup.connect(api).userAgent(JsoupUtils.UA_PHONE).timeout(timeout).followRedirects(false).method(Connection.Method.GET).execute();
      return response.header("Location");
    } catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

}

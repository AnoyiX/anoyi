package cn.ictgu.parse.video;

import cn.ictgu.config.OtherParseConfig;
import cn.ictgu.dao.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;
import org.jsoup.nodes.Document;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 第三方通用解析
 * Created by Silence on 2017/3/15.
 */
@Log4j
abstract class AllVideoParser implements Parser<Video>{

  private static final String REAL_API_REGEX = "get\\(\"(.*?)\"";

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
  public Video parse(String url) {
    Video video = initVideo();
    video.setValue(url);
    video.setParser(OtherParseConfig.OFFICIAL_WEBSITE);
    video.setParserName(OtherParseConfig.OFFICIAL_NAME);
    crawlerTitleAndImage(url, video);
    String realApi = getRealApi(url);
    String playUrl = getPlayUrl(realApi);
    video.setPlayUrl(playUrl);
    return video;
  }

  public abstract List<Episode> parseEpisodes(String url);

  abstract Video initVideo();

  abstract void crawlerTitleAndImage(String url, Video video);

  private String getRealApi(String url){
    String api = OtherParseConfig.REQUEST + url;
    Document document = JsoupUtils.getDocWithPhone(api);
    Matcher matcher = Pattern.compile(REAL_API_REGEX).matcher(document.html());
    if (matcher.find()){
      return OtherParseConfig.OFFICIAL_WEBSITE + matcher.group(1);
    }
    return null;
  }


  private String getPlayUrl(String realApi) {
    log.debug("realApi:" + realApi);
    Document document = JsoupUtils.getDocWithPhone(realApi);
    JSONObject json = JSONObject.parseObject(document.body().text());
    return json.getString("ck_f");
  }
}

package cn.ictgu.parse.video;

import cn.ictgu.dao.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 优酷视频
 * Created by Silence on 2017/1/7.
 */
@Log4j
public class Youku extends AllVideoParser {
  private final static String PROVIDER = "优酷视频";
  private final static String VIDEO_INFO_API = "http://play-ali.youku.com/play/get.json?vid=%s&ct=12";
  private static final String VIDEOS = "http://v.youku.com/v_show/id_%s.html";

  @Override
  public List<Episode> parseEpisodes(String url) {
    List<Episode> episodes = new ArrayList<>();
    String vid = this.matchVid(url);
    Document document = JsoupUtils.getDocWithPC(String.format(VIDEOS, vid));
    Elements elements = document.select("div.items div[name=tvlist]");
    if (elements.size() > 0) {
      for (Element element : elements) {
        Episode episode = new Episode();
        int index = Integer.valueOf(element.select("a.sn span").text().trim());
        if (index < 10) {
          episode.setIndex("0" + index);
        } else {
          episode.setIndex("" + index);
        }
        String value = "http:" + element.select("a.sn").attr("href");
        episode.setValue(value);
        episodes.add(episode);
      }
    } else {
      elements = document.select("div.lists div.items li.item");
      for (Element element : elements) {
        Episode episode = new Episode();
        int index = Integer.valueOf(element.attr("seq").trim());
        if (index < 10) {
          episode.setIndex("0" + index);
        } else {
          episode.setIndex("" + index);
        }
        String value = "http:" + element.select("a.A").attr("href");
        episode.setValue(value);
        episodes.add(episode);
      }
    }
    Collections.reverse(episodes);
    return episodes;
  }

  private String matchVid(String url){
    Matcher matcher = Pattern.compile("id_(.*?)(_|\\.html)").matcher(url);
    if (matcher.find()){
      return matcher.group(1);
    }
    return null;
  }

  @Override
  Video initVideo() {
    Video video = new Video();
    video.setProvider(PROVIDER);
    video.setType("EDGE");
    return video;
  }

  @Override
  void crawlerTitleAndImage(String url, Video video) {
    String vid = matchVid(url);
    if (vid == null){
      return;
    }
    String api = String.format(VIDEO_INFO_API, vid);
    String text = JsoupUtils.getDocWithPhone(api).text();
    JSONObject data = JSONObject.parseObject(text);
    JSONObject videoNode = data.getJSONObject("data").getJSONObject("video");
    String title =  videoNode.getString("title");
    video.setTitle(title);
    String image = videoNode.getString("img_hd");
    video.setImage(image);
  }

}

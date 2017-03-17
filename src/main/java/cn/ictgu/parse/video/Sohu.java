package cn.ictgu.parse.video;

import cn.ictgu.dao.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.jsoup.nodes.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 搜狐视频
 * Created by Silence on 2017/1/7.
 */
public class Sohu extends AllVideoParser {
  private static final String PROVIDER = "搜狐视频";
  private static final String INFO_API = "http://m.tv.sohu.com/phone_playinfo?vid=";
  private static final String VIDEOS = "http://pl.hd.sohu.com/videolist?playlistid=";

  @Override
  public List<Episode> parseEpisodes(String url) {
    List<Episode> episodes = new ArrayList<>();
    Document document = JsoupUtils.getDocWithPhone(url);
    Matcher matcher = Pattern.compile("var playlistId=\"(.*?)\"").matcher(document.html());
    if (matcher.find()) {
      String vid = matcher.group(1);
      String videosAPI = VIDEOS + vid;
      String data = JsoupUtils.getDocWithPhone(videosAPI).body().text();
      JSONObject jsonObject = JSONObject.parseObject(data);
      JSONArray array = jsonObject.getJSONArray("videos");
      if (array.size()>0){
        for (int i = array.size() - 1; i >= 0; i--) {
          JSONObject object = array.getJSONObject(i);
          Episode episode = new Episode();
          Integer index = object.getInteger("order");
          if (index < 10) {
            episode.setIndex("0" + index);
          } else {
            episode.setIndex("" + index);
          }
          episode.setValue(object.getString("pageUrl"));
          episodes.add(episode);
        }
      }
    }
    return episodes;
  }

  private String getVid(String videoUrl){
    String vid = "";
    Matcher matcher = Pattern.compile("v([0-9]+)\\.shtml").matcher(videoUrl);
    if (matcher.find()){
      vid = matcher.group(1);
    }else {
      Document document = JsoupUtils.getDocWithPhone(videoUrl);
      matcher = Pattern.compile("vid(=|:)\"?([0-9]+)").matcher(document.html());
      if (matcher.find()) {
        vid = matcher.group(2);
      }
    }
    return vid;
  }

  @Override
  Video initVideo() {
    Video video = new Video();
    video.setProvider(PROVIDER);
    video.setType("H5");
    return video;
  }

  @Override
  void crawlerTitleAndImage(String url, Video video) {
    String vid = this.getVid(url);
    String api = INFO_API + vid;
    Document document = JsoupUtils.getDocWithPC(api);
    JSONObject json = JSONObject.parseObject(document.body().text());
    JSONObject data = json.getJSONObject("data");
    String title = data.getString("video_name");
    video.setTitle(title);
    String image = data.getString("hor_w8_pic");
    video.setImage(image);
  }
}

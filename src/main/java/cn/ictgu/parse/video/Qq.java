package cn.ictgu.parse.video;

import cn.ictgu.dao.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.jsoup.nodes.Document;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 腾讯视频解析
 * Created by Silence on 2017/1/7.
 */
public class Qq extends AllVideoParser{
  private static final String PROVIDER = "腾讯视频";

  @Override
  public List<Episode> parseEpisodes(String url) {
    int flag = 0;
    String id = matchId(url);
    List<Episode> episodes = new ArrayList<>();
    Document document = JsoupUtils.getDocWithPC(url);
    Matcher matcher = Pattern.compile("var LIST_INFO = (\\{.*\\})").matcher(document.html());
    if (matcher.find()) {
      String data = matcher.group(1);
      JSONObject jsonObject = JSONObject.parseObject(data);
      JSONArray vid = jsonObject.getJSONArray("vid");
      JSONObject datas = jsonObject.getJSONObject("data");
      if (vid.size() > 0){
        for (int i = 0; i < vid.size(); i++) {
          JSONObject object = datas.getJSONObject(vid.getString(i));
          JSONArray categoryMap = object.getJSONArray("category_map");
          if ("正片".equals(categoryMap.getString(1))){
            Episode episode = new Episode();
            episode.setIndex(object.getString("episode"));
            episode.setValue("http://v.qq.com/x/cover/" + id + "/" + vid.getString(i) + ".html");
            episodes.add(episode);
            flag = 0;
          }else {
            flag++;
          }
          if (flag > 3){
            break;
          }
        }
      }
      Collections.reverse(episodes);
    }
    return episodes;
  }

  private String matchId(String videoUrl){
    String id = "";
    Matcher matcher = Pattern.compile("([0-9a-zA-Z]{14,})").matcher(videoUrl);
    if (matcher.find()){
      id = matcher.group(1);
    }
    return id;
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
    Document document = JsoupUtils.getDocWithPC(url);
    String title = document.select("title").text();
    video.setTitle(title);
    String image = document.select("meta[name='twitter:image']").attr("content");
    video.setImage(image);
  }
}

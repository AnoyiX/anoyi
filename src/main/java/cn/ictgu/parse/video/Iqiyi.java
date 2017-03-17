package cn.ictgu.parse.video;

import cn.ictgu.dto.Video;
import cn.ictgu.dao.model.Episode;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringEscapeUtils;
import org.jsoup.nodes.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 爱奇艺
 * Created by Silence on 2017/1/7.
 */
public class Iqiyi extends AllVideoParser {
  private static final String PROVIDER = "爱奇艺";
  private static final String VIDEOS = "http://cache.video.qiyi.com/jp/avlist/%s/1/50/";
  private static final String TITLE_REGEX = "playInfo.videoName = \"(.*?)\"";
  private static final String IMAGE_REGEX = "playInfo.imageUrl = \"(.*?)\"";

  @Override
  Video initVideo() {
    Video video = new Video();
    video.setProvider(PROVIDER);
    video.setType("H5");
    return video;
  }

  @Override
  void crawlerTitleAndImage(String url, Video video) {
    String phoneSite = url.replace("www", "m");
    Document document = JsoupUtils.getDocWithPhone(phoneSite);
    Matcher matcher = Pattern.compile(TITLE_REGEX).matcher(document.html());
    if (matcher.find()){
      String title = matcher.group(1);
      title = StringEscapeUtils.unescapeJava(title);
      video.setTitle(title);
    }
    matcher = Pattern.compile(IMAGE_REGEX).matcher(document.html());
    if (matcher.find()){
      String image = matcher.group(1);
      image = StringEscapeUtils.unescapeHtml(image);
      image = image.replace(".jpg", "_320_180.jpg");
      video.setImage(image);
    }
  }


  @Override
  public List<Episode> parseEpisodes(String videoUrl) {
    List<Episode> episodes = new ArrayList<>();
    Document document = JsoupUtils.getDocWithPhone(videoUrl);
    Matcher matcher = Pattern.compile("albumId:(.*?),").matcher(document.html());
    if (matcher.find()) {
      String vid = matcher.group(1);
      String videosAPI = String.format(VIDEOS, vid);
      String data = JsoupUtils.getDocWithPhone(videosAPI).body().text().replace("var tvInfoJs=","");
      JSONObject jsonObject = JSONObject.parseObject(data);
      JSONArray array = jsonObject.getJSONObject("data").getJSONArray("vlist");
      if (array.size()>0){
        for (int i = array.size() - 1; i >= 0; i--) {
          JSONObject object = array.getJSONObject(i);
          Episode episode = new Episode();
          Integer index = object.getInteger("pd");
          if (index < 10) {
            episode.setIndex("0" + index);
          } else {
            episode.setIndex("" + index);
          }
          episode.setValue(object.getString("vurl"));
          episodes.add(episode);
        }
      }
    }
    return episodes;
  }
}

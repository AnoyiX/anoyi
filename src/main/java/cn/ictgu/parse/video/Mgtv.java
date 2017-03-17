package cn.ictgu.parse.video;

import cn.ictgu.dao.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;
import org.jsoup.nodes.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 芒果视频
 * Created by Silence on 2017/1/7.
 */
@Log4j
public class Mgtv extends AllVideoParser{
  private static final String PROVIDER = "芒果视频";
  private static final String VIDEOS = "http://pcweb.api.mgtv.com/episode/list?video_id=%s&page=0&size=50";
  private static final String API = "http://v5m.api.mgtv.com/vrs/getByPartId?partId=%s&clipId=%s";
  private static final String ID_REGEX = "/b/([0-9/]+)";

  @Override
  Video initVideo() {
    Video video = new Video();
    video.setProvider(PROVIDER);
    video.setType("H5");
    return video;
  }

  @Override
  void crawlerTitleAndImage(String url, Video video) {
    String api;
    try {
      api = getInfoApi(url);
      Document document = JsoupUtils.getDocWithPC(api);
      JSONObject json = JSONObject.parseObject(document.body().text());
      String title = json.getJSONObject("data").getString("share_title");
      String image = json.getJSONObject("data").getString("image");
      video.setTitle(title);
      video.setImage(image);
    } catch (Exception e) {
      log.error("芒果TV，错误的URL：" + url);
    }

  }

  @Override
  public List<Episode> parseEpisodes(String videoUrl) {
    List<Episode> episodes = new ArrayList<>();
    Matcher matcher = Pattern.compile("/([0-9]*?)\\.html").matcher(videoUrl);
    if (matcher.find()) {
      String vid = matcher.group(1);
      String videosAPI = String.format(VIDEOS, vid);
      String data = JsoupUtils.getDocWithPC(videosAPI).body().text();
      JSONObject jsonObject = JSONObject.parseObject(data);
      JSONArray array = jsonObject.getJSONObject("data").getJSONArray("list");
      if (array.size()>0){
        for (int i = array.size() - 1; i >= 0; i--) {
          JSONObject object = array.getJSONObject(i);
          Episode episode = new Episode();
          Integer index = object.getInteger("t1");
          if (index < 10) {
            episode.setIndex("0" + index);
          } else {
            episode.setIndex("" + index);
          }
          episode.setValue("http://www.mgtv.com" + object.getString("url"));
          episodes.add(episode);
        }
      }
    }
    return episodes;
  }

  private String getInfoApi(String url) throws Exception{
    Matcher matcher = Pattern.compile(ID_REGEX).matcher(url);
    if (matcher.find()) {
      String result = matcher.group(1);
      String[] ids = result.split("/");
      return String.format(API, ids[1], ids[0]);
    }
    return null;
  }

}

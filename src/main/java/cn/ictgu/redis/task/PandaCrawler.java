package cn.ictgu.redis.task;

import cn.ictgu.dto.Video;
import cn.ictgu.redis.RedisSourceManager;
import cn.ictgu.tools.JsoupUtils;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 熊猫TV 爬虫
 * Created by Silence on 2017/4/30.
 */
@Component
@Log4j2
@AllArgsConstructor
public class PandaCrawler {
  private static final String PANDA = "http://www.panda.tv/";
  private static final String PANDA_ALL = "http://www.panda.tv/all";
  private static final String TAG = "PANDA";

  private final RedisSourceManager redisSourceManager;

    /**
     * 每隔20分钟，爬一次熊猫TV
     */
  @Scheduled(fixedRate = 20 * 60 * 1000)
  public void start(){
    Document document = JsoupUtils.getDocWithPC(PANDA_ALL);
    savePandaLivesToRedis(document);
  }

  private void savePandaLivesToRedis(Document document){
    List<Video> lives = new ArrayList<>();
    Elements elements = document.select("li.video-list-item.video-no-tag");
    for (Element element : elements){
        Video videoDTO = new Video();
      String title = "["+element.select("div.video-info span.video-cate").text()+"] "+element.select("div.video-info span.video-nickname").text();
      String image = element.select("img.video-img").attr("data-original");
      String url = PANDA + element.attr("data-id");
      videoDTO.setTitle(title);
      videoDTO.setImage(image);
      videoDTO.setValue(url);
      lives.add(videoDTO);
      if (lives.size() > 48){
        break;
      }
    }
    String key = redisSourceManager.VIDEO_PREFIx_HOME_LIVE_KEY + "_" + TAG;
    redisSourceManager.saveVideos(key, lives);
  }
}

package cn.ictgu.redis.task;

import cn.ictgu.dto.VideoDTO;
import cn.ictgu.redis.RedisSourceManager;
import cn.ictgu.tools.JsoupUtils;
import lombok.extern.log4j.Log4j;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 腾讯视频信息爬虫
 * Created by Silence on 2017/2/15.
 */
@Component
@Log4j
public class QQCrawler {

  private static final String HOME_PAGE_PC_CARTOON_HOT = "http://v.qq.com/cartoon/";
  private static final String TAG = "QQ";

  @Autowired
  private RedisSourceManager redisSourceManager;

  @Scheduled(fixedRate = 60 * 60 * 1000)
  public void start(){
    Document pcCartoonDocument = JsoupUtils.getDocWithPC(HOME_PAGE_PC_CARTOON_HOT);
    saveCartoonHotsToRedis(pcCartoonDocument);
  }

  private void saveCartoonHotsToRedis(Document document){
    List<VideoDTO> cartoonVideos = new ArrayList<>();
    Elements elements = document.select("div.slider_nav a");
    for (Element element : elements){
      VideoDTO videoDTO = new VideoDTO();
      String title = element.text();
      String image = element.attr("data-bgimage");
      String url = element.attr("href");
      videoDTO.setAvailable(true);
      videoDTO.setTitle(title);
      videoDTO.setImage(image);
      videoDTO.setValue(url);
      log.info("title:"+title+",image:"+image+",url:"+url);
      cartoonVideos.add(videoDTO);
      if (cartoonVideos.size() > 7){
        break;
      }
    }
    String key = redisSourceManager.VIDEO_PREFIX_HOME_CARTOON_HOT_KEY + "_" + TAG;
    redisSourceManager.saveVideos(key, cartoonVideos);
  }

}

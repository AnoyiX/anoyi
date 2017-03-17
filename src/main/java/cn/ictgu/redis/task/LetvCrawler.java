package cn.ictgu.redis.task;

import cn.ictgu.dto.VideoDTO;
import cn.ictgu.redis.RedisSourceManager;
import cn.ictgu.tools.JsoupUtils;
import lombok.extern.log4j.Log4j;
import org.apache.commons.lang.StringUtils;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 乐视信息爬虫
 * Created by Silence on 2017/2/12.
 */
@Component
@Log4j
public class LetvCrawler {

  private static final String HOME_PAGE_PC = "http://www.le.com/";
  private static final String HOME_PAGE_PHONE_TV = "http://m.le.com/tv/";
  private static final String HOME_PAGE_PHONE_MOVIE = "http://m.le.com/movie/";
  private static final String HOME_PAGE_PHONE_CARTOON = "http://m.le.com/comic/";
  private static final String HOME_PAGE_PHONE_RECOMMEND = "http://m.le.com/zongyi/";
  private static final String HOME_PAGE_PHONE_TV_HOT = "http://m.le.com/top/tv";
  private static final String TAG = "LETV";

  @Autowired
  private RedisSourceManager redisSourceManager;

  @Scheduled(fixedRate = 60 * 60 * 1000)
  public void start(){
    Document pcDocument = JsoupUtils.getDocWithPC(HOME_PAGE_PC);
    Document phoneTVDocument = JsoupUtils.getDocWithPhone(HOME_PAGE_PHONE_TV);
    Document phoneMovieDocument = JsoupUtils.getDocWithPhone(HOME_PAGE_PHONE_MOVIE);
    Document phoneCartoonDocument = JsoupUtils.getDocWithPhone(HOME_PAGE_PHONE_CARTOON);
    Document phoneZongyiDocument = JsoupUtils.getDocWithPhone(HOME_PAGE_PHONE_RECOMMEND);
    Document phoneTvHotDocument = JsoupUtils.getDocWithPhone(HOME_PAGE_PHONE_TV_HOT);
    saveCarouselsToRedis(pcDocument);
    saveRecommendsToRedis(phoneZongyiDocument);
    saveTVsToRedis(phoneTVDocument);
    saveMoviesToRedis(phoneMovieDocument);
    saveCartoonsToRedis(phoneCartoonDocument);
    saveTVHotsToRedis(phoneTvHotDocument);
  }

  private void saveCarouselsToRedis(Document document){
    List<VideoDTO> carouselVideos = new ArrayList<>();
    Elements carousels = document.select("div.chart-info ul.slides li");
    for (Element carousel : carousels){
      VideoDTO videoDTO = new VideoDTO();
      String title = carousel.select("a").attr("title");
      String image = carousel.select("img").attr("data-src");
      String url = carousel.select("a").attr("href");
      if (url.contains("le.com")){
        videoDTO.setAvailable(true);
        videoDTO.setTitle(title);
        if(StringUtils.isEmpty(image)){
          image = carousel.select("img").attr("img-src");
        }
        videoDTO.setImage(image);
        if(!url.contains("ptv/vplay")){
          Document realDocument = JsoupUtils.getDocWithPC(url);
          Matcher matcher = Pattern.compile("vid:\"(.*?)\"").matcher(realDocument.html());
          if (matcher.find())
            url = String.format("http://www.le.com/ptv/vplay/%s.html", matcher.group(1));
        }
        videoDTO.setValue(url);
        log.info("title:"+title+",image:"+image+",url:"+url);
        carouselVideos.add(videoDTO);
      }
    }
    String key = redisSourceManager.VIDEO_PREFIX_HOME_CAROUSEL_KEY + "_" + TAG;
    redisSourceManager.saveVideos(key, carouselVideos);
  }

  private void saveRecommendsToRedis(Document document){
    String key = redisSourceManager.VIDEO_PREFIX_HOME_RECOMMEND_KEY + "_" + TAG;
    redisSourceManager.saveVideos(key, getVideosFromPhoneDocument(document));
  }

  private void saveTVsToRedis(Document document){
    String key = redisSourceManager.VIDEO_PREFIX_HOME_TV_KEY + "_" + TAG;
    redisSourceManager.saveVideos(key, getVideosFromPhoneDocument(document));
  }

  private void saveTVHotsToRedis(Document document){
    String key = redisSourceManager.VIDEO_PREFIX_HOME_TV_HOT_KEY + "_" + TAG;
    redisSourceManager.saveVideos(key, getHostsFromPhoneDocument(document, 8));
  }

  private void saveMoviesToRedis(Document document){
    String key = redisSourceManager.VIDEO_PREFIX_HOME_MOVIE_KEY + "_" + TAG;
    redisSourceManager.saveVideos(key, getVideosFromPhoneDocument(document));
  }

  private void saveCartoonsToRedis(Document document){
    String key = redisSourceManager.VIDEO_PREFIX_HOME_CARTOON_KEY + "_" + TAG;
    redisSourceManager.saveVideos(key, getVideosFromPhoneDocument(document));
  }

  private List<VideoDTO> getVideosFromPhoneDocument(Document document){
    List<VideoDTO> videos = new ArrayList<>();
    Elements videoElements = document.select("div.column_body div a");
    for (Element element : videoElements) {
      VideoDTO videoDTO = new VideoDTO();
      String title = element.attr("title");
      String image = element.select("span.a_img i").attr("style").replace("background-image:url('","").replace("')","");
      if (StringUtils.isEmpty(image)){
        image = element.select("span.a_img i").attr("data-src");
      }
      String url = String.format("http://www.le.com/ptv/vplay/%s.html", element.attr("data-vid"));
      videoDTO.setAvailable(true);
      videoDTO.setTitle(title);
      videoDTO.setImage(image);
      videoDTO.setValue(url);
      log.info("title:"+title+",image:"+image+",url:"+url);
      videos.add(videoDTO);
    }
    return videos;
  }

  private List<VideoDTO> getHostsFromPhoneDocument(Document document, int size){
    List<VideoDTO> videos = new ArrayList<>();
    Elements videoElements = document.select("div.column.tab_cnt a");
    for (int i = 0; i < size; i++) {
      Element element = videoElements.get(i);
      VideoDTO videoDTO = new VideoDTO();
      String title = element.select("i.i1").text();
      String image = element.select("span.a_img i").attr("data-src");
      String url = String.format("http://www.le.com/ptv/vplay/%s.html", element.attr("href").replace("/vplay_", ""));
      videoDTO.setAvailable(true);
      videoDTO.setTitle(title);
      videoDTO.setImage(image);
      videoDTO.setValue(url);
      log.info("title:"+title+",image:"+image+",url:"+url);
      videos.add(videoDTO);
    }
    return videos;
  }

}

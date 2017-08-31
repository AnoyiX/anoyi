package cn.ictgu.job;

import cn.ictgu.bean.response.Video;
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
 * 腾讯视频信息爬虫
 * Created by Silence on 2017/2/12.
 */
@Component
@Log4j2
@AllArgsConstructor
public class QqCrawler {

    private static final String HOME_PAGE_PC = "https://v.qq.com/";
    private static final String HOME_PAGE_PHONE_TV = "http://v.qq.com/x/list/tv";
    private static final String HOME_PAGE_PHONE_MOVIE = "http://v.qq.com/x/list/movie";
    private static final String HOME_PAGE_PHONE_CARTOON = "http://v.qq.com/x/list/cartoon";
    private static final String HOME_PAGE_PHONE_RECOMMEND = "http://v.qq.com/x/list/variety";
    private static final String TAG = "QQ";

    private final RedisSourceManager redisSourceManager;

    /**
     * 每隔1小时，爬腾讯视频官网信息
     */
    @Scheduled(fixedRate = 60 * 60 * 1000)
    public void start() {
        Document pcDocument = JsoupUtils.getDocWithPC(HOME_PAGE_PC);
        Document phoneTVDocument = JsoupUtils.getDocWithPC(HOME_PAGE_PHONE_TV);
        Document phoneMovieDocument = JsoupUtils.getDocWithPC(HOME_PAGE_PHONE_MOVIE);
        Document phoneCartoonDocument = JsoupUtils.getDocWithPC(HOME_PAGE_PHONE_CARTOON);
        Document phoneZongyiDocument = JsoupUtils.getDocWithPC(HOME_PAGE_PHONE_RECOMMEND);
        saveCarouselsToRedis(pcDocument);
        saveRecommendsToRedis(phoneZongyiDocument);
        saveTVsToRedis(phoneTVDocument);
        saveMoviesToRedis(phoneMovieDocument);
        saveCartoonsToRedis(phoneCartoonDocument);
    }

    /**
     * 爬腾讯视频官网-首页轮播信息
     */
    private void saveCarouselsToRedis(Document document) {
        List<Video> carouselVideos = new ArrayList<>();
        Elements carousels = document.select("div.slider_nav a");
        for (Element carousel : carousels) {
            Video video = new Video();
            String title = carousel.select("div.txt").text();
            String image = carousel.attr("data-bgimage");
            String url = carousel.attr("href");
            video.setValue(url);
            video.setTitle(title);
            video.setImage(image);
            carouselVideos.add(video);
        }
        String key = redisSourceManager.VIDEO_PREFIX_HOME_CAROUSEL_KEY + "_" + TAG;
        redisSourceManager.saveVideos(key, carouselVideos);
    }

    /**
     * 爬腾讯PC站-综艺
     */
    private void saveRecommendsToRedis(Document document) {
        String key = redisSourceManager.VIDEO_PREFIX_HOME_RECOMMEND_KEY + "_" + TAG;
        redisSourceManager.saveVideos(key, getVideosFromPhoneDocument(document));
    }

    /**
     * 爬腾讯PC站-电视剧
     */
    private void saveTVsToRedis(Document document) {
        String key = redisSourceManager.VIDEO_PREFIX_HOME_TV_KEY + "_" + TAG;
        redisSourceManager.saveVideos(key, getVideosFromPhoneDocument(document));
    }

    /**
     * 爬腾讯PC站-电影
     */
    private void saveMoviesToRedis(Document document) {
        String key = redisSourceManager.VIDEO_PREFIX_HOME_MOVIE_KEY + "_" + TAG;
        redisSourceManager.saveVideos(key, getVideosFromPhoneDocument(document));
    }

    /**
     * 爬腾讯PC站-动漫
     */
    private void saveCartoonsToRedis(Document document) {
        String key = redisSourceManager.VIDEO_PREFIX_HOME_CARTOON_KEY + "_" + TAG;
        redisSourceManager.saveVideos(key, getVideosFromPhoneDocument(document));
    }

    private List<Video> getVideosFromPhoneDocument(Document document) {
        List<Video> videos = new ArrayList<>();
        Elements elements = document.select("li.list_item a.figure");
        for (Element element : elements) {
            Video video = new Video();
            String url = element.attr("href");
            String title = element.select("img").attr("alt");
            String image = element.select("img").attr("r-lazyload");
            video.setTitle(title);
            video.setImage(image);
            video.setValue(url);
            videos.add(video);
        }
        return videos;
    }

}

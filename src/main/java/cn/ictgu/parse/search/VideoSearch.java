package cn.ictgu.parse.search;

import cn.ictgu.bean.response.Video;
import cn.ictgu.constant.ExceptionEnum;
import cn.ictgu.exception.AnyException;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 视频搜索
 */
@Component
@Log4j2
public class VideoSearch {

    private static final String le = "http://m.le.com";
    private static final String api = "http://m.le.com/search";
    private static final String ua = "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36";

    /**
     * 搜索视频
     */
    public List<Video> searchVideos(String keyword) {
        List<Video> videos = new ArrayList<>();
        Document document = requestAPI(keyword);
        Elements elements = document.select("div.a_temp2.j-list");
        for (Element element : elements) {
            Video video = createVideo(element);
            videos.add(video);
        }
        return videos;
    }

    private Document requestAPI(String keyword) {
        try {
            return Jsoup.connect(api).userAgent(ua).ignoreContentType(true).data("wd", keyword).get();
        } catch (IOException e) {
            throw new AnyException(ExceptionEnum.VIDEO_SEARCH_ERROR);
        }
    }

    private Video createVideo(Element element) {
        Video video = new Video();
        String url = element.select("a.a_img").attr("data-href");
        if (url.startsWith("http")) {
            video.setValue(url);
        } else {
            video.setValue(le + url);
        }
        String image = element.select("a.a_img img").attr("data-src");
        image = image.replace("http:", "");
        String title = element.select("a.item_r_title").text();
        video.setTitle(title);
        video.setImage(image);
        return video;
    }

}

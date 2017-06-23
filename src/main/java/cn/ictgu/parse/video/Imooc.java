package cn.ictgu.parse.video;

import cn.ictgu.serv.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.JsoupUtils;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 慕课网
 * Created by Silence on 2017/3/15.
 */
public class Imooc implements Parser<Video>{
  private static final String PROVIDER = "慕课网";
  private static final String IMAGE_REGEX = "course.imageUrl=\"(.*?)\"";
  private static final String PLAY_REGEX = "course.videoUrl=\"(.*?)\"";
  private static final String COOKIES = "imooc_uuid=862d4578-bdb5-4515-981d-f650c6a6f533; imooc_isnew_ct=1495091317; PHPSESSID=2oaqjkm70h5k7fm81j5ulv80q1; loginstate=1; apsid=RjNWI3NTE3ZWQwODg5YWVjMzA5YmZmMjc2Mjc1MDYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzI0NDAwNgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADJiMGI0OGNkNmJiZTU3ZDRjYjUwNGFhYmU5ZGRiMWFjsH5MWbB%2BTFk%3DOG; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1497884860,1498185367; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1498185397; imooc_isnew=2; cvde=594c7e94cf9ac-18";
  @Override
  public Video parse(String url) {
    Video video = new Video();
    video.setProvider(PROVIDER);
    video.setValue(url);
    video.setParserName("沧海云");
    video.setParser("http://www.ictgu.cn");
    video.setType("H5");
    url = url.replace("www","m");
    Document document = JsoupUtils.getDocWithPhone(url, COOKIES);
    String title = document.select("title").text();
    video.setTitle(title);
    Matcher matcher = Pattern.compile(IMAGE_REGEX).matcher(document.html());
    if (matcher.find()){
      String image = matcher.group(1);
      video.setImage(image);
    }
    matcher = Pattern.compile(PLAY_REGEX).matcher(document.html());
    if (matcher.find()){
      String playUrl = matcher.group(1);
      video.setPlayUrl(playUrl);
    }
    return video;
  }

  @Override
  public List<Episode> parseEpisodes(String url) {
    List<Episode> episodes = new ArrayList<>();
    url = url.replace("www","m");
    Document document = JsoupUtils.getDocWithPhone(url, COOKIES);
    Elements elements = document.select("ul.course-sections li");
    int i = 0;
    for (Element element : elements){
      Episode episode = new Episode();
      String index = ++i < 10 ? "0" + i : "" + i;
      episode.setIndex(index);
      String value = "http://www.imooc.com" + element.select("a").attr("href");
      episode.setValue(value);
      episodes.add(episode);
    }
    return episodes;
  }

}

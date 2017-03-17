package cn.ictgu.parse.video;

import cn.ictgu.dao.model.Episode;
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
  private static final String COOKIES = "___rl__test__cookies=1489561521278; imooc_uuid=ba94bc99-83c7-41c9-aa1a-7d254bd02d94; imooc_isnew_ct=1489302235; OUTFOX_SEARCH_USER_ID_NCOO=1083121786.8991733; loginstate=1; apsid=RjNWI3NTE3ZWQwODg5YWVjMzA5YmZmMjc2Mjc1MDYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzI0NDAwNgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBjYWNlYWE1ZDM5ZmJjZjcxZDAxMWFmZjhiMjdlNDA0ah7FWGoexVg%3DOG; PHPSESSID=j2e9escm60fu58n6ss2g51hsf1; Hm_lvt_c92536284537e1806a07ef3e6873f2b3=1489313259,1489561480,1489561512; Hm_lpvt_c92536284537e1806a07ef3e6873f2b3=1489561958; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1489302235,1489405517,1489561418; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1489562818; imooc_isnew=2; cvde=58c8e74952b51-41";

  @Override
  public Video parse(String url) {
    Video video = new Video();
    video.setProvider(PROVIDER);
    video.setValue(url);
    video.setParserName("沧海云");
    video.setParser("http://ictgu.cn");
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

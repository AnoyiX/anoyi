package cn.ictgu.parse.video;

import cn.ictgu.bean.response.Episode;
import cn.ictgu.bean.response.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.math.RandomUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Log4j2
public class Tencent implements Parser<Video> {
    private final static String VIDEO_API = "http://vv.video.qq.com/getinfo";
    private final static String KEY_API = "http://vv.video.qq.com/getkey";
    private final static String COOKIE = "pgv_pvi=9348187136; RK=CHGK8Lmqbf; tvfe_boss_uuid=c85c752b5873df15; luin=o0545544032; lskey=00010000f361e190a6b7ef8be0b7a9164521ee812ab4e4f7ead3bb2b349d052506de9e9c88780f0030ae6a6e; main_login=qq; login_time_init=2017-8-1 23:14:27; ptui_loginuin=545544032; mobileUV=1_15db7e2ce1a_9e2f3; login_time_last=2017-8-6 22:37:14; pgv_si=s6543401984; _qpsvr_localtk=0.20678077268566541; ptisp=cnc; ptcz=b062b006ce39963456220087e5601343eed03f8ca077b082b3501170da06c53c; pt2gguin=o0545544032; uin=o0545544032; skey=@UExBxyw2a; uid=100414728; pgv_info=ssid=s9067698750; pgv_pvid=4489122330; o_cookie=545544032";
    private final static String GUID = "19a2e3090861a0e3e107fa4e8f4c9373";

    @Override
    public Video parse(String url) {
        Video video = new Video();
        video.setValue(url);
        String vid = getVid(url);
        JSONObject json = JSONObject.parseObject(videoInfo(vid));
        initVideo(video, json);
        return video;
    }

    @Override
    public List<Episode> parseEpisodes(String url) {
        List<Episode> episodes = new ArrayList<>();
        Document document = JsoupUtils.getDocWithPhone(url);
        Elements elements = document.select("div[data-tpl='episode'] span a");
        for (Element element : elements){
            Episode episode = new Episode();
            String value = "http://v.qq.com" + element.attr("href");
            String index = element.text();
            episode.setValue(value);
            episode.setIndex(index);
            episodes.add(episode);
        }
        if(episodes.size() < 1){
            elements = document.select("a.U_color_b");
            for (Element element : elements){
                Episode episode = new Episode();
                String value = "http://m.v.qq.com" + element.attr("href");
                String index = element.text().replace("会员", "-V");
                episode.setValue(value);
                episode.setIndex(index);
                if (!index.equals("登录")){
                    episodes.add(episode);
                }
            }
        }
        return episodes;
    }

    /**
     * 解析腾讯视频片段
     */
    public Episode parsePart(String fileName, Integer index){
        Episode episode = new Episode();
        String[] params = fileName.split("\\.");
        String file = fileName.replace("1.mp4", index + ".mp4");
        String vid = params[0];
        String format = params[1].replace("p", "10");
        String key = videoKey(vid, file, format);
        episode.setIndex(String.valueOf(index));
        episode.setValue(playUrl("/", file, key));
        return episode;
    }

    /**
     * 获取 vid
     */
    private String getVid(String url){
        Document document = JsoupUtils.getDocWithPhone(url);
        Matcher matcher = Pattern.compile("\"vid\":\"(.*?)\"").matcher(document.html());
        if (matcher.find()){
            return matcher.group(1);
        }
        return "";
    }

    /**
     * 调用腾讯接口，获取视频信息
     */
    private String videoInfo(String vid) {
        try {
            Document document = Jsoup.connect(VIDEO_API).header("Cookie", COOKIE)
                    .data("vids", vid).data("platform", "10901")
                    .data("otype", "json").data("defn", "fhd")
                    .data("defaultfmt", "auto").data("guid", GUID).ignoreContentType(true).get();
            String result = document.text().replace("QZOutputJson=", "");
            return result.substring(0, result.length() - 1);
        } catch (IOException e) {
            log.info("request tencent api error, vid : " + vid);
        }
        return "";
    }

    /**
     * 初始化视频信息
     */
    private void initVideo(Video video, JSONObject json){
        JSONObject videoJson = json.getJSONObject("vl").getJSONArray("vi").getJSONObject(0);
        int random = RandomUtils.nextInt(3);
        String url = videoJson.getJSONObject("ul").getJSONArray("ui").getJSONObject(random).getString("url");
        String vkey = videoJson.getString("fvkey");
        String fn = videoJson.getString("fn");
        String file = fn.replace("mp4", "1.mp4");
        String title = videoJson.getString("ti");
        String firstPlayUrl = playUrl(url, file, vkey);
        String size = videoJson.getJSONObject("cl").getString("fc");
        video.setPlayUrl(firstPlayUrl);
        video.setImage("");
        video.setTitle(title);
        video.setType("qq");
        video.setOther(size);
    }

    /**
     * 片段播放地址
     */
    private String playUrl(String url, String part, String vkey) {
        return url + part + "?sdtfrom=v1010&guid=" + GUID + "&vkey=" + vkey;
    }

    /**
     * 获取片段播放的 key
     */
    private String videoKey(String vid, String filename, String format) {
        try {
            Document document = Jsoup.connect(KEY_API).header("Cookie", COOKIE)
                    .data("vid", vid).data("platform", "10901")
                    .data("otype", "json").data("vt", "203")
                    .data("filename", filename).data("sdtfrom", "v1010")
                    .data("format", format).data("guid", GUID).ignoreContentType(true).get();
            String result = document.text().replace("QZOutputJson=", "");
            result =  result.substring(0, result.length() - 1);
            return  JSONObject.parseObject(result).getString("key");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }
}

package cn.ictgu.parse.video;

import cn.ictgu.bean.response.Episode;
import cn.ictgu.bean.response.Video;
import cn.ictgu.constant.ExceptionEnum;
import cn.ictgu.exception.AnyException;
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
    private final static String VIDEO_API = "http://h5vv.video.qq.com/getinfo";
    private final static String KEY_API = "http://h5vv.video.qq.com/getkey";
    private final static String COOKIE = "pgv_pvi=8764138496; RK=vQGLRHUKYP; tvfe_boss_uuid=ad92b8f6187d6ab5; login_time_init=2017-8-20 11:20:6; eas_sid=A1z5v0A3O2g0B0J2D5Z3L6q438; LW_uid=01V5m0Q3u4y5u3p9J231a948i8; ue_uid=ab7040ed4b966b7d3a5373441f04df91; ue_ts=1503500816; ue_uk=62b40f67948a56967557d9b652e8fb9f; ue_skey=fcad5c2f589f34abb84fb72ed5cd863f; LW_TS=1503500817; LW_PsKey=cb7f1de4c8bd86cdda5bbc44d16c5b3c; LW_pid=ae8a016e9a78dfd394a80346465acb94; mobileUV=1_15e0fc5b713_e36c3; LW_sid=01D560v3X9i2E7H1q8N4u2p0p1; login_time_last=2017-10-2 19:53:21; ptui_loginuin=3041836568; _ga=GA1.2.1683665787.1507542171; _gid=GA1.2.1502727203.1507542171; pgv_si=s6475018240; gid=b81b8a3c-30b1-4c18-8a7c-8d0a242083d9; ptisp=cnc; ptcz=dc0405a72e903fd13ee3dedc75b9dd35988e50a3d71c91b062bfd12689ee2ea2; pt2gguin=o0545544032; uin=o0545544032; skey=@DrTJkm7x5; IED_LOG_INFO2=userUin%3D545544032%26nickName%3DAnoy%26userLoginTime%3D1507615292; uid=100414728; o_cookie=545544032; pgv_info=ssid=s8547989812&pgvReferrer=; pgv_pvid=1685846680";
    private final static String GUID = "fb74ffcc7b14377db9cb5308e598d6e5";
    private final static String SDTFROM = "v1010";
    private final static String PLATFORM = "10901";

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
        for (Element element : elements) {
            Episode episode = new Episode();
            String value = "http://v.qq.com" + element.attr("href");
            String index = element.text();
            episode.setValue(value);
            episode.setIndex(index);
            episodes.add(episode);
        }
        if (episodes.size() < 1) {
            elements = document.select("a.U_color_b");
            for (Element element : elements) {
                Episode episode = new Episode();
                String value = "http://m.v.qq.com" + element.attr("href");
                String index = element.text().replace("会员", "-V");
                episode.setValue(value);
                episode.setIndex(index);
                if (!index.equals("登录")) {
                    episodes.add(episode);
                }
            }
        }
        return episodes;
    }

    /**
     * 解析腾讯视频片段
     */
    public Episode parsePart(String fileName, Integer index) {
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
    private String getVid(String url) {
        Document document = JsoupUtils.getDocWithPhone(url);
        Matcher matcher = Pattern.compile("\"vid\":\"(.*?)\"").matcher(document.html());
        if (matcher.find()) {
            return matcher.group(1);
        }
        throw new AnyException(ExceptionEnum.VID_CANNOT_MATCH);
    }

    /**
     * 调用腾讯接口，获取视频信息
     */
    private String videoInfo(String vid) {
        try {
            Document document = Jsoup.connect(VIDEO_API).header("Cookie", COOKIE)
                    .data("vids", vid).data("platform", PLATFORM)
                    .data("sdtfrom", SDTFROM)
                    .data("format", "10209")
                    .data("otype", "json").data("defn", "fhd")
                    .data("defaultfmt", "fhd").data("guid", GUID).ignoreContentType(true).get();
            String result = document.text().replace("QZOutputJson=", "");
            return result.substring(0, result.length() - 1);
        } catch (IOException e) {
            log.info("request tencent api error, vid : " + vid);
            throw new AnyException("request tencent api error, vid : " + vid);
        }
    }

    /**
     * 初始化视频信息
     */
    private void initVideo(Video video, JSONObject json) {
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
        return url + part + "?sdtfrom=" + "v1010" + "&guid=" + GUID + "&vkey=" + vkey;
    }

    /**
     * 获取片段播放的 key
     */
    private String videoKey(String vid, String filename, String format) {
        try {
            Document document = Jsoup.connect(KEY_API).header("Cookie", COOKIE)
                    .data("vid", vid).data("platform", PLATFORM)
                    .data("otype", "json")
                    .data("filename", filename).data("sdtfrom", SDTFROM)
                    .data("format", format).data("guid", GUID).ignoreContentType(true).get();
            String result = document.text().replace("QZOutputJson=", "");
            System.out.println(result);
            result = result.substring(0, result.length() - 1);
            return JSONObject.parseObject(result).getString("key");
        } catch (IOException e) {
            log.info("request tencent video part api error, vid : " + vid);
            throw new AnyException("request tencent api error, vid : " + vid);
        }
    }
}

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
    private final static String VIDEO_API = "http://vv.video.qq.com/getinfo";
    private final static String KEY_API = "http://vv.video.qq.com/getkey";
    private final static String COOKIE = "pgv_pvi=8764138496; RK=vQGLRHUKYP; tvfe_boss_uuid=ad92b8f6187d6ab5; tvfe_search_uid=630d832e-c681-42d1-b40a-723eba41e708; login_remember=qq; eas_sid=A1z5v0A3O2g0B0J2D5Z3L6q438; LW_uid=01V5m0Q3u4y5u3p9J231a948i8; ue_uid=ab7040ed4b966b7d3a5373441f04df91; ue_ts=1503500816; ue_uk=62b40f67948a56967557d9b652e8fb9f; ue_skey=fcad5c2f589f34abb84fb72ed5cd863f; LW_TS=1503500817; LW_PsKey=cb7f1de4c8bd86cdda5bbc44d16c5b3c; LW_pid=ae8a016e9a78dfd394a80346465acb94; mobileUV=1_15e0fc5b713_e36c3; LW_sid=01D560v3X9i2E7H1q8N4u2p0p1; luin=o0545544032; lskey=0001000005518d26e6dad5d2bd3077ac672ad2e585c039481344d864c741806fb2fb457351669ba8ae0435f4; ts_refer=film.qq.com/; ptui_loginuin=228701992; ptcz=dc0405a72e903fd13ee3dedc75b9dd35988e50a3d71c91b062bfd12689ee2ea2; pt2gguin=o0545544032; main_login=qq; encuin=f4e7225172efe340bcfe344f11a106c5|545544032; lw_nick=Anoy|545544032|//thirdqq.qlogo.cn/g?b=sdk&k=cCwJCaXUjR9ySsCVyu8Rfw&s=40&t=1488113923|1; ptag=; pgv_info=ssid=s3245979536; ts_last=v.qq.com/; pgv_pvid=1685846680; o_cookie=545544032; ts_uid=5590511376; ad_play_index=100";

    private final static String GUID = "fb74ffcc7b14377db9cb5308e598d6e5";

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
                    .data("vids", vid).data("platform", "10901")
                    .data("otype", "json").data("defn", "fhd")
                    .data("defaultfmt", "auto").data("guid", GUID).ignoreContentType(true).get();
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
        return url + part + "?sdtfrom=v1010&platform=2&guid=" + GUID + "&vkey=" + vkey;
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
            result = result.substring(0, result.length() - 1);
            return JSONObject.parseObject(result).getString("key");
        } catch (IOException e) {
            log.info("request tencent video part api error, vid : " + vid);
            throw new AnyException("request tencent api error, vid : " + vid);
        }
    }
}

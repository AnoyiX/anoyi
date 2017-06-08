package cn.ictgu.parse.video;

import cn.ictgu.dto.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.serv.model.Episode;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringEscapeUtils;
import org.jsoup.nodes.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 乐视视频解析
 * Created by Silence on 2017/1/7.
 */
public class Letv implements Parser<Video> {

    private final static String PROVIDER = "乐视视频";
    private final static String cookie = "ark_uuid=d966d5301be94c5bb8fae78b9cd3038e; vjuids=-8a183d9b7.157666171cd.0.43147ea3e2342; OUTFOX_SEARCH_USER_ID_NCOO=410937176.92591244; tj2_lc=c9b56fa67fdcfb1a73c5fa08ac1cb90f; lb_live_c=105; leBlockOrder=8310%2C8526%2C8527%2C8313%2C8314%2C8315%2C8316%2C8317%2C8318%2C8319%2C8320%2C9471%2C8321%2C8322%2C8323%2C8324%2C8325%2C8326%2C8327%2C8328%2C8329%2C8330; _ga=GA1.2.15673798.1487080015; ws_live_c=84; currentLeft_miniPlayer=825; currentTop_miniPlayer=335; his_vid=27931278-27931200-28044388-27853094-27832999-27832992-27832988-27835220-27827468-27678466; m=letv_541bebab7973e32; sso_tk=102XXXY37RkeUCWkYNfggm1qdBtaOGkslkm3McsOlsyhH0Mm1wp8PzW2x3o7NlSxscm1VWgttK1EgwNCBGbb5vN74WkJm21jIVAoc1S52v8qYizuwm3eOGsm4; sso_nickname=1816xxx7640_108; casflag=1; ssouid=67945963; loginname=18164177640; loginnamecookie=18164177640; sso_picture=https%3A%2F%2Fi0.letvimg.com%2Fimg%2F201207%2F30%2Ftx70.png; sso_icon=https%3A%2F%2Fi1.letvimg.com%2Fimg%2F201207%2F30%2Ftx298.png%2Chttps%3A%2F%2Fi0.letvimg.com%2Fimg%2F201207%2F30%2Ftx200.png%2Chttps%3A%2F%2Fi0.letvimg.com%2Fimg%2F201207%2F30%2Ftx70.png%2Chttps%3A%2F%2Fi3.letvimg.com%2Fimg%2F201207%2F30%2Ftx50.png; utype=101; lfrom=www; u=eyJ1aWQiOiI2Nzk0NTk2MyIsIm5pY2tuYW1lIjoiMTgxNnh4eDc2NDBfMTA4IiwiZW1haWwiOiIiLCJuYW1lIjoibGV0dl81NDFiZWJhYjc5NzNlMzIiLCJzc291aWQiOiI2Nzk0NTk2MyJ9; ui=581fizEM5bz6IZHUOuUZzXSd821BxHUKhXBiwCqR98Aji%2BowYKCNmaTcRvcWZ7usBIkzJJMVKrZfYMtHHkcqZZlkbWujmPibe%2BcuMzJWQJ6tGsAN0bp1fcdccUrpybaG6Gl0eUaLEJsAJ6OinRt4wOROZxGTQdqzHvaaSgzkSStxGyyx7TYudOs; IPX_EX_1=1490575896599; ARK_IPX=27.21.127.215X27.21.6.118; IPX_EX_0=1490575896997; vjlast=1474891445.1490575893.11; _search=%E4%B8%89%E7%94%9F%E4%B8%89%E4%B8%96%2C%E6%96%97%E7%A0%B4%E8%8B%8D%E7%A9%B9%2C%E6%96%97%E6%88%98%E8%83%9C%E4%BD%9B%2C%E7%88%B5%E8%BF%B9%2C%E5%85%B0%E9%99%B5%E7%8E%8B%E5%A6%83%2C%E5%98%BF%E5%AD%A9%E5%AD%90; tj_env=1; bd_xid=178D3CF87F892133E76A7BBEB78C903E70564321; csrf=950b2b7fa61d6b3a2c65; sso_curr_country=CN; language=zh-cn; tj_uuid=14906735156053151055; tj_v2c=-28463173_2; logInPlayTime=1; newVideo=%7B%221%22%3A13%2C%222%22%3A95%2C%223%22%3A147%2C%224%22%3A590%2C%225%22%3A25%2C%228%22%3A8%2C%229%22%3A79%2C%2211%22%3A100%2C%2214%22%3A51%2C%2216%22%3A7%2C%2217%22%3A0%2C%2219%22%3A0%2C%2220%22%3A176%2C%2222%22%3A47%2C%2223%22%3A13%2C%2230%22%3A18473%2C%2232%22%3A0%2C%2233%22%3A0%2C%2234%22%3A7%2C%2235%22%3A0%2C%2236%22%3A2%2C%2238%22%3A0%2C%2239%22%3A23%2C%2240%22%3A0%2C%2242%22%3A0%2C%2243%22%3A0%2C%2245%22%3A18%2C%2246%22%3A0%2C%2247%22%3A0%2C%2248%22%3A0%2C%2249%22%3A0%2C%2250%22%3A0%2C%2251%22%3A0%2C%2252%22%3A0%2C%2253%22%3A0%2C%2254%22%3A0%2C%2255%22%3A0%2C%2256%22%3A1%2C%2260%22%3A0%2C%2261%22%3A0%2C%22200%22%3A1%2C%22333%22%3A0%2C%221009%22%3A1522%2C%221021%22%3A129%2C%221029%22%3A53%2C%221035%22%3A0%7D; tj_lc=178D3CF87F892133E76A7BBEB78C903E70564321; lang=zh_cn; geo=CN_17_223_3; fe_uv=1; _starttips1_=1490673526428; autoOpenApp=1";
    private final static String ROUTE = "http://player-pc.le.com/mms/out/video/playJson.json?platid=3&splatid=304&tss=no&id=%s&detect=1&dvtype=1300&accessyx=1&domain=www.le.com&tkey=%s&devid=178D3CF87F892133E76A7BBEB78C903E70564321&source=1001&lang=cn&region=cn&isHttps=0";
    private final static String VIP_LOCATION = "%s%s&token=%s&uid=67945963&format=1&jsonp=vjs_149067353337651&expect=3&p1=0&p2=06&termid=2&ostype=macos&hwtype=un&uuid=1891087902108532_1&vid=%s&";
    private static final String LETV_VIDEOS = "http://d.api.m.le.com/apipccard/dynamic?cid=2&vid=%s&platform=pc&isvip=1&type=episode,Cotherlist";
    private final static String VID_REGEX = "([0-9]+)\\.html";
    private final static String[] DIS_LIST = {"1300", "1000", "350"};

    @Override
    public Video parse(String url) {
        final Video video = new Video();
        video.setValue(url);
        this.initVideo(video);
        String vid = this.matchVid(url);
        String routeUrl = String.format(ROUTE, vid, getTkey());
        Document document = JsoupUtils.getDocWithPhone(routeUrl, cookie);
        JSONObject object = JSONObject.parseObject(document.text());
        JSONObject playurl = object.getJSONObject("msgs").getJSONObject("playurl");
        String title = playurl.getString("title");
        video.setTitle(title);
        String image = playurl.getString("pic").replace("120_90", "360_180");
        video.setImage(image);
        String domain = playurl.getJSONArray("domain").getString(0);
        String dispatch = getDispatch(playurl.getJSONObject("dispatch"));
        JSONObject yuanxian = object.getJSONObject("msgs").getJSONObject("yuanxian");
        String locationUrl;
        if (yuanxian != null) {
            String token = yuanxian.getString("token");
            locationUrl = String.format(VIP_LOCATION, domain, dispatch, token, vid);
        } else {
            locationUrl = String.format(VIP_LOCATION, domain, dispatch, "", vid);
        }
        Document result = JsoupUtils.getDocWithPhone(locationUrl);
        String text = StringEscapeUtils.unescapeJava(result.text());
        text = text.replace("vjs_149067353337651(", "");
        text = text.replace(");", "");
        JSONObject videoJson = JSONObject.parseObject(text);
        video.setPlayUrl(videoJson.getJSONArray("nodelist").getJSONObject(0).getString("location"));
        return video;
    }

    @Override
    public List<Episode> parseEpisodes(String videoUrl) {
        List<Episode> episodes = new ArrayList<>();
        Document document = JsoupUtils.getDocWithPhone(videoUrl);
        Matcher matcher = Pattern.compile("([0-9]{5,})\\.html").matcher(document.html());
        if (matcher.find()) {
            String vid = matcher.group(1);
            String videosAPI = String.format(LETV_VIDEOS, vid);
            String data = JsoupUtils.getDocWithPhone(videosAPI).body().text();
            JSONObject jsonObject = JSONObject.parseObject(data);
            JSONArray array = jsonObject.getJSONObject("data").getJSONObject("episode").getJSONArray("videolist");
            if (array.size() > 1) {
                for (int i = array.size() - 1; i >= 0; i--) {
                    JSONObject object = array.getJSONObject(i);
                    Episode episode = new Episode();
                    Integer index = object.getInteger("episode");
                    if (index < 10) {
                        episode.setIndex("0" + index);
                    } else {
                        episode.setIndex("" + index);
                    }
                    episode.setValue(object.getString("url"));
                    episodes.add(episode);
                }
            }
        }
        return episodes;
    }

    /**
     * 初始化视频信息
     */
    private void initVideo(Video video) {
        video.setProvider(PROVIDER);
        video.setParserName("Github");
        video.setParser("http://github.com");
        video.setType("H5");
    }

    /**
     * 从 URL 中匹配 VID
     */
    private String matchVid(String videoUrl) {
        Matcher matcher = Pattern.compile(VID_REGEX).matcher(videoUrl);
        if (matcher.find()) {
            return matcher.group(1);
        } else {
            Document realDocument = JsoupUtils.getDocWithPC(videoUrl);
            matcher = Pattern.compile("vid:\"(.*?)\"").matcher(realDocument.html());
            if (matcher.find())
                return matcher.group(1);
        }
        return "";
    }

    /**
     * 获取最清晰的视频线路
     */
    private String getDispatch(JSONObject dispatch) {
        for (String dis : DIS_LIST) {
            if (dispatch.containsKey(dis)) {
                return dispatch.getJSONArray(dis).getString(0);
            }
        }
        return null;
    }

    /**
     *  乐视tkey算法
     */
    private static String getTkey() {
        int a = (int) (new Date().getTime() / 1000);
        for (int i = 0; i < 8; i++) {
            int b = a >> 1;
            int c = (0x1 & a) << 31;
            a = b + c;
        }
        int result = 0xB074319 ^ a;
        return "" + result;
    }

}

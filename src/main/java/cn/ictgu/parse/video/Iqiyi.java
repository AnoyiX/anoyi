package cn.ictgu.parse.video;

import cn.ictgu.bean.response.Episode;
import cn.ictgu.bean.response.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Iqiyi implements Parser<Video> {

    private final static String NODE_SERVER = "http://j.ictgu.cn:3000/";
    // 加密参数
    private final static String PARAM = "/dc/amt/fdeeabb351ccdafaf7842a8e76f8d65b/%s/%s/?qypid=%s&src=03020031010000000000&qdv=1&qdx=n&qdy=x&qds=0&__jsT=sgve&t=%s";
    // 播放地址 API
    private final static String API = "http://cache.m.iqiyi.com%s&vf=%s";
    // 集数 API
    private final static String LIST_API = "http://cache.video.qiyi.com/jp/avlist/%s/1/";

    @Override
    public Video parse(String url) {
        Video video = new Video();
        video.setValue(url);
        String tvId = null, vId = null;
        Document mainDoc = JsoupUtils.getDocWithPad(url);
        Matcher matcher = Pattern.compile("vid:\"(.*?)\"").matcher(mainDoc.html());
        if (matcher.find()) {
            vId = matcher.group(1);
        }else{
            Elements elements = mainDoc.select("div.coverContainer a");
            String firstEpisode;
            if (elements == null || elements.size() == 0){
                firstEpisode = mainDoc.select("a.site-piclist_pic_link").get(0).attr("href");
            }else {
                firstEpisode = mainDoc.select("div.coverContainer a").get(0).attr("href");
            }
            mainDoc = JsoupUtils.getDocWithPad(firstEpisode);
            matcher = Pattern.compile("vid:\"(.*?)\"").matcher(mainDoc.html());
            if (matcher.find()){
                vId = matcher.group(1);
            }
        }
        matcher = Pattern.compile("tvId:(.*?),").matcher(mainDoc.html());
        if (matcher.find()) {
            tvId = matcher.group(1);
        }
        String title = mainDoc.select("a#widget-videotitle").text();
        video.setTitle(title);
        Date now = new Date();
        String param = String.format(PARAM, tvId, vId, tvId + "_21", now.getTime());
        String vf;
        try {
            vf = getVf(param);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        String api = String.format(API, param, vf);
        Document resultDoc = JsoupUtils.getDocWithPad(api);
        JSONObject json = JSONObject.parseObject(resultDoc.text());
        String playUrl = json.getJSONObject("data").getString("mu");
        video.setPlayUrl(playUrl);
        return video;
    }

    @Override
    public List<Episode> parseEpisodes(String url) {
        List<Episode> episodes = new ArrayList<>();
        Document mainDoc = JsoupUtils.getDocWithPad(url);
        String albumId = mainDoc.select("a#widget-favourite").attr("data-subscribe-subkey");
        if (StringUtils.isEmpty(albumId)){
            Matcher matcher = Pattern.compile("albumid=\"(.*?)\"").matcher(mainDoc.html());
            if (matcher.find()){
                albumId = matcher.group(1);
            }
        }
        String listApi = String.format(LIST_API, albumId);
        String listJson = JsoupUtils.getDocWithPad(listApi).text();
        listJson = listJson.replace("var tvInfoJs=", "");
        JSONArray array = JSONObject.parseObject(listJson).getJSONObject("data").getJSONArray("vlist");
        for (int i = 0; i < array.size(); i++) {
            JSONObject object = array.getJSONObject(i);
            Integer pb = object.getInteger("pd");
            String index = pb > 9 ? String.valueOf(pb) : "0" + pb;
            String value = object.getString("vurl");
            episodes.add(new Episode(index, value));
        }
        return episodes;
    }

    // 调用 Node 计算 vf 的值
    private static String getVf(String param) throws Exception {
        JSONObject requestBody = new JSONObject();
        requestBody.put("type", "iqiyi");
        requestBody.put("param", param);
        return Jsoup.connect(NODE_SERVER).requestBody(requestBody.toJSONString()).post().text();
    }
}

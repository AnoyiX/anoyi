package cn.ictgu.parse.video;

import cn.ictgu.bean.response.Episode;
import cn.ictgu.bean.response.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * 优酷视频解析
 */
@Log4j2
public class Youku implements Parser<Video> {

    @Override
    public Video parse(String url) {
        final Video video = new Video();
        video.setValue(url);
        String vid = matchVid(url);
        if (StringUtils.isEmpty(vid)) {
            return null;
        }
        String api = createPlayRequestApi(vid);
        try {
            String result = getResponse(api);
            JSONObject json = JSONObject.parseObject(result);
            JSONObject videoInfo = json.getJSONObject("data").getJSONObject("video");
            String title = videoInfo.getString("title");
            video.setTitle(title);
            String image = videoInfo.getString("logo");
            video.setImage(image);
            String playUrl = getPlayUrl(json);
            video.setPlayUrl(playUrl);
        } catch (IOException io) {
            log.error("Youku request error:" + url);
            return null;
        }
        return video;
    }

    @Override
    public List<Episode> parseEpisodes(String url) {
        List<Episode> episodes = new ArrayList<>();
        String vid = matchVid(url);
        if (StringUtils.isEmpty(vid)) {
            return null;
        }
        String api = createPlayRequestApi(vid);
        try {
            String result = getResponse(api);
            JSONObject json = JSONObject.parseObject(result);
            String id = json.getJSONObject("data").getJSONObject("video").getString("id");
            String showId = json.getJSONObject("data").getJSONObject("show").getString("id");
            String cateId = json.getJSONObject("data").getJSONObject("video").getString("category_id");
            String episodeApi = createEpisodeRequestApi(id, showId, cateId);
            String response = getResponse(episodeApi);
            JSONObject jsonResult = JSONObject.parseObject(response);
            JSONArray items = jsonResult.getJSONObject("data").getJSONArray("items");
            for (int i = 0; i < items.size(); i++) {
                Episode episode = new Episode();
                JSONObject item = items.getJSONObject(i);
                String index = item.getString("show_videostage");
                String value = "http://v.youku.com/v_show/id_" + item.getString("videoid") + ".html";
                if (Integer.valueOf(index) < 10) {
                    index = "0" + index;
                }
                episode.setIndex(index);
                episode.setValue(value);
                episodes.add(episode);
            }
        } catch (IOException io) {
            log.error("Youku request error:" + url);
            return null;
        }
        return episodes;
    }

    /**
     * 从 URL 中匹配 VID
     */
    private String matchVid(String videoUrl) {
        Matcher matcher = Pattern.compile("id_(.*?)\\.html").matcher(videoUrl);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    /**
     * 获取最清晰的视频线路
     */
    private String getPlayUrl(JSONObject json) {
        JSONArray playList = json.getJSONObject("data").getJSONArray("stream");
        JSONObject bestStream = playList.getJSONObject(playList.size() - 1);
        log.info("video level:" + bestStream.getString("stream_type"));
        return bestStream.getString("m3u8_url");
    }


    /**
     * 构建视频播放信息的 API
     */
    private String createEpisodeRequestApi(String vid, String showId, String cateId) {
        return "http://api.m.youku.com/api/showlist/getshowlist?vid=" + vid + "&showid=" + showId + "&cateid=" + cateId + "&pagesize=98&page=0";
    }

    /**
     * 构建视频集数信息的 API
     */
    private String createPlayRequestApi(String vid) {
        Date now = new Date();
        String client_ts = String.valueOf(now.getTime() / 100);
        return "http://ups.youku.com/ups/get.json?vid=" + vid + "&ccode=0590&client_ip=0.0.0.0&client_ts=" + client_ts + "&utid=KXWiEVieAS8CAWUtEplT9%2FtJ";
    }

    /**
     * 获取 HTTP 请求返回的结果
     */
    private String getResponse(String api) throws IOException {
        URL url = new URL(api);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.addRequestProperty("user-agent", JsoupUtils.getUaPhone());
        connection.connect();
        if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
            // 得到响应信息
            InputStream is = connection.getInputStream();
            byte[] bs = new byte[1024];
            int len;
            StringBuilder sb = new StringBuilder();
            while ((len = is.read(bs)) != -1) {
                String str = new String(bs, 0, len);
                sb.append(str);
            }
            return sb.toString();
        }
        return null;
    }

}

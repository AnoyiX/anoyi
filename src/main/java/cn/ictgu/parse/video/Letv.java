package cn.ictgu.parse.video;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.nodes.Document;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import cn.ictgu.dao.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.tools.JsoupUtils;

/**
 * 乐视视频解析 Created by Silence on 2017/1/7.
 */
public class Letv extends AllVideoParser {
	private final static String PROVIDER = "乐视视频";
	private static final String LETV_VIDEOS = "http://d.api.m.le.com/apipccard/dynamic?cid=2&vid=%s&platform=pc&isvip=1&type=episode,Cotherlist";
	private static final String IMAGE_REGEX = "property=\"og:image\" content=\"(.*?)\"";

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

	@Override
	Video initVideo() {
		Video video = new Video();
		video.setProvider(PROVIDER);
		video.setType("H5");
		return video;
	}

	@Override
	void crawlerTitleAndImage(String url, Video video) {
		Document document = JsoupUtils.getDocWithPhone(url);
		String title = document.select("title").text().replace("_手机乐视视频", "");
		video.setTitle(title);
		Matcher matcher = Pattern.compile(IMAGE_REGEX).matcher(document.html());
		if (matcher.find()) {
			String image = matcher.group(1);
			image = image.replaceAll("/thumb/.*?jpg", "/thumb/2_360_180.jpg");
			video.setImage(image);
		}
	}

}

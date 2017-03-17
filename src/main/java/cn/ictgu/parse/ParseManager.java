package cn.ictgu.parse;

import cn.ictgu.dto.Video;
import cn.ictgu.parse.video.Imooc;
import cn.ictgu.parse.video.Iqiyi;
import cn.ictgu.parse.video.Letv;
import cn.ictgu.parse.video.Mgtv;
import cn.ictgu.parse.video.Qq;
import cn.ictgu.parse.video.Sohu;
import cn.ictgu.parse.video.Youku;
import cn.ictgu.tools.UrlUtils;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 解析器
 * Created by Silence on 2017/1/5.
 */
@Component
@Log4j
public class ParseManager {

  @Autowired
  private StringRedisTemplate redisTemplate;

  private Map<String, Parser> parserMap;

  public ParseManager(){
    parserMap = new HashMap<>();
    parserMap.put("iqiyi.com", new Iqiyi());
    parserMap.put("le.com", new Letv());
    parserMap.put("mgtv.com", new Mgtv());
    parserMap.put("sohu.com", new Sohu());
    parserMap.put("youku.com", new Youku());
    parserMap.put("qq.com", new Qq());
    parserMap.put("imooc.com", new Imooc());
  }

  public Parser getVideoParse(String key){
    return parserMap.get(key);
  }

  public Video parseVideo(String url){
    String cacheValue = redisTemplate.opsForValue().get(url);
    Video video;
    if (StringUtils.isEmpty(cacheValue)){
      log.info("开始解析：" + url);
      String key = UrlUtils.getTopDomain(url);
      Parser videoParse = this.getVideoParse(key);
      video = (Video) videoParse.parse(url);
      this.cacheVideoInfo(url, video);
    }else {
      log.info("开始获取缓存信息：" + url);
      video = JSONObject.parseObject(cacheValue, Video.class);
    }
    log.debug("VIDEO: "+ JSONObject.toJSONString(video));
    return video;
  }

  @Async
  private void cacheVideoInfo(String url, Video video){
    log.info("缓存视频：" + url);
    String value = JSONObject.toJSONString(video);
    redisTemplate.opsForValue().set(url, value);
    redisTemplate.expire(url, 3, TimeUnit.HOURS);
  }

}

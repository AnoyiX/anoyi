package cn.ictgu.parse;

import cn.ictgu.dto.Video;
import cn.ictgu.exception.ParserNotFoundException;
import cn.ictgu.parse.article.Weixin;
import cn.ictgu.parse.video.Imooc;
import cn.ictgu.parse.video.Letv;
import cn.ictgu.parse.video.Panda;
import cn.ictgu.tools.UrlUtils;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by Silence on 2017/4/14.
 */
@Service
@Log4j2
public class VideoParserManager implements ParserManager {

    private final StringRedisTemplate redisTemplate;

    private Map<String, Parser> parserMap;

    /**
     * 初始化所有解析器
     */
    public VideoParserManager(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
        parserMap = new HashMap<>();
        parserMap.put("le.com", new Letv());
        parserMap.put("imooc.com", new Imooc());
        parserMap.put("panda.tv", new Panda());
        parserMap.put("qq.com", new Weixin());
    }

    /**
     * 解析资源
     */
    public Object parse(String url) {
        String cacheValue = redisTemplate.opsForValue().get(url);
        Object source;
        if (StringUtils.isEmpty(cacheValue)) {
            log.info("No cache, begin parse: " + url);
            String key = UrlUtils.getTopDomain(url);
            log.info("Parser key: " + key);
            Parser parser = this.getParser(key);
            if (parser == null){
                throw new ParserNotFoundException();
            }
            source = parser.parse(url);

            // 如果是视频类型的资源则缓存
            if (source instanceof Video){
                this.cacheVideoInfo(url, source);
            }
        } else {

            // 有缓存，则说明是视频资源，将缓存内容解析为 Video 对象
            log.info("Get cache info：" + url);
            source = JSONObject.parseObject(cacheValue, Video.class);
        }

        return source;
    }

    /**
     * 获取解析器
     * @param key 一般为 url 中的顶级域名
     */
    public Parser getParser(String key) {
        return parserMap.get(key);
    }

    /**
     * 缓存视频信息
     */
    private void cacheVideoInfo(String url, Object video) {
        if (StringUtils.isNotEmpty(((Video)video).getPlayUrl())) {
            log.info("Cache video：" + url);
            String value = JSONObject.toJSONString(video);
            redisTemplate.opsForValue().set(url, value);
            redisTemplate.expire(url, 3, TimeUnit.HOURS);
        }
    }

}



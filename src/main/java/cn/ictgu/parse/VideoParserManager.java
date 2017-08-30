package cn.ictgu.parse;

import cn.ictgu.constant.ExceptionEnum;
import cn.ictgu.exception.AnyException;
import cn.ictgu.parse.article.Jianshu;
import cn.ictgu.parse.article.Weixin;
import cn.ictgu.parse.video.*;
import cn.ictgu.tools.UrlUtils;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Log4j2
public class VideoParserManager implements ParserManager {

    private Map<String, Parser> parserMap;

    /**
     * 初始化所有解析器
     */
    public VideoParserManager() {
        parserMap = new HashMap<>();
        parserMap.put("le.com", new Letv());
        parserMap.put("panda.tv", new Panda());
        parserMap.put("weixin.qq.com", new Weixin());
        parserMap.put("jianshu.com", new Jianshu());
        parserMap.put("youku.com", new Youku());
        parserMap.put("iqiyi.com", new Iqiyi());
        parserMap.put("v.qq.com", new Tencent());
        parserMap.put("v.youku.com", new Youku());
    }

    /**
     * 解析资源
     */
    public Object parse(String url) {
        String key = UrlUtils.getTopDomain(url);
        log.info("Parser key: " + key);
        Parser parser = this.getParser(key);
        if (parser == null) {
            throw new AnyException(ExceptionEnum.NO_PARSER);
        }
        return parser.parse(url);
    }

    /**
     * 获取解析器
     *
     * @param key 一般为 url 中的顶级域名
     */
    public Parser getParser(String key) {
        return parserMap.get(key);
    }

}



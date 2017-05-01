package cn.ictgu.parse;

import cn.ictgu.dto.Article;
import cn.ictgu.dto.Video;

/**
 * 解析器管理器
 * Created by Silence on 2017/1/5.
 */
public interface ParserManager {

  /**
   * 依据 key 获取对应的解析器
   * @param key 一般为 url 中的顶级域名
   * @return 解析器
   */
  Parser getParser(String key);

  /**
   * 从 url 中解析视频信息
   * @param url 视频地址
   * @return 视频信息
   */
  Video parseVideo(String url);

  /**
   * 从 url 中解析文章信息
   * @param url 文章地址
   * @return 文章信息
   */
  Article parseArticle(String url);

}

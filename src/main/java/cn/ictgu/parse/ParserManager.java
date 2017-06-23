package cn.ictgu.parse;

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
   * 从 url 中解析资源
   * @param url 目标资源地址
   * @return 资源信息
   */
  Object parse(String url);

}

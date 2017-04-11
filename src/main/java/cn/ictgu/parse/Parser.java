package cn.ictgu.parse;

import cn.ictgu.serv.model.Episode;

import java.util.List;

/**
 * 解析器
 *
 * Created by Silence on 2017/3/15.
 */
public interface Parser<T> {

  /**
   * 从某个Url中解析数据到对应的模型
   * @param url 资源地址
   * @return 数据模型（如VIDEO，ARTICLE等等）
   */
  T parse(String url);

  /**
   * 从某个Url中解析相关联的数据
   * @param url 资源地址
   * @return 相关资源索引 + 地址
   */
  List<Episode> parseEpisodes(String url);

}

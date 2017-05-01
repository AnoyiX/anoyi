package cn.ictgu.parse.article;

import cn.ictgu.dto.Article;
import cn.ictgu.parse.Parser;
import cn.ictgu.serv.model.Episode;
import cn.ictgu.tools.JsoupUtils;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.List;

/**
 * 博客解析 http://blog.didispace.com/
 * Created by Silence on 2017/5/1.
 */
public class Didispace implements Parser<Article>{

  private static final String PROVIDER = "程序员DD";

  @Override
  public Article parse(String url) {
    Article article = new Article();
    this.initArticle(article);
    article.setValue(url);
    Document document = JsoupUtils.getDocWithPC(url);
    String title = document.select("h1.article-title").text();
    article.setTitle(title);
    String time = document.select("time").text();
    article.setTime(time);
    Element element = document.select("div.article-entry").get(0);
    element.select("div.alert").remove();
    element.select("div#donate_module").remove();
    element.select("style").remove();
    String content = element.html();
    article.setContent(content);
    return article;
  }

  @Override
  public List<Episode> parseEpisodes(String url) {
    return null;
  }

  private void initArticle(Article article){
    article.setProvider(PROVIDER);
    article.setParserName("Github");
    article.setParser("http://github.com");
    article.setAuthor("翟永超");
    article.setImage("http://blog.didispace.com/css/images/weixin.jpg");
  }

}

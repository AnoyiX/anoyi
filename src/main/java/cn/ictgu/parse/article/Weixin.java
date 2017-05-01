package cn.ictgu.parse.article;

import cn.ictgu.dto.Article;
import cn.ictgu.parse.Parser;
import cn.ictgu.serv.model.Episode;
import cn.ictgu.tools.JsoupUtils;
import org.jsoup.nodes.Document;

import java.util.List;

/**
 * 微信文章解析
 * Created by Silence on 2017/5/1.
 */
public class Weixin implements Parser<Article>{

  private static final String PROVIDER = "微信";

  @Override
  public Article parse(String url) {
    final Article article = new Article();
    this.initArticle(article);
    article.setValue(url);
    Document document = JsoupUtils.getDocWithPC(url);
    String title = document.select("title").text();
    article.setTitle(title);
    String time = document.select("em#post-date").text();
    article.setTime(time);
    String author = document.select("a#post-user").text();
    article.setAuthor(author);
    String content = document.select("div#js_content").html();
    content = content.replaceAll("data-src", "width=\"100%\" src");
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
  }

}

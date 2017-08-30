package cn.ictgu.parse.article;

import cn.ictgu.bean.response.Article;
import cn.ictgu.bean.response.Episode;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.JsoupUtils;
import org.jsoup.nodes.Document;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 微信文章解析
 */
public class Weixin implements Parser<Article> {

    private static final String PROVIDER = "微信";

    private Pattern pattern;

    public Weixin(){
        pattern = Pattern.compile("msg_cdn_url = \"(.*?)\"");
    }

    @Override
    public Article parse(String url) {
        final Article article = new Article();
        article.setProvider(PROVIDER);
        article.setValue(url);
        Document document = JsoupUtils.getDocWithPC(url);
        String title = document.select("title").text();
        article.setTitle(title);
        String time = document.select("em#post-date").text();
        article.setTime(time);
        String author = document.select("a#post-user").text();
        article.setAuthor(author);
        String content = document.select("div#js_content").html();
        content = content.replaceAll("data-src", "width=\"80%\" src");
        article.setContent(content);
        Matcher matcher = pattern.matcher(document.html());
        if (matcher.find()){
            article.setImage(matcher.group(1));
        }
        return article;
    }

    @Override
    public List<Episode> parseEpisodes(String url) {
        return null;
    }

}

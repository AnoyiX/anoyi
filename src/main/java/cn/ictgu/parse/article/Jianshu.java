package cn.ictgu.parse.article;

import cn.ictgu.bean.response.Article;
import cn.ictgu.bean.response.Episode;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.JsoupUtils;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Jianshu implements Parser<Article> {

    private static final String PROVIDER = "简书";

    private Pattern pattern;

    public Jianshu(){
        pattern = Pattern.compile("img.*?src=\"(.*?)\"");
    }

    @Override
    public Article parse(String url) {
        final Article article = new Article();
        this.initArticle(article);
        article.setValue(url);
        Document document = JsoupUtils.getDocWithPC(url);
        String title = document.select("meta[property=og:title]").attr("content");
        article.setTitle(title);
        String time = document.select("span.publish-time").text();
        article.setTime(time);
        String author = document.select("span.name").text();
        article.setAuthor(author);
        String content = document.select("div.show-content").html();
        content = content.replaceAll("<img", "<img class=\"ui centered image\" width=\"100%\"");
        content = content.replaceAll("image-caption", "ui center aligned header");
        content = content.replaceAll("<table>", "<table class='ui table'>");
        article.setContent(content);
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()){
            article.setImage(matcher.group(1));
        }
        article.setCss("/css/jianshu.css");
        return article;
    }

    @Override
    public List<Episode> parseEpisodes(String url) {
        return null;
    }

    private void initArticle(Article article) {
        article.setProvider(PROVIDER);
        article.setParserName("Github");
        article.setParser("http://github.com");
    }
}

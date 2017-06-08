package cn.ictgu.controller;

import cn.ictgu.dto.Article;
import cn.ictgu.dto.Video;
import cn.ictgu.parse.ParserManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Silence on 2017/1/7.
 */
@Controller
@AllArgsConstructor
public class SourceController {

  private final ParserManager parseManager;

  /**
   * 视频播放页
   */
  @GetMapping("/play")
  public String play(HttpServletRequest request, Model model){
    String url = request.getParameter("v");
    url = url.replaceAll("\\?(spm|from).*" , "");
    Video video = parseManager.parseVideo(url);
    model.addAttribute("video", video);
    return "h5-video";
  }

  /**
   * 文章展示页
   */
  @GetMapping("/article")
  public String source(HttpServletRequest request, Model model){
    String url = request.getParameter("u");
    Article article = parseManager.parseArticle(url);
    model.addAttribute("article", article);
    return "h5-article";
  }

}

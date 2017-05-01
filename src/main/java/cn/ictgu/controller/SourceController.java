package cn.ictgu.controller;

import cn.ictgu.dto.Article;
import cn.ictgu.dto.Video;
import cn.ictgu.parse.ParserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 视频播放
 * Created by Silence on 2017/1/7.
 */
@Controller
public class SourceController {

  @Autowired
  private ParserManager parseManager;

  /* 视频播放页 */
  @GetMapping("/play")
  public String play(HttpServletRequest request, Model model){
    String url = request.getParameter("v");
    url = url.replaceAll("\\?(spm|from).*" , "");
    Video video = parseManager.parseVideo(url);
    model.addAttribute("video", video);
    return "h5-video";
  }

  @GetMapping("/article")
  public String source(HttpServletRequest request, Model model){
    String url = request.getParameter("u");
    Article article = parseManager.parseArticle(url);
    model.addAttribute("article", article);
    return "h5-article";
  }

}

package cn.ictgu.controller;

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
  @GetMapping("/view")
  public String play(HttpServletRequest request, Model model){
    String url = request.getParameter("u");
    url = url.replaceAll("\\?(spm|from).*" , "");
    Object source = parseManager.parse(url);
    model.addAttribute("source", source);
    if (source instanceof Video){
        return "h5-video";
    }
    return "h5-article";
  }

}

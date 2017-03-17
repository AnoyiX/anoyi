package cn.ictgu.controller;

import cn.ictgu.dto.Video;
import cn.ictgu.parse.ParseManager;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 视频播放
 * Created by Silence on 2017/1/7.
 */
@Controller
public class VideoController {

  @Autowired
  private ParseManager parseManager;

  /* 视频播放页 */
  @RequestMapping(value = "/play", method = RequestMethod.GET)
  public String play(HttpServletRequest request, Model model){
    String url = request.getParameter("v");
    url = url.replaceAll("\\?(spm|from).*" , "");
    Video video = parseManager.parseVideo(url);
    model.addAttribute("video", video);
    return "play-h5";
  }

}

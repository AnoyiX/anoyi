package cn.ictgu.API;

import cn.ictgu.serv.model.Episode;
import cn.ictgu.dto.Video;
import cn.ictgu.parse.ParserManager;
import cn.ictgu.parse.Parser;
import cn.ictgu.tools.UrlUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Video 请求接口
 * Created by Silence on 2016/12/6.
 */
@RestController
public class VideoAPI {

  @Autowired
  private ParserManager parseManager;

  @GetMapping("/api/video")
  public Video play(HttpServletRequest request){
    String url = request.getParameter("v");
    url = url.replaceAll("\\?(spm|from).*" , "");
    return parseManager.parseVideo(url);
  }

  @GetMapping("/api/episode")
  public List<Episode> episodes(HttpServletRequest request){
    String url = request.getParameter("v");
    url = url.replaceAll("\\?(spm|from).*" , "");
    String key = UrlUtils.getTopDomain(url);
    Parser videoParse = parseManager.getParser(key);
    return videoParse.parseEpisodes(url);
  }

}

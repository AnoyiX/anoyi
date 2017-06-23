package cn.ictgu.api;

import cn.ictgu.dto.Video;
import cn.ictgu.parse.Parser;
import cn.ictgu.parse.ParserManager;
import cn.ictgu.tools.UrlUtils;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Silence on 2016/12/6.
 */
@RestController
@AllArgsConstructor
public class VideoAPI {

  private final ParserManager parseManager;

    /**
     * 解析视频
     */
  @GetMapping("/api/video")
  public Video play(HttpServletRequest request){
    String url = request.getParameter("v");
    url = url.replaceAll("\\?(spm|from).*" , "");
    return (Video) parseManager.parse(url);
  }

    /**
     * 解析视频相关集数
     */
  @GetMapping("/api/episode")
  public List episodes(HttpServletRequest request){
    String url = request.getParameter("v");
    url = url.replaceAll("\\?(spm|from).*" , "");
    String key = UrlUtils.getTopDomain(url);
    Parser videoParse = parseManager.getParser(key);
    return videoParse.parseEpisodes(url);
  }

}

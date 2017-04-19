package cn.ictgu.controller;

import cn.ictgu.serv.model.Sponsor;
import cn.ictgu.serv.service.FriendLinkService;
import cn.ictgu.dto.Video;
import cn.ictgu.dto.VideoDTO;
import cn.ictgu.parse.search.VideoSearch;
import cn.ictgu.redis.RedisSourceManager;
import cn.ictgu.serv.service.SponsorService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Controller
 * Created by Silence on 2016/11/11.
 */
@Controller
public class IndexController {

  private final static String[] TAGS = {"LETV","QQ"};

  @Autowired
  private RedisSourceManager redisSourceManager;

  @Autowired
  private FriendLinkService friendLinkService;

  @Autowired
  private SponsorService sponsorService;

  @Autowired
  private VideoSearch videoSearch;

  /* 登录页 */
  @RequestMapping(value = "/login", method = RequestMethod.GET)
  public String login(){
    return "login";
  }

  /* 搜索页 */
  @RequestMapping(value = "/s")
  public String search(HttpServletRequest request, Model model){
    model.addAttribute("navIndex", 1);
    String keyword = request.getParameter("wd");
    if (StringUtils.isNotEmpty(keyword)){
      List<Video> videos = videoSearch.searchVideos(keyword);
      model.addAttribute("videos", videos);
      model.addAttribute("hasResult", true);
      model.addAttribute("size", videos.size());
    }
    return "search";
  }

  /* 解析页 */
  @RequestMapping(value = "/video", method = RequestMethod.GET)
  public String video(Model model){
    model.addAttribute("navIndex", 2);
    return "video";
  }

  /* 友情链接页 */
  @RequestMapping(value = "/friend", method = RequestMethod.GET)
  public String friend(Model model){
    model.addAttribute("appName", friendLinkService.getAppName());
    model.addAttribute("appDomain", friendLinkService.getAppDomain());
    return "friend-link";
  }

  /* 首页 */
  @RequestMapping(value = "/", method = RequestMethod.GET)
  public String redis(Model model){
    List<VideoDTO> carouselPics = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_CAROUSEL_KEY, TAGS[0]);
    List<VideoDTO> recommends = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_RECOMMEND_KEY, TAGS[0]);
    List<VideoDTO> tvHots = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_TV_KEY, TAGS[0]);
    List<VideoDTO> animeHots = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_CARTOON_KEY, TAGS[0]);
    List<VideoDTO> movies = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_MOVIE_KEY, TAGS[0]);
    List<VideoDTO> tvTops = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_TV_HOT_KEY, TAGS[0]);
    List<VideoDTO> animeNews = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_CARTOON_HOT_KEY, TAGS[1]);
    model.addAttribute("carouselPics", carouselPics);
    model.addAttribute("recommends", recommends);
    model.addAttribute("tvHots", tvHots);
    model.addAttribute("animeHots", animeHots);
    model.addAttribute("tvTops", tvTops);
    model.addAttribute("animeNews", animeNews);
    model.addAttribute("movies", movies);
    model.addAttribute("navIndex", 0);
    return "home";
  }

}

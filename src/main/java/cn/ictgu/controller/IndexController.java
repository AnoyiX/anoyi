package cn.ictgu.controller;

import cn.ictgu.dto.Video;
import cn.ictgu.parse.search.VideoSearch;
import cn.ictgu.redis.RedisSourceManager;
import cn.ictgu.serv.model.Sponsor;
import cn.ictgu.serv.service.FriendLinkService;
import cn.ictgu.serv.service.SponsorService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Silence on 2016/11/11.
 */
@Controller
@AllArgsConstructor
public class IndexController {

  private final static String[] TAGS = {"LETV","PANDA"};

  private final RedisSourceManager redisSourceManager;

  private final FriendLinkService friendLinkService;

  private final SponsorService sponsorService;

  private final VideoSearch videoSearch;

  /**
   * 首页
   */
  @GetMapping("/")
  public String home(Model model){
    List<Video> carouselPics = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_CAROUSEL_KEY, TAGS[0]);
    List<Video> recommends = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_RECOMMEND_KEY, TAGS[0]);
    List<Video> tvHots = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_TV_KEY, TAGS[0]);
    List<Video> animeHots = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_CARTOON_KEY, TAGS[0]);
    List<Video> movies = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_MOVIE_KEY, TAGS[0]);
    List<Video> tvTops = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIX_HOME_TV_HOT_KEY, TAGS[0]);
    List<Video> lives = redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEO_PREFIx_HOME_LIVE_KEY, TAGS[1]);
    model.addAttribute("carouselPics", carouselPics);
    model.addAttribute("recommends", recommends);
    model.addAttribute("tvHots", tvHots);
    model.addAttribute("animeHots", animeHots);
    model.addAttribute("tvTops", tvTops);
    model.addAttribute("lives", lives);
    model.addAttribute("movies", movies);
    model.addAttribute("navIndex", -1);
    return "home";
  }

  /**
   * 搜索
   */
  @GetMapping(value = "/s")
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

  /**
   * 高级
   */
  @GetMapping("/video")
  public String video(Model model){
    model.addAttribute("navIndex", 2);
    return "video";
  }

  /**
   * 捐助
   */
  @GetMapping("/sponsor")
  public String sponsor(Model model){
    List<Sponsor> sponsors = sponsorService.list();
    model.addAttribute("navIndex", 3);
    model.addAttribute("sponsors", sponsors);
    return "sponsor";
  }

  /**
   *  解析
   */
  @GetMapping("/author")
  public String author(Model model){
    model.addAttribute("navIndex", 4);
    return "author";
  }

  /**
   *  友情链接
   */
  @GetMapping("/friend")
  public String friend(Model model){
    model.addAttribute("appName", friendLinkService.getAppName());
    model.addAttribute("appDomain", friendLinkService.getAppDomain());
    return "friend-link";
  }

  /**
   *  登录
   */
  @GetMapping("/login")
  public String login(){
    return "login";
  }

  /**
   *  注册
   */
  @GetMapping("/register")
  public String register(){
    return "register";
  }

}

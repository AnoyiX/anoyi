package cn.ictgu.controller;

import cn.ictgu.bean.response.Video;
import cn.ictgu.job.RedisSourceManager;
import cn.ictgu.parse.search.VideoSearch;
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

    private final static String[] TAGS = {"LETV", "PANDA"};

    private final RedisSourceManager redisSourceManager;

    private final VideoSearch videoSearch;

    /**
     * 首页
     */
    @GetMapping("/")
    public String home(Model model) {
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
        return "index";
    }

    @GetMapping("/videos")
    public String videos(){
        return "videos";
    }

    /**
     * 搜索
     */
    @GetMapping("/search")
    public String search(HttpServletRequest request, Model model) {
        String keyword = request.getParameter("wd");
        if (StringUtils.isNotEmpty(keyword)) {
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
    @GetMapping("/parse")
    public String video() {
        return "parse";
    }

    /**
     * 作者信息
     */
    @GetMapping("/author")
    public String author() {
        return "author";
    }

    /**
     * 登录
     */
    @GetMapping("/login")
    public String login() {
        return "login";
    }


}

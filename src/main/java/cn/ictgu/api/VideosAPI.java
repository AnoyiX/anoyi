package cn.ictgu.api;

import cn.ictgu.job.RedisSourceManager;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class VideosAPI {

    private final RedisSourceManager redisSourceManager;

    @GetMapping("/videos/{type}")
    public Object videos(@PathVariable("type") String type){
        return redisSourceManager.getVideosByKeyAndTag(redisSourceManager.VIDEOS_KEY, type);
    }

}

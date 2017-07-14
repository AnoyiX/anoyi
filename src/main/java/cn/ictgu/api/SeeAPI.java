package cn.ictgu.api;

import cn.ictgu.bean.response.SimpleSource;
import cn.ictgu.serv.service.SeeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class SeeAPI {

    private SeeService seeService;

    @GetMapping("/see/new/{page}")
    public List<SimpleSource> getNewSources(@PathVariable(value = "page") Integer page){
        return seeService.getNewItems(page);
    }

    @GetMapping("/see/hot/{page}")
    public List<SimpleSource> getHotSources(@PathVariable(value = "page") Integer page){
        return seeService.getHotItems(page);
    }

    @GetMapping("/see/recommend/{page}")
    public List<SimpleSource> getRecommendSources(@PathVariable(value = "page") Integer page){
        return seeService.getRecommendItems(page);
    }
}

package cn.ictgu.api;

import cn.ictgu.serv.model.FriendLink;
import cn.ictgu.serv.service.FriendLinkService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/link")
@AllArgsConstructor
public class FriendLinkAPI {

    private final FriendLinkService service;

    /**
     * 首页-友情链接列表
     */
    @GetMapping("/list")
    public List<FriendLink> homeFriendLink() {
        return service.listHome();
    }


}

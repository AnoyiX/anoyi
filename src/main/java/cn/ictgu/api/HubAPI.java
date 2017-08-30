package cn.ictgu.api;

import cn.ictgu.bean.ResponseBean;
import cn.ictgu.serv.model.Hub;
import cn.ictgu.serv.model.User;
import cn.ictgu.serv.service.HubService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@AllArgsConstructor
public class HubAPI {

    private final HubService hubService;

    /**
     * 删除分类
     */
    @GetMapping("/user/hub/delete/{hubId}")
    public ResponseBean deleteCategory(@AuthenticationPrincipal UsernamePasswordAuthenticationToken authenticationToken, @PathVariable("hubId") Long hubId) {
        User user = (User) authenticationToken.getPrincipal();
        hubService.deleteByUserIdAndId(user.getId(), hubId);
        return ResponseBean.ok();
    }

    /**
     * 添加分类
     */
    @PostMapping(value = "/user/hub/create")
    public ResponseBean addCategory(@AuthenticationPrincipal UsernamePasswordAuthenticationToken authenticationToken, HttpServletRequest request) {
        Hub hub = requestToHub(request);
        User user = (User) authenticationToken.getPrincipal();
        hub.setUserId(user.getId());
        hub.setAvatar(user.getAvatar());
        hubService.insert(hub);
        return ResponseBean.ok();
    }

    /**
     * 获取所有分类信息
     */
    @GetMapping("/user/hub/list")
    public List<Hub> list(@AuthenticationPrincipal UsernamePasswordAuthenticationToken authenticationToken) {
        User user = (User) authenticationToken.getPrincipal();
        return hubService.getByUserId(user.getId());
    }

    private Hub requestToHub(HttpServletRequest request){
        Hub hub = new Hub();
        hub.setName(request.getParameter("name"));
        hub.setDescription(request.getParameter("description"));
        return hub;
    }
}

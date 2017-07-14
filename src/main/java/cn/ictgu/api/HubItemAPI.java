package cn.ictgu.api;

import cn.ictgu.bean.Response;
import cn.ictgu.bean.ResponseBean;
import cn.ictgu.serv.model.HubItem;
import cn.ictgu.serv.model.User;
import cn.ictgu.serv.service.HubItemService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Silence on 2017/3/14.
 */
@RestController
@Log4j2
@AllArgsConstructor
public class HubItemAPI {

    private final static int ERROR_SAVE = 4001;
    private final static String ERROR_SAVE_MESSAGE = "收藏失败";

    private final HubItemService itemService;

    /**
     * 私藏资源到指定分类
     */
    @PostMapping("/user/hub/item/insert")
    public ResponseBean add(@AuthenticationPrincipal UsernamePasswordAuthenticationToken authenticationToken, HttpServletRequest request) {
        User user = (User) authenticationToken.getPrincipal();
        HubItem item = createItem(user.getId(), request);
        if (itemService.insert(item)) {
            return Response.success(null);
        }
        return Response.error(ERROR_SAVE, ERROR_SAVE_MESSAGE);
    }

    /**
     * 删除分类下的指定资源
     */
    @GetMapping("/user/hub/item/delete/{id}")
    public ResponseBean delete(@AuthenticationPrincipal UsernamePasswordAuthenticationToken authenticationToken, @PathVariable("id") Long id) {
        User user = (User) authenticationToken.getPrincipal();
        if (itemService.delete(id, user.getId())) {
            return Response.success(null);
        }
        log.error("操作失败，userId:" + user.getOpenId() + ", hubItemId: " + id);
        return Response.errorParams();
    }

    private HubItem createItem(Long userId, HttpServletRequest request) {
        HubItem item = new HubItem();
        item.setUserId(userId);
        String name = request.getParameter("name");
        item.setName(name);
        String image = request.getParameter("image");
        item.setImage(image);
        String url = request.getParameter("value");
        item.setUrl(url);
        Long hubId = Long.valueOf(request.getParameter("hubId"));
        item.setHubId(hubId);
        String itemType = request.getParameter("type");
        item.setType(itemType);
        return item;
    }

}

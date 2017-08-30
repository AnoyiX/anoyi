package cn.ictgu.controller;

import cn.ictgu.serv.model.Hub;
import cn.ictgu.serv.model.User;
import cn.ictgu.serv.service.AttentionService;
import cn.ictgu.serv.service.HubService;
import cn.ictgu.serv.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@AllArgsConstructor
public class UserController {

    private final HubService hubService;

    private final UserService userService;

    private final AttentionService attentionService;

    /**
     * 个人中心
     */
    @GetMapping("/user")
    public String user(@AuthenticationPrincipal UsernamePasswordAuthenticationToken authenticationToken, Model model) {
        User user = (User) authenticationToken.getPrincipal();
        model.addAttribute("user", user);
        List<Hub> hubs = hubService.getByUserId(user.getId());
        model.addAttribute("hubs", hubs);
        List<User> idols = userService.getIdols(user.getId(), 1);
        model.addAttribute("idols", idols);
        List<User> fans = userService.getFans(user.getId(), 1);
        model.addAttribute("fans", fans);
        return "user";
    }

    /**
     * 查看他人资料
     */
    @GetMapping("/info/{id}")
    public String user(@AuthenticationPrincipal UsernamePasswordAuthenticationToken authenticationToken, @PathVariable("id") Long userId, Model model) {
        if (authenticationToken != null){
            User user = (User) authenticationToken.getPrincipal();
            if (userId.equals(user.getId())){
                return "redirect:/user";
            }
            boolean isAttention = attentionService.isAttention(user.getId(), userId);
            model.addAttribute("isAttention", isAttention);
        }
        User other = userService.getUserInfo(userId);
        model.addAttribute("user", other);
        List<Hub> hubs = hubService.getByUserId(userId);
        model.addAttribute("hubs", hubs);
        return "info";
    }

}

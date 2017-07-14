package cn.ictgu.api;


import cn.ictgu.bean.Response;
import cn.ictgu.bean.ResponseBean;
import cn.ictgu.serv.model.User;
import cn.ictgu.serv.service.AttentionService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AttentionAPI {

    private final AttentionService attentionService;

    /**
     * 关注/取消关注 对方
     */
    @GetMapping("/user/attention/{otherId}")
    public ResponseBean payAttention(@AuthenticationPrincipal UsernamePasswordAuthenticationToken principal, @PathVariable("otherId") Long otherId){
        User user = (User) principal.getPrincipal();
        Long userId = user.getId();
        Boolean flag = attentionService.attention(userId, otherId);
        return Response.success(flag);
    }

}

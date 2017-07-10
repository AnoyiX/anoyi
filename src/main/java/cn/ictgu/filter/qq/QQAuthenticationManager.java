package cn.ictgu.filter.qq;

import cn.ictgu.serv.model.User;
import cn.ictgu.serv.model.enumclass.LoginType;
import cn.ictgu.serv.service.UserService;
import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.jsoup.nodes.Document;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.DigestUtils;

import java.util.ArrayList;
import java.util.List;

import static cn.ictgu.filter.QQAuthenticationFilter.clientId;

public class QQAuthenticationManager implements AuthenticationManager {
    private static final List<GrantedAuthority> AUTHORITIES = new ArrayList<>();

    private final UserService userService;

    public QQAuthenticationManager(UserService userService){
        this.userService = userService;
    }

    /**
     * 获取 QQ 登录信息的 API 地址
     */
    private final static String userInfoUri = "https://graph.qq.com/user/get_user_info";

    /**
     * 获取 QQ 用户信息的地址拼接
     */
    private final static String USER_INFO_API = "%s?access_token=%s&oauth_consumer_key=%s&openid=%s";

    static {
        AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        if (auth.getName() != null && auth.getCredentials() != null) {
            User user = getUserInfo(auth.getName(), (String) (auth.getCredentials()));
            return new UsernamePasswordAuthenticationToken(user,
                    null, AUTHORITIES);
        }
        throw new BadCredentialsException("Bad Credentials");
    }

    private User getUserInfo(String accessToken, String openId) {
        String url = String.format(USER_INFO_API, userInfoUri, accessToken, clientId, openId);
        Document document = JsoupUtils.getDocWithPC(url);
        String resultText = document.text();
        JSONObject json = JSON.parseObject(resultText);

        // 解析 QQ 用户信息
        User user = new User();
        user.setOpenId(openId);
        user.setNickname(json.getString("nickname"));
        user.setGender(json.getString("gender"));
        user.setAvatar(json.getString("figureurl_qq_2"));

        String meta = json.getString("year") + " " + json.getString("province");
        user.setMeta(meta);
        user.setLoginType(LoginType.QQ.name());

        String md5 = DigestUtils.md5DigestAsHex(resultText.getBytes());
        user.setMd5(md5);

        // 更新 QQ 用户在本站的信息
        return userService.updateUserInfo(user);
    }

}

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

public class GithubAuthenticationManager implements AuthenticationManager {
    private static final List<GrantedAuthority> AUTHORITIES = new ArrayList<>();

    private final UserService userService;

    public GithubAuthenticationManager(UserService userService) {
        this.userService = userService;
    }

    /**
     * 获取 Github 登录信息的 API 地址
     */
    private final static String userInfoUri = "https://api.github.com/user?access_token=";

    static {
        AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        if (auth.getName() != null && auth.getCredentials() != null) {
            User user = getUserInfo(auth.getName());
            return new UsernamePasswordAuthenticationToken(user,
                    null, AUTHORITIES);
        }
        throw new BadCredentialsException("Bad Credentials");
    }

    private User getUserInfo(String accessToken) {
        Document document = JsoupUtils.getDocWithPC(userInfoUri + accessToken);
        String resultText = document.text();
        JSONObject json = JSON.parseObject(resultText);

        // 解析 Github 用户信息
        User user = new User();
        user.setOpenId(json.getString("id"));
        user.setNickname(json.getString("login"));
        user.setGender("男");
        user.setAvatar(json.getString("avatar_url"));

        String location = json.getString("location");
        String name = json.getString("name");
        String company = json.getString("company");

        String meta = (location == null ? "" : location) + " " + (name == null ? "" : name) + " " + (company == null ? "" : company);
        user.setMeta(meta);
        user.setLoginType(LoginType.GIT.name());

        String md5 = DigestUtils.md5DigestAsHex(resultText.getBytes());
        user.setMd5(md5);

        // 更新 Github 用户在本站的信息
        return userService.updateUserInfo(user);
    }

}

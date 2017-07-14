package cn.ictgu.filter;

import cn.ictgu.tools.JsoupUtils;
import com.alibaba.fastjson.JSON;
import org.jsoup.nodes.Document;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GithubAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    /**
     * 获取 Token 的 API
     */
    private final static String accessTokenUri = "https://github.com/login/oauth/access_token";

    /**
     * client_id 由 Github 提供
     */
    private static final String clientId = "6660ed7bdce31cb577fe";

    /**
     * client_secret 由 Github 提供
     */
    private final static String clientSecret = "aa2d4c3ba4c3fb91413ff226e4fa091a1a58d908";

    /**
     * redirect_uri Github 回调地址
     */
    private final static String redirectUri = "http://www.ictgu.cn/login/github";

    public GithubAuthenticationFilter(String defaultFilterProcessesUrl) {
        super(new AntPathRequestMatcher(defaultFilterProcessesUrl, "GET"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String code = request.getParameter("code");
        String state = request.getParameter("state");
        System.out.println("Code : " + code + ", state:" + state);
        GithubToken githubToken = this.getToken(code, state);
        System.out.println(JSON.toJSONString(githubToken));
        if (githubToken != null){
            // 生成验证 authenticationToken
            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(githubToken.getAccessToken(), githubToken.getScope());
            // 返回验证结果
            return this.getAuthenticationManager().authenticate(authRequest);
    }
        return null;
    }

    private GithubToken getToken(String code, String state) throws IOException{
        Document document = JsoupUtils.getDocWithPC(accessTokenUri
                                + "?client_id=" + clientId
                                + "&code=" + code
                                + "&client_secret=" + clientSecret
                                + "&redirect_uri=" + redirectUri
                                + "&state=" + state);
        String tokenResult = document.text();
        System.out.println(tokenResult);
        String[] results = tokenResult.split("&");
        if (results.length == 3){
            GithubToken githubToken = new GithubToken();
            String accessToken = results[0].replace("access_token=", "");
            String scope = results[1].replace("scope=", "");
            String tokenType = results[2].replace("token_type=", "");
            githubToken.setAccessToken(accessToken);
            githubToken.setScope(scope);
            githubToken.setTokenType(tokenType);
            return githubToken;
        }
        return null;
    }

    class GithubToken {

        /**
         * token
         */
        private String accessToken;

        /**
         * 范围
         */
        private String scope;

        /**
         * token 类型
         */
        private String tokenType;

        String getAccessToken() {
            return accessToken;
        }

        void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }

        private String getScope() {
            return scope;
        }

        private void setScope(String scope) {
            this.scope = scope;
        }

        private void setTokenType(String tokenType) {
            this.tokenType = tokenType;
        }
    }
}

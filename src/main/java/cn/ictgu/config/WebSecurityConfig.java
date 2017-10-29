package cn.ictgu.config;

import cn.ictgu.filter.GithubAuthenticationFilter;
import cn.ictgu.filter.QQAuthenticationFilter;
import cn.ictgu.filter.qq.GithubAuthenticationManager;
import cn.ictgu.filter.qq.QQAuthenticationManager;
import cn.ictgu.serv.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * 安全控制中心
 */
@EnableWebSecurity
@ConditionalOnClass({
        UserService.class
})
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${server.port}")
    private int port;

    @Value("${server.sslPort}")
    private int sslPort;

    private UserService userService;

    @Autowired
    private void setUserService(UserService userService){
        this.userService = userService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/user/**").authenticated()
                .antMatchers("/comment/**").authenticated()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/user", true)
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and().portMapper().http(port).mapsTo(sslPort)
                .and().csrf().disable();

        http.rememberMe().alwaysRemember(true);

        http.addFilterAt(qqAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        http.addFilterAt(githubAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * 自定义 QQ登录 过滤器
     */
    private QQAuthenticationFilter qqAuthenticationFilter(){
        QQAuthenticationFilter authenticationFilter = new QQAuthenticationFilter("/login/qq");
        SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
        successHandler.setAlwaysUseDefaultTargetUrl(true);
        successHandler.setDefaultTargetUrl("/user");
        authenticationFilter.setAuthenticationManager(new QQAuthenticationManager(userService));
        authenticationFilter.setAuthenticationSuccessHandler(successHandler);
        return authenticationFilter;
    }

    /**
     * 自定义 Github登录 过滤器
     */
    private GithubAuthenticationFilter githubAuthenticationFilter(){
        GithubAuthenticationFilter authenticationFilter = new GithubAuthenticationFilter("/login/github");
        SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
        successHandler.setAlwaysUseDefaultTargetUrl(true);
        successHandler.setDefaultTargetUrl("/user");
        authenticationFilter.setAuthenticationManager(new GithubAuthenticationManager(userService));
        authenticationFilter.setAuthenticationSuccessHandler(successHandler);
        return authenticationFilter;
    }

}

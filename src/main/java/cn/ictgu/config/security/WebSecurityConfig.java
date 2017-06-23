package cn.ictgu.config.security;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * 安全控制中心
 * Created by Silence on 2017/3/10.
 */
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserDetailsService userDetailsService;

  public WebSecurityConfig(AnyUserDetailsService userDetailsService){
    this.userDetailsService = userDetailsService;
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(this.userDetailsService);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .authorizeRequests()
      .antMatchers("/user/**").authenticated()
      .anyRequest().permitAll()
      .and()
      .formLogin()
      .loginPage("/login")
      .defaultSuccessUrl("/user", true)
      .permitAll()
      .and()
      .logout()
      .permitAll()
      .and().csrf().disable();

    http.rememberMe().alwaysRemember(true);
  }

}

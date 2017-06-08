package cn.ictgu.config.security;

import cn.ictgu.serv.service.UserService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 自定义 UserDetailsService
 * Created by Silence on 2017/3/10.
 */
@Service
class AnyUserDetailsService implements UserDetailsService {

  private final UserService userService;

  public AnyUserDetailsService(UserService userService){
    this.userService = userService;
  }

  @Override
  public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    cn.ictgu.serv.model.User user = userService.getByEmail(s);
    if (user == null){
      throw new UsernameNotFoundException("用户不存在");
    }
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    AnyUser anyUser = new AnyUser(s, user.getPassword(), authorities);
    anyUser.setId(user.getId());
    anyUser.setNickname(user.getNickname());
    return anyUser;
  }

}

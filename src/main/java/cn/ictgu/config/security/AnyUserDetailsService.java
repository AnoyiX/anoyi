package cn.ictgu.config.security;

import cn.ictgu.dao.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
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

  @Autowired
  private UserService userService;

  @Override
  public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    cn.ictgu.dao.model.User user = userService.getByEmail(s);
    if (user == null){
      throw new UsernameNotFoundException("用户不存在");
    }
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    return new User(s, user.getPassword(), authorities);
  }

}

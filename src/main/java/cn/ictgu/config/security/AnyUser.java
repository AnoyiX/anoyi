package cn.ictgu.config.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * 自定义的 User 对象
 * Created by Silence on 2017/4/15.
 */
public class AnyUser extends User {

  private Long id;

  private String nickname;

  public AnyUser(
    String username,
    String password,
    Collection<? extends GrantedAuthority> authorities
  ) {
    super(username, password, authorities);
  }

  public AnyUser(
    String username,
    String password,
    boolean enabled,
    boolean accountNonExpired,
    boolean credentialsNonExpired,
    boolean accountNonLocked,
    Collection<? extends GrantedAuthority> authorities
  ) {
    super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }
}

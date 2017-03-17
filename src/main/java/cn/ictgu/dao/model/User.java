package cn.ictgu.dao.model;

import lombok.Data;

/**
 * 用户
 * Created by Silence on 2017/3/11.
 */
@Data
public class User {
  private Long id;
  private String email;
  private String password;
  private String nickname;
}

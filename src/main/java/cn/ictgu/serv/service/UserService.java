package cn.ictgu.serv.service;

import cn.ictgu.serv.model.User;
import org.springframework.stereotype.Service;

/**
 * User Service
 * Created by Silence on 2017/3/11.
 */
public interface UserService {

  /* 用户注册 */
  boolean signUp(User user);

  /* 更新用户昵称 */
  boolean updateNickname(Long id, String nickname);

  /* 根据ID查询用户信息 */
  User getById(Long id);

  /* 根据邮箱查询用户信息 */
  User getByEmail(String email);

  /* 用户注册之token校验 */
  User completeSignUp(String token);

}

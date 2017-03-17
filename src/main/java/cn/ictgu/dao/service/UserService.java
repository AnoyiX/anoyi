package cn.ictgu.dao.service;

import cn.ictgu.dao.mapper.UserMapper;
import cn.ictgu.dao.model.User;
import cn.ictgu.dto.SimpleResponse;
import cn.ictgu.redis.RedisTokenManager;
import cn.ictgu.tools.mail.MailService;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * User Service
 * Created by Silence on 2017/3/11.
 */
@Service
@Log4j
public class UserService {

  @Autowired
  private UserMapper mapper;

  @Autowired
  private RedisTokenManager tokenManager;

  @Autowired
  private MailService mailService;

  public boolean updateNickname(Long id, String nickname){
    return mapper.updateNicknameById(id, nickname) > 0;
  }

  public User getById(Long id){
    return mapper.selectById(id);
  }

  public User getByEmail(String email){
    return mapper.selectByEmail(email);
  }

  public boolean signUp(User user){
    String email = user.getEmail();
    if (existEmail(email)){
      log.error("用户注册，邮箱已注册:" + email);
      return false;
    }
    sendValidateEmail(user);
    return true;
  }

  public User completeSignUp(String token){
    User user = tokenManager.getUserOfSignUp(token);
    if (user != null){
      if (existEmail(user.getEmail())){
        user = mapper.selectByEmail(user.getEmail());
      }else {
        mapper.insert(user);
      }
      return user;
    }
    return null;
  }

  @Async
  private void sendValidateEmail(User user){
    String token = tokenManager.getTokenOfSignUp(user);
    log.error("用户注册，准备发送邮件：User:" + JSONObject.toJSONString(user) + ", Token: " + token);
    mailService.userValidate(user, token);
  }

  private boolean existEmail(String email){
    return mapper.selectByEmail(email) != null;
  }

}

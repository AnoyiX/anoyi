package cn.ictgu.serv.service;

import cn.ictgu.redis.RedisTokenManager;
import cn.ictgu.serv.mapper.UserMapper;
import cn.ictgu.serv.model.User;
import cn.ictgu.tools.mail.MailService;
import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * 用户管理
 * Created by Silence on 2017/4/11.
 */
@Service
@Log4j2
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    private final RedisTokenManager tokenManager;

    private final MailService mailService;

    public boolean updateNickname(Long id, String nickname) {
        return userMapper.updateNicknameById(id, nickname) > 0;
    }

    public User getById(Long id) {
        return userMapper.selectById(id);
    }

    public User getByEmail(String email) {
        return userMapper.selectByEmail(email);
    }

    public boolean signUp(User user) {
        String email = user.getEmail();
        if (existEmail(email)) {
            log.error("用户注册，邮箱已注册:" + email);
            return false;
        }
        sendValidateEmail(user);
        return true;
    }

    public User completeSignUp(String token) {
        User user = tokenManager.getUserOfSignUp(token);
        if (user != null) {
            if (existEmail(user.getEmail())) {
                user = userMapper.selectByEmail(user.getEmail());
            } else {
                userMapper.insert(user);
            }
            return user;
        }
        return null;
    }

    @Async
    public void sendValidateEmail(User user) {
        String token = tokenManager.getTokenOfSignUp(user);
        log.error("用户注册，准备发送邮件：User:" + JSONObject.toJSONString(user) + ", Token: " + token);
        mailService.userValidate(user, token);
    }

    private boolean existEmail(String email) {
        return userMapper.selectByEmail(email) != null;
    }

}

package cn.ictgu.redis;

import cn.ictgu.serv.model.User;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Redis Token 信息管理
 * Created by Silence on 2017/3/11.
 */
@Component
@Log4j2
public class RedisTokenManager {

    @Value("${redis.prefix.signUp}")
    private String signUpPrefix;

    private final StringRedisTemplate stringRedisTemplate;

    public RedisTokenManager(StringRedisTemplate stringRedisTemplate){
        this.stringRedisTemplate = stringRedisTemplate;
    }

    /**
     * 根据用户信息生成 token 信息
     */
    public String getTokenOfSignUp(User user) {
        String token = UUID.randomUUID().toString();
        String value = JSONObject.toJSONString(user);
        stringRedisTemplate.opsForValue().set(signUpPrefix + token, value);
        stringRedisTemplate.expire(signUpPrefix + token, 12, TimeUnit.HOURS);
        return token;
    }

    /**
     * 根据 token 从 Redis 获取用户信息
     */
    public User getUserOfSignUp(String token) {
        String value = stringRedisTemplate.opsForValue().get(signUpPrefix + token);
        if (value == null) {
            log.info("用户注册，Token已失效：" + token);
            return null;
        }
        return JSONObject.parseObject(value, User.class);
    }

}

package cn.ictgu.api;

import cn.ictgu.config.security.AnyUser;
import cn.ictgu.dto.SimpleResponse;
import cn.ictgu.serv.model.User;
import cn.ictgu.serv.service.UserService;
import cn.ictgu.tools.CheckUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Silence on 2017/3/11.
 */
@RestController
@AllArgsConstructor
public class UserApi {

  private final UserService userService;

    /**
     * 修改用户昵称
     */
  @PostMapping("/user/name")
  public SimpleResponse updateUserInfo(@AuthenticationPrincipal AnyUser user, HttpServletRequest request){
    SimpleResponse response = new SimpleResponse();
    String nickname = request.getParameter("nickname");
    if (!CheckUtils.checkNickname(nickname)){
      response.setCode(200);
      response.setMessage("修改失败，参数不正确！");
      return response;
    }
    if(userService.updateNickname(user.getId(), nickname)){
      response.setCode(100);
      return response;
    }
    response.setCode(200);
    response.setMessage("修改失败，参数不正确！");
    return response;
  }

    /**
     * 用户注册
     */
  @PostMapping(value = "/register")
  public SimpleResponse signUp(HttpServletRequest request){
    User user = createUser(request);
    SimpleResponse response = checkSignUpRequest(user);
    if (response.getCode() == 100){
      if (!userService.signUp(user)){
        response.setCode(200);
        response.setMessage("此邮箱已注册，请勿重复注册！");
        return response;
      }else {
        response.setMessage("注册激活邮件已发送至您邮箱，请在12小时内激活完成注册！");
        return response;
      }
    }
    return response;
  }

    /**
     * 检验用户注册输入的参数
     */
  private SimpleResponse checkSignUpRequest(User user){
    SimpleResponse response = new SimpleResponse();
    String email = user.getEmail();
    if (!CheckUtils.checkEmail(email)){
      response.setCode(200);
      response.setMessage("邮箱格式不合法");
      return response;
    }
    String password = user.getPassword();
    if (!CheckUtils.checkPassword(password)){
      response.setCode(200);
      response.setMessage("密码长度必须为8-16位，且必须包含数字和字母");
      return response;
    }
    String nickname = user.getNickname();
    if (!CheckUtils.checkNickname(nickname)){
      response.setCode(200);
      response.setMessage("昵称长度不合法");
      return response;
    }
    response.setCode(100);
    return response;
  }

  private User createUser(HttpServletRequest request){
    User user = new User();
    user.setEmail(request.getParameter("username"));
    user.setPassword(request.getParameter("password"));
    user.setNickname(request.getParameter("nickname"));
    return user;
  }

}

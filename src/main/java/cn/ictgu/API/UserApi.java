package cn.ictgu.API;

import cn.ictgu.dao.model.User;
import cn.ictgu.dao.service.UserService;
import cn.ictgu.dto.SimpleResponse;
import cn.ictgu.tools.CheckUtils;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * User API
 * Created by Silence on 2017/3/11.
 */
@RestController
public class UserApi {

  @Autowired
  private UserService userService;

  @RequestMapping(value = "/user/name", method = RequestMethod.POST)
  public SimpleResponse updateUserInfo(HttpServletRequest request){
    SimpleResponse response = new SimpleResponse();
    String nickname = request.getParameter("nickname");
    if (!CheckUtils.checkNickname(nickname)){
      response.setCode(200);
      response.setMessage("修改失败，参数不正确！");
      return response;
    }
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails) {
      String email = ((UserDetails)principal).getUsername();
      User user = userService.getByEmail(email);
      if(userService.updateNickname(user.getId(), nickname)){
        response.setCode(100);
        return response;
      }
      response.setCode(200);
      response.setMessage("修改失败，参数不正确！");
      return response;
    }
    response.setCode(200);
    response.setMessage("修改失败，请重新登录！");
    return response;
  }

  @RequestMapping(value = "/sign-up", method = RequestMethod.POST)
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
    user.setEmail(request.getParameter("email"));
    user.setPassword(request.getParameter("password"));
    user.setNickname(request.getParameter("nickname"));
    return user;
  }

}

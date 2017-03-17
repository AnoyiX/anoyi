package cn.ictgu.controller;

import cn.ictgu.dao.model.Category;
import cn.ictgu.dao.model.User;
import cn.ictgu.dao.service.CategoryService;
import cn.ictgu.dao.service.UserService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Controller about user
 * Created by Silence on 2017/3/10.
 */
@Controller
@Log4j
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private CategoryService categoryService;

  @RequestMapping(value = "/validate/{token}", method = RequestMethod.GET)
  public String emailConfirm(@PathVariable("token") String token, Model model){
    User user = userService.completeSignUp(token);
    if (user != null){
      model.addAttribute("email", user.getEmail());
      model.addAttribute("result", "注册成功，赶紧登陆体验吧！");
    }else {
      model.addAttribute("result", "链接已失效，请重新注册！");
    }
    return "login";
  }

  @RequestMapping(value = "/user", method = RequestMethod.GET)
  public String user(Model model){
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails) {
      String email = ((UserDetails)principal).getUsername();
      User user = userService.getByEmail(email);
      model.addAttribute("user", user);
      List<Category> categories = categoryService.getByUserId(user.getId());
      model.addAttribute("categories", categories);
    }
    return "user";
  }


}

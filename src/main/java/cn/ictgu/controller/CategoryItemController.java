package cn.ictgu.controller;

import cn.ictgu.dao.model.Category;
import cn.ictgu.dao.model.CategoryItem;
import cn.ictgu.dao.model.User;
import cn.ictgu.dao.service.CategoryItemService;
import cn.ictgu.dao.service.CategoryService;
import cn.ictgu.dao.service.UserService;
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
 * CategoryItem Controller
 * Created by Silence on 2017/3/14.
 */
@Controller
public class CategoryItemController {

  @Autowired
  private UserService userService;

  @Autowired
  private CategoryItemService categoryItemService;

  @Autowired
  private CategoryService categoryService;

  @RequestMapping(value = "/user/item/{id}", method = RequestMethod.GET)
  public String list(@PathVariable("id") Long id, Model model){
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails){
      String email = ((UserDetails) principal).getUsername();
      User user = userService.getByEmail(email);
      List<CategoryItem> items = categoryItemService.list(id, user.getId());
      Category category = categoryService.getById(id, user.getId());
      model.addAttribute("user", user);
      model.addAttribute("category", category);
      model.addAttribute("items", items);
    }
    return "items";
  }

  @RequestMapping(value = "/share/{md5}", method = RequestMethod.GET)
  public String share(@PathVariable("md5") String md5, Model model){
    Category category = categoryService.getByMd5(md5);
    if (category == null){
      return "error";
    }
    User user = userService.getById(category.getUserId());
    List<CategoryItem> items = categoryItemService.list(category.getId(), user.getId());
    model.addAttribute("user", user);
    model.addAttribute("category", category);
    model.addAttribute("items", items);
    return "share";
  }

}

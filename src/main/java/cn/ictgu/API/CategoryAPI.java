package cn.ictgu.API;

import cn.ictgu.dao.model.Category;
import cn.ictgu.dao.model.User;
import cn.ictgu.dao.service.CategoryService;
import cn.ictgu.dao.service.UserService;
import cn.ictgu.dto.SimpleResponse;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Category API
 * Created by Silence on 2017/3/13.
 */
@RestController
public class CategoryAPI {

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private UserService userService;

  @RequestMapping(value = "/user/category/delete/{categoryId}", method = RequestMethod.GET)
  public SimpleResponse deleteCategory(@PathVariable("categoryId") Long categoryId){
    SimpleResponse simpleResponse = new SimpleResponse();
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails) {
      String email = ((UserDetails)principal).getUsername();
      User user = userService.getByEmail(email);
      if(categoryService.deleteByUserIdAndId(user.getId(), categoryId)){
        simpleResponse.setCode(100);
        return simpleResponse;
      }
    }
    simpleResponse.setCode(200);
    return simpleResponse;
  }

  @RequestMapping(value = "/user/category/add", method = RequestMethod.POST)
  public SimpleResponse addCategory(HttpServletRequest request){
    SimpleResponse simpleResponse = new SimpleResponse();
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails) {
      String email = ((UserDetails)principal).getUsername();
      User user = userService.getByEmail(email);
      String name = request.getParameter("name");
      if (name == null){
        simpleResponse.setCode(200);
        return simpleResponse;
      }
      if(categoryService.insert(user.getId(), name)){
        simpleResponse.setCode(100);
        return simpleResponse;
      }
    }
    simpleResponse.setCode(200);
    return simpleResponse;
  }

  @RequestMapping(value = "/user/categories", method = RequestMethod.GET)
  public List<Category> list(){
    List<Category> categories = new ArrayList<>();
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails) {
      String email = ((UserDetails)principal).getUsername();
      User user = userService.getByEmail(email);
      categories = categoryService.getByUserId(user.getId());
    }
    return categories;
  }

}

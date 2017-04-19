package cn.ictgu.API;

import cn.ictgu.config.security.AnyUser;
import cn.ictgu.dto.SimpleResponse;
import cn.ictgu.serv.model.Category;
import cn.ictgu.serv.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Category API
 * Created by Silence on 2017/3/13.
 */
@RestController
public class CategoryAPI {

  @Autowired
  private CategoryService categoryService;

  @RequestMapping(value = "/user/category/delete/{categoryId}", method = RequestMethod.GET)
  public SimpleResponse deleteCategory(@AuthenticationPrincipal AnyUser user, @PathVariable("categoryId") Long categoryId){
    SimpleResponse simpleResponse = new SimpleResponse();
    if(categoryService.deleteByUserIdAndId(user.getId(), categoryId)){
      simpleResponse.setCode(100);
      return simpleResponse;
    }
    simpleResponse.setCode(200);
    return simpleResponse;
  }

  @RequestMapping(value = "/user/category/add", method = RequestMethod.POST)
  public SimpleResponse addCategory(@AuthenticationPrincipal AnyUser user, HttpServletRequest request){
    SimpleResponse simpleResponse = new SimpleResponse();
    String name = request.getParameter("name");
    if (name == null){
      simpleResponse.setCode(200);
      return simpleResponse;
    }
    if(categoryService.insert(user.getId(), name)){
      simpleResponse.setCode(100);
      return simpleResponse;
    }
    simpleResponse.setCode(200);
    return simpleResponse;
  }

  @RequestMapping(value = "/user/categories", method = RequestMethod.GET)
  public List<Category> list(@AuthenticationPrincipal AnyUser user){
    return categoryService.getByUserId(user.getId());
  }

}

package cn.ictgu.api;

import cn.ictgu.config.security.AnyUser;
import cn.ictgu.dto.SimpleResponse;
import cn.ictgu.serv.model.Category;
import cn.ictgu.serv.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Silence on 2017/3/13.
 */
@RestController
@AllArgsConstructor
public class CategoryAPI {

  private final CategoryService categoryService;

    /**
     * 删除分类
     */
  @GetMapping("/user/category/delete/{categoryId}")
  public SimpleResponse deleteCategory(@AuthenticationPrincipal AnyUser user, @PathVariable("categoryId") Long categoryId){
    SimpleResponse simpleResponse = new SimpleResponse();
    if(categoryService.deleteByUserIdAndId(user.getId(), categoryId)){
      simpleResponse.setCode(100);
      return simpleResponse;
    }
    simpleResponse.setCode(200);
    return simpleResponse;
  }

    /**
     * 添加分类
     */
  @PostMapping("/user/category/add")
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

    /**
     * 获取所有分类信息
     */
  @GetMapping("/user/categories")
  public List<Category> list(@AuthenticationPrincipal AnyUser user){
    return categoryService.getByUserId(user.getId());
  }

}

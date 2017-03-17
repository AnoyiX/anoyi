package cn.ictgu.API;

import cn.ictgu.dao.model.CategoryItem;
import cn.ictgu.dao.model.User;
import cn.ictgu.dao.service.CategoryItemService;
import cn.ictgu.dao.service.UserService;
import cn.ictgu.dto.SimpleResponse;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * CategoryItem API
 * Created by Silence on 2017/3/14.
 */
@RestController
@Log4j
public class CategoryItemAPI {

  @Autowired
  private UserService userService;

  @Autowired
  private CategoryItemService itemService;

  @RequestMapping(value = "/user/category/item/add", method = RequestMethod.POST)
  public SimpleResponse add(HttpServletRequest request){
    SimpleResponse simpleResponse = new SimpleResponse();
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails){
      String email = ((UserDetails) principal).getUsername();
      User user = userService.getByEmail(email);
      CategoryItem item = createItem(user.getId(), request);
      if (itemService.insert(item)){
        simpleResponse.setCode(100);
        simpleResponse.setMessage("私藏成功，请到对应分类下查看");
        return simpleResponse;
      }
      log.error("操作失败，CategoryItem:" + JSONObject.toJSONString(item));
    }
    simpleResponse.setCode(200);
    simpleResponse.setMessage("私藏失败");
    return simpleResponse;
  }

  @RequestMapping(value = "/user/category/item/delete/{id}", method = RequestMethod.GET)
  public SimpleResponse delete(@PathVariable("id") Long id){
    SimpleResponse simpleResponse = new SimpleResponse();
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails){
      String email = ((UserDetails) principal).getUsername();
      User user = userService.getByEmail(email);
      if (itemService.delete(id, user.getId())){
        simpleResponse.setCode(100);
        return simpleResponse;
      }
      log.error("操作失败，userId:" + user.getId() + ", CategoryItemId: " + id);
    }
    simpleResponse.setCode(200);
    return simpleResponse;
  }

  private CategoryItem createItem(Long userId, HttpServletRequest request){
    CategoryItem item = new CategoryItem();
    item.setUserId(userId);
    String name = request.getParameter("name");
    item.setName(name);
    String image = request.getParameter("image");
    item.setImage(image);
    String url = request.getParameter("value");
    item.setUrl(url);
    String type = request.getParameter("type");
    item.setType(type);
    Long categoryId = Long.valueOf(request.getParameter("id"));
    item.setCategoryId(categoryId);
    return item;
  }

}

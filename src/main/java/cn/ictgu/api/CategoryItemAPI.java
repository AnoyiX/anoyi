package cn.ictgu.api;

import cn.ictgu.config.security.AnyUser;
import cn.ictgu.dto.SimpleResponse;
import cn.ictgu.serv.model.CategoryItem;
import cn.ictgu.serv.service.CategoryItemService;
import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Silence on 2017/3/14.
 */
@RestController
@Log4j2
@AllArgsConstructor
public class CategoryItemAPI {

  private final CategoryItemService itemService;

    /**
     * 私藏资源到指定分类
     */
  @PostMapping("/user/category/item/add")
  public SimpleResponse add(@AuthenticationPrincipal AnyUser user, HttpServletRequest request){
    SimpleResponse simpleResponse = new SimpleResponse();
    CategoryItem item = createItem(user.getId(), request);
    if (itemService.insert(item)){
      simpleResponse.setCode(100);
      simpleResponse.setMessage("私藏成功，请到对应分类下查看！");
      return simpleResponse;
    }
    log.error("操作失败，CategoryItem:" + JSONObject.toJSONString(item));
    simpleResponse.setCode(200);
    simpleResponse.setMessage("私藏失败");
    return simpleResponse;
  }

    /**
     * 删除分类下的指定资源
     */
  @GetMapping("/user/category/item/delete/{id}")
  public SimpleResponse delete(@AuthenticationPrincipal AnyUser user, @PathVariable("id") Long id){
    SimpleResponse simpleResponse = new SimpleResponse();
    if (itemService.delete(id, user.getId())){
      simpleResponse.setCode(100);
      return simpleResponse;
    }
    log.error("操作失败，userId:" + user.getId() + ", CategoryItemId: " + id);
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

package cn.ictgu.API;

import cn.ictgu.dao.model.FriendLink;
import cn.ictgu.dao.service.FriendLinkService;
import cn.ictgu.dto.SimpleResponse;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 友情链接 API
 * Created by Silence on 2017/3/9.
 */
@RestController
@RequestMapping("/friend")
public class FriendLinkAPI {

  @Autowired
  private FriendLinkService service;

  @RequestMapping(value = "/join", method = RequestMethod.GET)
  public SimpleResponse join(HttpServletRequest request){
    SimpleResponse response = new SimpleResponse();
    String name = request.getParameter("name");
    String domain = request.getParameter("domain");
    boolean success = service.insert(name, domain);
    if (success){
      response.setCode(100);
    }else {
      response.setCode(200);
      response.setMessage("申请失败，请按照说明操作哦！");
    }
    return response;
  }

  /* 首页-友情链接列表 */
  @RequestMapping(value = "/list-home", method = RequestMethod.GET)
  public List<FriendLink> homeFriendLink(){
    return service.listHome();
  }

  /* 友情链接页-列表 */
  @RequestMapping(value = "/list", method = RequestMethod.GET)
  public List<FriendLink> friendLinkList(HttpServletRequest request){
    int index = Integer.valueOf(request.getParameter("index"));
    int size = Integer.valueOf(request.getParameter("size"));
    return service.listAll(index, size);
  }

}

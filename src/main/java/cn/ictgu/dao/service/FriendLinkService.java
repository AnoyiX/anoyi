package cn.ictgu.dao.service;

import cn.ictgu.dao.mapper.FriendLinkMapper;
import cn.ictgu.dao.model.FriendLink;
import cn.ictgu.dao.model.enumclass.YesNoEnum;
import cn.ictgu.tools.UrlUtils;
import lombok.extern.log4j.Log4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 友情链接 Service
 * Created by Silence on 2017/3/9.
 */
@Service
@Log4j
public class FriendLinkService {

  @Value("${app.name}")
  private String appName;

  @Value("${app.domain}")
  private String appDomain;

  private static final String FRIEND_LINK_HTML_REG = "<a.*?href=.*?%s.*?>[\\s\\S]*?%s[\\s\\S]*?</a>";

  @Autowired
  private FriendLinkMapper mapper;

  private boolean exist(String domain){
    return mapper.countByDomain(domain) > 0;
  }

  public List<FriendLink> listHome(){
    return mapper.selectShowEqYesDesc();
  }

  public List<FriendLink> listAll(int index, int size){
    return mapper.selectAllDesc(index, size);
  }

  public boolean insert(String name, String domain){
    if (exist(domain)){
      return false;
    }
    String url = UrlUtils.adjustUrl(domain);
    if (related(url)){
      FriendLink friendLink = new FriendLink(name, url, YesNoEnum.NO.name());
      return mapper.insert(friendLink) > 0;
    }
    return false;
  }

  /* 对方是否已在首页添加您为友链 */
  private boolean related(String url){
    try {
      Document document = Jsoup.connect(url).get();
      String reg = String.format(FRIEND_LINK_HTML_REG, appDomain, appName);
      String html = document.html();
      Matcher matcher = Pattern.compile(reg).matcher(html);
      return matcher.find();
    } catch (IOException e) {
      log.info("Add Friend Link Error, url:" + url);
      e.printStackTrace();
    }
    return false;
  }

  public String getAppName() {
    return appName;
  }

  public String getAppDomain() {
    return appDomain;
  }

}

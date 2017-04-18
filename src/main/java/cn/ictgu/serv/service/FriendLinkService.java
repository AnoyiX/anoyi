package cn.ictgu.serv.service;

import cn.ictgu.serv.model.FriendLink;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 友情链接 Service
 * Created by Silence on 2017/3/9.
 */
public interface FriendLinkService {

  /* 得到首页友情链接 */
  List<FriendLink> listHome();

  /* 得到所有友情链接 */
  List<FriendLink> listAll(int index, int size);

  /* 插入一条记录 */
  boolean insert(String name, String domain);

  /* 得到当前APP的名字 */
  String getAppName();

  /* 得到当前的APP域名 */
  String getAppDomain();

}

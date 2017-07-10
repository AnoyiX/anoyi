package cn.ictgu.serv.service;

import cn.ictgu.serv.model.FriendLink;

import java.util.List;

/**
 * 友情链接 Service
 */
public interface FriendLinkService {

    // 得到首页友情链接
    List<FriendLink> listHome();

}

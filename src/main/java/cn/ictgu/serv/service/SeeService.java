package cn.ictgu.serv.service;

import cn.ictgu.bean.response.SimpleSource;
import cn.ictgu.serv.model.Hub;
import cn.ictgu.serv.model.User;

import java.util.List;

public interface SeeService {

    /**
     * 获取最新的收藏动态
     */
    List<SimpleSource> getNewItems(int page);

    /**
     * 获取热门的收藏动态
     */
    List<SimpleSource> getHotItems(int page);

    /**
     * 获取受推荐的收藏动态
     */
    List<SimpleSource> getRecommendItems(int page);

    /**
     * 获取最受欢迎的仓库
     */
    List<Hub> getRecommendHubs();

    /**
     * 获取活跃的用户
     */
    List<User> getActiveUsers();

    /**
     * 获取新用户
     */
    List<User> getNewUsers();

}

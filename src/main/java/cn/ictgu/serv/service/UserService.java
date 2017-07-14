package cn.ictgu.serv.service;

import cn.ictgu.serv.model.User;

import java.util.List;

public interface UserService {

    /**
     * 登录时，更新用户信息
     */
    User updateUserInfo(User user);

    /**
     * 获取用户信息
     * @param userId 用户Id
     * @return 用户信息
     */
    User getUserInfo(Long userId);

    /**
     * 新用户
     */
    List<User> getNewUsers(int size);

    /**
     * 活跃用户，一周内，收藏内容越多，排名越高
     */
    List<User> getActiveUsers(int size);

    /**
     * 人气用户, 粉丝越多，排名越高
     */
    List<User> getPopularUsers(int size);

    /**
     * 获取用户粉丝
     */
    List<User> getFans(Long userId, int page);

    /**
     * 获取用户偶像
     */
    List<User> getIdols(Long userId, int page);

}

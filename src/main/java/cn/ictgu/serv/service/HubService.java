package cn.ictgu.serv.service;

import cn.ictgu.serv.model.Hub;

import java.util.List;

/**
 * 分类操作
 * Created by Silence on 2017/3/13.
 */
public interface HubService {

  /**
   * 查询用户所有的分类信息
   */
  List<Hub> getByUserId(Long userId);

  /**
   * 根据MD5查询分类信息
   */
  Hub getByMd5(String md5);

  /**
   * 根据ID查询分类信息
   */
  Hub getById(Long id, Long userId);

  /**
   * 根据ID删除分类信息
   */
  void deleteByUserIdAndId(Long userId, Long id);

  /**
   * 插入一条记录
   */
  void insert(Hub hub);

}

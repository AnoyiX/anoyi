package cn.ictgu.dao.model;

import lombok.Data;

/**
 * 类别
 * Created by Silence on 2017/3/12.
 */
@Data
public class Category {

  private Long id;

  private Long userId;

  /* 类别名称 */
  private String name;

  /* LOGO */
  private String logo;

  /* 视频数量 */
  private Integer amount;

  /* 人气 */
  private Long popularity;

  /* md5 用于分享链接 */
  private String md5;

}

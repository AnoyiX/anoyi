package cn.ictgu.dao.model;

import lombok.Data;

/**
 * 类别下的内容
 * Created by Silence on 2017/3/12.
 */
@Data
public class CategoryItem {

  private Long id;

  /* 用户 ID */
  private Long userId;

  /* 类别 ID */
  private Long categoryId;

  /* 详见 CategoryItemType */
  private String type;

  /* 标题 */
  private String name;

  /* 图片 */
  private String image;

  /* 地址 */
  private String url;

}

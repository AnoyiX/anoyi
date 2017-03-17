package cn.ictgu.dao.model;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 友情链接
 * Created by Silence on 2017/3/8.
 */
@Data
@NoArgsConstructor
public class FriendLink {

  private Integer id;

  /* 网站名称 */
  private String name;

  /* 网站域名 */
  private String domain;

  /* 展示在首页 YES | NO */
  private String show;

  public FriendLink(String name, String domain, String show){
    this.name = name;
    this.domain = domain;
    this.show = show;
  }

}

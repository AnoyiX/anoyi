package cn.ictgu.serv.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * 友情链接
 */
@Data
@NoArgsConstructor
public class FriendLink {

  private Integer id;

  // 名称
  private String name;

  // 域名
  private String domain;

  // 展示在首页 YES | NO
  private String show;

  // 创建时间
  private Date createTime;

  public FriendLink(String name, String domain, String show){
    this.name = name;
    this.domain = domain;
    this.show = show;
  }

}

package cn.ictgu.serv.model;

import lombok.Data;

import java.util.Date;

/**
 * 捐助表
 * Created by Silence on 2017/4/19.
 */
@Data
public class Sponsor {

  private int id;

  // 昵称
  private String nickname;

  // 捐助来源
  private String from;

  // 捐助金额
  private int money;

  // 捐助时间
  private Date date;

}

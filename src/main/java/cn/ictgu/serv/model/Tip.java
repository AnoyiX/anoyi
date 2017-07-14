package cn.ictgu.serv.model;

import lombok.Data;

import java.util.Date;

/**
 * 打赏
 */
@Data
public class Tip {

    private int id;

    // 昵称
    private String nickname;

    // 来源
    private String from;

    // 金额
    private int money;

    // 时间
    private Date date;

}

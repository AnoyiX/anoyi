package cn.ictgu.serv.model;

import lombok.Data;

import java.util.Date;

/**
 * 仓库
 */
@Data
public class Hub {

    private Long id;

    // 创建者 ID
    private Long userId;

    // 原始作者 ID
    private Long originId;

    // 创建者头像
    private String avatar;

    // 名称
    private String name;

    // 描述
    private String description;

    // 内容数量
    private Integer amount;

    // 人气
    private Long popularity;

    // md5 用于分享链接
    private String md5;

    // 创建时间
    private Date createTime;

}

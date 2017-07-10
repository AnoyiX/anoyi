package cn.ictgu.serv.model;

import lombok.Data;

import java.util.Date;

/**
 * 仓库内容
 */
@Data
public class HubItem {

    private Long id;

    // 用户 ID
    private Long userId;

    // 仓库 ID
    private Long hubId;

    // 资源类型
    private String type;

    // 标题
    private String name;

    // 图片
    private String image;

    // 地址
    private String url;

    // 推荐 1是 0否
    private Integer recommend;

    // 创建时间
    private Date createTime;

}

package cn.ictgu.serv.model.mix;

import lombok.Data;

import java.util.Date;

@Data
public class HubItemHubUser {

    private Long id;

    private Long userId;

    private Long hubId;

    private String type;

    private String name;

    private String image;

    private String url;

    private Integer recommend;

    private Date createTime;

    // 仓库名称
    private String hubName;

    // 仓库Md5, 用于分享
    private String hubMd5;

    // 用户昵称
    private String nickname;

}

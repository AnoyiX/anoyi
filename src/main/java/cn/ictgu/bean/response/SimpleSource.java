package cn.ictgu.bean.response;

import lombok.Data;

import java.util.List;

/**
 * 资源概要
 */
@Data
public class SimpleSource {

    // 名称
    private String name;

    // 图片
    private String image;

    // 资源地址
    private String url;

    // 仓库ID
    private Long hubId;

    // 仓库Md5
    private String md5;

    // 是否推荐
    private Integer recommend;

    // 描述
    private String description;

    // 图片
    private List<Tag> tags;

}

package cn.ictgu.bean.response;

import lombok.Data;

/**
 * 文章
 */
@Data
public class Article {

    // 标题
    private String title;

    // 图片
    private String image;

    // 内容
    private String content;

    // 作者
    private String author;

    // css 样式
    private String css;

    // 发布时间
    private String time;

    // [版权] 文章源地址
    private String value;

    // 其他信息
    private String other;

    // 提供方
    private String provider;

}

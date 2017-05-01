package cn.ictgu.dto;

import lombok.Data;

/**
 * 文章
 * Created by Silence on 2017/5/1.
 */
@Data
public class Article {

  /* 标题 */
  private String title;

  /* 图片 */
  private String image;

  /* 内容 */
  private String content;

  /* 作者 */
  private String author;

  /* 发布时间 */
  private String time;

  /* [版权] 视频源地址 */
  private String value;

  /* [版权] 视频提供方 */
  private String provider;

  /* [版权] 视频解析方名称 */
  private String parserName;

  /* [版权] 视频解析方官网 */
  private String parser;

}

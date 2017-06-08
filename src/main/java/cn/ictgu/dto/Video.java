package cn.ictgu.dto;

import lombok.Data;

/**
 * 视频
 * Created by Silence on 2016/12/2.
 */
@Data
public class Video {

  /* 视频名称 */
  private String title;

  /* 视频图片 */
  private String image;

  /* 视频播放地址 */
  private String playUrl;

  /* 播放类型 */
  private String type;

  /* [版权] 视频源地址 */
  private String value;

  /* [版权] 视频提供方 */
  private String provider;

  /* [版权] 视频解析方名称 */
  private String parserName;

  /* [版权] 视频解析方官网 */
  private String parser;

}

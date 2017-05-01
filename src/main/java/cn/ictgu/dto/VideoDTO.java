package cn.ictgu.dto;

import lombok.Data;

/**
 * VideoDTO
 * Created by Silence on 2017/2/13.
 */
@Data
public class VideoDTO {

  // 视频是否有效
  private Boolean available;
  // 视频标题
  private String title;
  // 视频背景图片
  private String image;
  // 视频地址
  private String value;

}

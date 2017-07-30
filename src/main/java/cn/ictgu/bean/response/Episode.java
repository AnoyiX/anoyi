package cn.ictgu.bean.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 集
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Episode {

    // 第几集
    private String index;

    // 视频源地址
    private String value;

}

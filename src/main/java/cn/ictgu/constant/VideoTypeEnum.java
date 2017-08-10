package cn.ictgu.constant;

import lombok.Getter;

public enum VideoTypeEnum {

    YK_TV(1), // 优酷-电视剧
    YK_MOVIE(2), // 优酷-电影
    YK_ZY(3), // 优酷-综艺
    YK_DM(4),

    IQY_TV(11), // 爱奇艺-电视剧
    IQY_MOVIE(12), // 爱奇艺-电影
    IQY_ZY(13), // 爱奇艺-综艺
    IQY_DM(14); // 爱奇艺-动漫

    @Getter
    private int code;

    VideoTypeEnum(int code){
        this.code = code;
    }
}

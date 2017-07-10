package cn.ictgu.tools;

import java.util.Date;

public class TimeUtils {

    private final static long YEAR = 1000 * 60 * 60 * 24 * 365L;
    private final static long MONTH = 1000 * 60 * 60 * 24 * 30L;
    private final static long DAY = 1000 * 60 * 60 * 24L;
    private final static long HOUR = 1000 * 60 * 60L;
    private final static long MINUTE = 1000 * 60L;


    public static String natureTime(Date date){
        Date now = new Date();
        long between = now.getTime() - date.getTime();
        if (between > YEAR){
            return ((between - YEAR) / YEAR + 1) + "年前，";
        }
        if (between > MONTH){
            return ((between - MONTH) / MONTH + 1) + "月前，";
        }
        if (between > DAY){
            return ((between - DAY) / DAY + 1) + "天前，";
        }
        if (between > HOUR){
            return ((between - HOUR) / HOUR + 1) + "小时前，";
        }
        if (between > MINUTE){
            return ((between - MINUTE) / MINUTE + 1) + "分钟前，";
        }
        return "刚刚，";
    }

}

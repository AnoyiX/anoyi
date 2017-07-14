package cn.ictgu.bean;

import lombok.Data;

/**
 * 简易响应 DTO
 */
@Data
public class ResponseBean {

    private int code;

    private String message;

    private Object object;

}

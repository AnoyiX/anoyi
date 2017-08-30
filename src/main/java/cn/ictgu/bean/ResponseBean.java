package cn.ictgu.bean;

import cn.ictgu.constant.ExceptionEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 简易响应 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseBean {

    private int code;

    private String message;

    private Object data;

    public ResponseBean(int code, String message){
        this.code = code;
        this.message = message;
    }

    public ResponseBean(ExceptionEnum exceptionEnum){
        this.code = exceptionEnum.getCode();
        this.message = exceptionEnum.getMessage();
    }

    /**
     * 成功
     */
    public static ResponseBean ok(){
        return new ResponseBean(200, "success");
    }

    /**
     * 成功
     */
    public static ResponseBean ok(Object object){
        return new ResponseBean(0, "success", object);
    }

}

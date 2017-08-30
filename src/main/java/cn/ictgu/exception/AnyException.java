package cn.ictgu.exception;

import cn.ictgu.constant.ExceptionEnum;

/**
 * 统一异常
 */
public class AnyException extends RuntimeException {

    public AnyException(ExceptionEnum exceptionEnum){
        super(exceptionEnum.getMessage());
    }

    public AnyException(String message){
        super(message);
    }

}

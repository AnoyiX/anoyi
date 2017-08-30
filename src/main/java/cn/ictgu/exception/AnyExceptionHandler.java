package cn.ictgu.exception;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * 统一异常处理
 */
@ControllerAdvice
public class AnyExceptionHandler {

    /**
     * 处理全局异常
     */
    @ExceptionHandler(Exception.class)
    public String handlerGlobalException(Exception exception, Model model){
        model.addAttribute("message", exception.getMessage());
        return "error";
    }

}

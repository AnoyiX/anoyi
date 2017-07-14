package cn.ictgu.bean;

public class Response {

    private final static int SUCCESS = 200;
    private final static String SUCCESS_MESSAGE = "success";

    private final static int NO_AUTHORITY = 1000;
    private final static String NO_AUTHORITY_MESSAGE = "no authority";

    private final static int ERROR_PARAMS = 1100;
    private final static String ERROR_PARAMS_MESSAGE = "error params";

    /**
     * 请求成功
     * @param object 请求结果
     * @return 响应结果
     */
    public static ResponseBean success(Object object){
        ResponseBean responseBean = new ResponseBean();
        responseBean.setCode(SUCCESS);
        responseBean.setMessage(SUCCESS_MESSAGE);
        responseBean.setObject(object);
        return responseBean;
    }


    /**
     * 请求失败
     */
    public static ResponseBean error(int code, String message){
        ResponseBean responseBean = new ResponseBean();
        responseBean.setCode(code);
        responseBean.setMessage(message);
        return responseBean;
    }

    /**
     * 操作权限不足
     */
    public static ResponseBean noAuthority(){
        return error(NO_AUTHORITY, NO_AUTHORITY_MESSAGE);
    }

    /**
     * 参数不正确
     */
    public static ResponseBean errorParams(){
        return error(ERROR_PARAMS, ERROR_PARAMS_MESSAGE);
    }
}

package cn.ictgu.serv.model;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户
 */
@Data
public class User implements Serializable{
    private Long id;

    // 用户唯一身份识别 ID
    private String openId;

    // 密码（暂时用不到）
    private String password;

    /**
     * 登录类型 {@link cn.ictgu.serv.model.enumclass.LoginType}
     */
    private String loginType;

    // 昵称
    private String nickname;

    // 头像
    private String avatar;

    // 性别
    private String gender;

    // 其他信息
    private String meta;

    // 用户信息 MD5 值，用于校验用户信息是否休息
    private String md5;

}

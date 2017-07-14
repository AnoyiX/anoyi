package cn.ictgu.serv.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class Attention {

    public Attention(Long userId, Long otherId){
        this.userId = userId;
        this.otherId = otherId;
    }

    private Long id;

    // 用户 ID
    private Long userId;

    // 对方 ID
    private Long otherId;

    // 创建时间
    private Date createTime;

}
